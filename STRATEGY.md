# STRATEGY — Motor de Estratégia de Estudos

> Documentação do algoritmo do **Study Strategy Engine** (M16).
> Determinístico, offline, sem IA, sem rede — e **100% explicável**: cada
> recomendação carrega o próprio score decomposto, fator a fator.
> Código: [`src/main/strategy/`](./src/main/strategy) · Testes: `engine.test.ts` · Pesos: [`config.ts`](./src/main/strategy/config.ts)

---

## 1. Arquitetura (desacoplada)

```
┌───────────────┐    StrategyInput     ┌──────────────┐   DailyPlan
│  snapshot.ts  │ ───(dados puros)───▶ │  engine.ts   │ ──────────▶ UI / serviços
│ (única camada │                      │ (funções     │
│  que lê o DB) │                      │  puras, sem  │
└───────────────┘                      │  DB/Electron)│
                                       └──────────────┘
                 pesos/limiares: config.ts (um único objeto editável)
```

- **`engine.ts` é puro**: recebe um *snapshot* e devolve o plano — mesmo input ⇒ mesmo output (até o relógio vem de fora, em `todayIso`). Por isso os testes unitários rodam em Node puro, sem banco.
- **`snapshot.ts`** fotografa o estado no SQLite (7 consultas agregadas) e monta o `StrategyInput`.
- **`config.ts`** concentra todos os pesos e limiares — ajustar a fórmula = editar um objeto.
- Consumidores: tela **Plano do Dia**, **Dashboard** (top 3), **Estatísticas** (ranking), **Modo Aprovação** (prioridades) e **Planejamento** (fila do cronograma) — todos bebem do mesmo motor (fonte única de verdade).

## 2. A fórmula (registro de fatores)

Cada disciplina do concurso ativo recebe um **score 0..100**:

```
score(d) = Σ  peso_fator × intensidade_fator(d, contexto)      (Σ pesos = 100)
```

Cada fator é uma entrada no registro `buildFactors()` com `key`, `label`,
`compute(d, ctx) → { value: 0..1, reason }`. **Adicionar um fator novo =
adicionar uma entrada no array e um peso no config** — nada mais muda
(Open/Closed). O `reason` é a justificativa legível que aparece na UI.

| Fator | Peso | Intensidade (0..1) | Justificativa típica |
|---|---:|---|---|
| `peso` | 14 | peso por questão ÷ maior peso do concurso | "peso 2× por questão" |
| `incidencia` | 12 | questões estimadas ÷ maior incidência | "~6 questões na prova" |
| `urgencia` | 12 | `1 − dias_até_prova/120` (null → 0.3) | "faltam 45 dias para a prova" |
| `desempenho` | 16 | `1 − acerto` (≥5 respostas); 0.6 se pouca prática | "desempenho baixo (42% de acerto)" |
| `cobertura` | 8 | `1 − respondidas/max(10, banco)` | "apenas 3 de 12 questões praticadas" |
| `esquecimento` | 10 | `dias_sem_estudar/14` (nunca → 0.7) | "última atividade há 12 dias" |
| `dominio` | 6 | `1 − tópicos_dominados/tópicos` (+0.5×revisar) | "2 tópicos marcados para revisar" |
| `multiConcurso` | 6 | `(ocorrências−1)/(concursos−1)` | "cai em 2 concursos ativos" |
| `tendencia` | 4 | queda de acerto 7d vs 8–30d (Δ×3, se Δ>5pp) | "queda de 12% na última semana" |
| `dificuldade` | 3 | mix de dificuldade do banco (F=0.2 M=0.5 D=1.0) | "questões majoritariamente difíceis" |
| `simulado` | 3 | `1 − acerto_em_simulados` (≥5 respostas) | "50% de acerto em simulados" |
| `metaBloco` | 6 | `gap_do_corte × 2` do bloco da disciplina | "bloco abaixo do corte de eliminação" |

**Prioridade**: score ≥70 → Muito Alta · ≥50 → Alta · ≥32 → Média · senão Baixa (limiar no config).

**Desempate determinístico**: score → ordem do edital (`orderIndex`) → id. Nunca há aleatoriedade.

## 3. Escolha da atividade

- **TEORIA** (tela Conteúdo) quando a disciplina tem conhecimento cadastrado **e** (menos de 5 respostas **ou** acerto < 50%) — primeiro entende, depois pratica.
- **QUESTOES** nos demais casos, com meta convertida do tempo: `questões ≈ minutos ÷ 1,6`, arredondado a 5.
- **REVISAO_FSRS** entra como item próprio quando há cards vencidos: `minutos = clamp(cards × 0,6; 10..30)`, score `55 + 1,5×cards` (máx. 95) — revisões vencidas quase sempre lideram o plano, por design (proteger retenção precede aprender novo).

## 4. Alocação de tempo (Plano do Dia)

1. Ranqueia candidatos (FSRS + disciplinas) por score.
2. Bloco ideal por item: `maxBlock × score/topScore`, arredondado a 5min, limitado a **15–45min** (blocos focados).
3. Preenche na ordem até esgotar o tempo (máx. 8 itens); sobra ≥10min estende o último bloco.
4. Resultado: itens com minutos, meta de questões, prioridade, motivos, impacto e decomposição do score.

## 5. Impacto esperado e previsão de conclusão

- **Impacto por item**: `pts_potenciais = incidência × peso_por_questão × max(0, 0,85 − acerto_atual)` → "até +X pts na prova".
- **Previsão**: orçamento por disciplina = `incidência × 45min`; restante = `orçamento × (1 − domínio%)`.
  `dias_necessários = ⌈restante ÷ minutos_dia⌉` → data projetada; comparada à prova produz
  **antes/depois** e os **minutos/dia necessários** para concluir antes (`restante ÷ dias_até_prova`).

## 6. Como ajustar / estender

- **Mudar pesos**: editar `STRATEGY_CONFIG.weights` (mantenha Σ=100 para o score continuar 0..100).
- **Novo fator**: adicionar peso no config + entrada em `buildFactors()` com `compute` e `reason`. Testes: `pnpm test`.
- **Novos concursos (ABGF/DATAPREV)**: nenhuma alteração — o motor lê tudo do snapshot (dados); a sinergia multi-concurso ativa sozinha quando `contests > 1` e slugs coincidem.

## 7. Garantias

- Determinístico e reproduzível (testado: mesma entrada ⇒ mesma saída).
- Offline: zero IA, zero API, zero rede.
- Explicável: cada item expõe `factors[]` com peso, intensidade, pontos e motivo.
- 14 testes unitários cobrindo fórmula, configurabilidade, alocação, FSRS e previsão.
