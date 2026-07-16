# AI — AI Platform, Context Builder, Tutor e Geração de Conteúdo

> Documentação da plataforma de IA (M22 · ADR-016). A IA é **opcional** e
> **privada por padrão** (Ollama local). Nenhuma engine M14–M21 foi alterada:
> a AI Platform é um CONSUMIDOR das engines, como o Dashboard ou o Plano do Dia.
> **Última atualização:** 2026-07-15.

---

## 1. Princípios

- **A plataforma nunca fala com um provedor diretamente.** Toda chamada passa
  pela interface `AIProvider`, resolvida por `AIRegistry` + `ProviderFactory`.
- **Dados da plataforma primeiro.** O Tutor responde com base no contexto
  montado pelas engines; o modelo apenas complementa (e sinaliza "Complemento:").
- **Atribuição determinística.** As fontes exibidas derivam do contexto que o
  Context Builder montou — nunca do que o modelo "diz" ter usado.
- **Offline-first preservado.** O padrão é o **Ollama local** (sem chave, sem
  rede externa). Provedores remotos são opt-in explícito do usuário.
- **Zero migration.** `AISettings` usa as colunas `ai_*` existentes; a
  atribuição persiste na coluna `ai_messages.context_type` (nullable, ociosa
  desde a v1); `MAPA_MENTAL` era um kind já reservado no M15.

## 2. Arquitetura

```
src/main/ai/
├─ types.ts            # AIProvider, AIChatRequest/Response (contratos internos)
├─ registry.ts         # AIRegistry — registro Open/Closed de descritores
├─ factory.ts          # ProviderFactory: AISettings → instância AIProvider
├─ settings.ts         # AISettings tipado sobre settings.ai_* (sem migration)
├─ providerConfig.ts   # parseProviderId (puro, testável)
├─ health.ts           # HealthCheck: ping + latência + tokens/s (Ollama)
├─ capabilities.ts     # CapabilityDetector: estático (descritor) + dinâmico
├─ providers/
│  ├─ ollama.ts        # PADRÃO — local, streaming JSONL, listModels, bench
│  ├─ openai.ts        # OpenAI + OpenRouter + endpoint custom (compatível)
│  ├─ anthropic.ts     # /v1/messages
│  └─ geminiCli.ts     # spawn do binário `gemini` (conta Google)
├─ context/
│  ├─ types.ts         # StudyContext (fortemente tipado)
│  ├─ builder.ts       # monta o contexto SÓ com as engines existentes
│  ├─ match.ts         # resolução determinística de tópico (puro)
│  └─ render.ts        # StudyContext → texto de prompt (puro)
├─ attribution.ts      # atribuição determinística (puro)
├─ tutor.ts            # Tutor fundamentado (contexto + provedor + fontes)
├─ summary.ts          # chips do painel + sugestões dinâmicas
├─ generationSchema.ts # prompts + validação estrita de JSON (puro)
└─ generation.ts       # salva via engines (Knowledge/Grafo/Flashcards/Questões)
```

**Fronteiras:** o renderer só vê DTOs de `@shared/domain` (AIProviderInfo,
AIHealth, AIContextSummary, TutorAttribution, GenerationResult…). Os canais do
M12 (`ai:status/history/send/clear`) foram PRESERVADOS — `aiService.ts` virou
fachada de retrocompatibilidade sobre a AI Platform.

## 3. Provedores e capacidades

| Provedor | Local | Chave | Streaming | Lista modelos | JSON |
|---|---|---|---|---|---|
| **Ollama** (padrão) | ✓ | — | ✓ | ✓ | ✓ |
| OpenAI | — | ✓ | — | — | ✓ |
| Anthropic (Claude) | — | ✓ | — | — | ✓ |
| OpenRouter | — | ✓ | — | — | ✓ |
| Gemini CLI | — | — (conta) | — | — | — |
| Endpoint custom | — | ✓ | — | — | ✓ |

Adicionar um provedor = implementar `AIProvider` + `registerAIProvider(descriptor)`
— nenhum consumidor muda (mesmo padrão dos fatores M16 e adapters M21).

### Ollama (Módulo 6)
Camada ÚNICA em `providers/ollama.ts` (nenhum outro arquivo fala com a porta
11434). Primeira execução: `ping` detecta instalação (`/api/version`) e modelos
(`/api/tags`); sem modelos, o health sugere `ollama pull llama3.2:3b`; o campo
Modelo em Configurações lista os instalados (botão **Detectar**); **Testar
conexão** mede latência e **velocidade real** (tokens/s via `eval_count/eval_duration`).

## 4. Context Builder

`buildStudyContext(contest, { question })` monta o `StudyContext` tipado:
concurso/cargo/banca/dias p/ prova · **foco** (tópico casado com a pergunta por
matching determinístico de tokens → conhecimento do tópico, subtópicos e
conexões do grafo) · desempenho (M8) · Learning Analytics (M17: tendência,
perfil, indicadores) · Plano do Dia (M16: prioridade, itens, cobertura) ·
revisões FSRS vencidas (M6) · erros recentes (M4) · simulados (M7) · metas (M9)
· histórico da conversa. `render.ts` serializa em prompt compacto (puro).

## 5. Tutor (Módulo 3)

1. Monta o contexto (com foco por tópico) e a **atribuição** determinística.
2. System prompt impõe: dados da plataforma primeiro; complementos sinalizados.
3. Cada resposta exibe (UI expansível) e PERSISTE (JSON em `context_type` +
   bloco textual no conteúdo): **conhecimentos usados · tópicos consultados ·
   erros que influenciaram · revisões relacionadas · assuntos que dependem do tema**.
4. Streaming: chunks via evento `ai:streamChunk` quando o provedor suporta.

## 6. Geração de conteúdo (Módulo 4)

`generateContent(contest, { kind, topicId })` — tipos: RESUMO · MAPA_MENTAL ·
FLASHCARDS · QUESTOES · EXPLICACAO · EXEMPLOS. Validação ESTRITA do JSON do
modelo (`generationSchema.ts`). Persistência SOMENTE nas engines:

| Geração | Onde salva |
|---|---|
| Resumo / Explicação / Exemplos / Mapa mental | `knowledge_entries` (kinds RESUMO/CONCEITO/OBSERVACAO/MAPA_MENTAL) |
| Flashcards | deck "Gerados por IA" + `flashcards.topic_id` + fila FSRS |
| Questões | `questions/question_options`, `source` "Gerada por IA (revisar)", `seed_key` `ai:` (idempotente) |
| Relações sugeridas | `topic_relations` RELACIONADO 0.4, nota "Sugerida por IA — revisar" — só entre tópicos EXISTENTES |

Nenhum armazenamento paralelo. UI: painel do tópico (tela Conteúdo) → "Gerar com IA".

## 7. UX (Módulo 5)

- **Painel do Tutor**: chips de contexto (provedor/modelo, dias p/ prova,
  prioridade do dia, revisões vencidas, erros abertos, acerto), sugestões
  dinâmicas derivadas de plano/erros/revisões, fontes por resposta, streaming
  com cursor, atalhos (`/` foca o campo · `Ctrl+L` limpa), histórico persistente.
- **Configurações → Inteligência Artificial**: seleção de provedor (com
  capacidades), modelos detectados, chave só quando exigida, teste de conexão
  com latência e tokens/s.

## 8. Testes

23 testes puros (padrão M16–M18: sem better-sqlite3 na cadeia): resolução de
provedor (retrocompat M12), registry/descritores, parser JSONL + tokens/s do
Ollama, matching de tópico, render do contexto, atribuição (inclusive round-trip
da persistência), validação da geração (todos os tipos). Total do projeto: **84**.

## 9. Limites conscientes

- Modelos locais pequenos variam em qualidade de JSON → validação estrita +
  erro legível (o usuário simplesmente tenta de novo ou troca o modelo).
- Streaming implementado no Ollama (JSONL nativo); demais provedores respondem
  completo (capacidade declarada em `capabilities.streaming`).
- Conteúdo gerado é sempre marcado (— IA / Gerada por IA) e revisável; questões
  geradas não substituem o banco curado.
