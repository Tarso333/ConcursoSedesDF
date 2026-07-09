# ANALYTICS — Learning Analytics Engine

> Documentação do motor que entende **como o usuário aprende** (M17).
> Determinístico, offline, sem IA. Código: [`src/main/analytics/`](./src/main/analytics) ·
> Testes: `engine.test.ts` · Limiares: [`config.ts`](./src/main/analytics/config.ts)

---

## 1. Arquitetura (coleta · processamento · indicadores · visualização)

```
COLETA          answers · srs_reviews · study_sessions · topic_progress
                (o "event log" já existe — nada novo é gravado; zero duplicação)
                          │
PROCESSAMENTO   analytics/snapshot.ts  →  AnalyticsInput (dados puros)
                          │
INDICADORES     analytics/engine.ts    →  LearningAnalytics
                (funções puras + REGISTRO de indicadores — Open/Closed)
                          │
VISUALIZAÇÃO    Dashboard (cards) · Estatísticas (seção Learning Analytics)
```

- **Zero migração**: todas as métricas são **projeções derivadas por replay** do log de eventos timestampado. Qualquer curva histórica é recomputável a qualquer momento — armazenamos apenas o necessário (nada).
- **Motor puro**: sem DB/Electron/relógio (`todayIso` vem de fora) → mesmo input ⇒ mesmo output; testável em Node puro (14 testes).

## 2. O modelo central — domínio derivado de um tópico

```
domínio(t, data) = acurácia_recente × fator_volume × fator_retenção     (0..100)

acurácia_recente  cada resposta pesa 0.5^(idade_dias/21)   ← evolução
fator_volume      min(1, n/5)                              ← confiança estatística
fator_retenção    0.55 + 0.45×0.5^(dias_sem_prática/30)    ← esquecimento
```

**Uma única função, três usos** (elegância deliberada):
- avaliada **hoje** → domínio atual (heatmap, nunca manual);
- avaliada em **datas passadas** (replay) → **curva de aprendizado**;
- avaliada em **datas futuras** sem novos eventos → **curva de esquecimento** (projeção).

## 3. Métricas calculadas

| Métrica | Como |
|---|---|
| Curva de evolução | replay semanal do domínio (global/tópico) |
| Curva de esquecimento | projeção do modelo a +7/14/21/30 dias |
| Tendência | domínio hoje vs. 14 dias atrás (±5pp ⇒ melhorando/piorando) |
| Velocidade de aprendizagem | dias médios do 1º contato até domínio ≥70% |
| Velocidade de resolução | média do tempo/questão (clamp 5–300s), 7d vs 30d |
| Índice de retenção | recall nas revisões FSRS (rating ≥3); fallback: domínio÷pico por tópico |
| Índice de estabilidade | 100 − desvio-padrão das acurácias semanais (≥3 semanas) |
| Taxa de acerto móvel | janelas de 7/15/30 dias |
| Consistência/frequência | dias ativos ÷ 14 |
| Cobertura do edital | tópicos com ≥3 questões praticadas ÷ total |
| Excesso/baixa confiança | status declarado (M15) × domínio derivado |
| Eficiência por método | acerto por origem (banco/simulados/revisão, 60d) |

## 4. Registro de indicadores (Open/Closed)

Os indicadores de topo (retenção, estabilidade, cobertura, tempo/questão,
frequência, tempo p/ dominar) vivem no array `INDICATORS` — cada entrada tem
`key`, `label`, `unit` e `compute(ctx) → { value, detail }`. **Indicador novo
= uma entrada nova**; nada existente muda. O mesmo vale para os traços do
`Learning Profile` (limiares em `config.ts`).

## 5. Learning Profile (agregado calculado — jamais manual)

5 traços derivados: **velocidade de aprendizagem** (dias até dominar),
**retenção**, **hábito de revisão** (revisões/dia ativo), **velocidade de
resolução** (s/questão) e **consistência** (frequência 14d). Cada traço traz
classificação, explicação do cálculo e polaridade (favorável/atenção/neutro).

## 6. Integrações

- **Strategy Engine (M16)**: o `masteryPct` da previsão de conclusão agora vem
  de `disciplineMastery()` (consciente de recência + esquecimento).
- **Dashboard**: maior evolução/regressão da semana, retenção, tempo/questão.
- **Estatísticas**: seção completa (indicadores, curvas, heatmap, perfil, confiança).
- **Futuro**: Tutor IA poderá receber o `LearningAnalytics` como contexto — já é um DTO serializável.

## 7. Garantias

Determinístico (testado) · offline · explicável (todo indicador tem `detail`;
todo traço tem `description`) · extensível sem tocar no existente · nenhuma
perda de dados (não grava nada — só lê).
