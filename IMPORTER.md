# IMPORTER — Universal Contest Import Engine

> Módulo **independente** que transforma um **edital em PDF** (ou texto) num
> **`ContestSeed`** determinístico, compatível com todas as engines
> (Multi Contest, Knowledge, Relationship, Learning Analytics, Strategy) —
> **sem IA** e **sem alterar domínio, engines ou migrations**.
> Decisão em [`DECISIONS.md`](./DECISIONS.md) (ADR-015).
> **Última atualização:** 2026-07-15.

---

## 1. Princípios

- **Isolamento total.** Vive em `src/importer/`. **Nada do domínio depende dele**
  (nenhum arquivo de `src/main` o importa). Ele importa apenas **tipos** do
  domínio (`ContestSeed`, `SeedDiscipline`, `SeedTopic`) — dependência
  unidirecional correta. Não entra no bundle do app (comprovado: o tamanho do
  bundle não muda ao adicioná-lo).
- **Determinístico, sem IA.** Só regex, heurísticas, estrutura textual,
  numeração e hierarquia. Nenhuma chamada de rede/modelo.
- **Produz dados, não comportamento.** A saída é um `ContestSeed` — o mesmo
  formato de `seed/contests/{sedes,abgf,dataprev}`. As engines apenas consomem.
- **Rascunho + relatório, nunca cadastro cego.** A saída inclui **placeholders**
  (a curar) e um **relatório de inconsistências/cobertura**.

## 2. Pipeline

```
PDF ──extractPdfText (Node+zlib)──▶ texto
texto ──normalize/dehyphenate──▶ normalizado
   ├─ metadata.ts   → órgão/banca/cargo/cidade/data/salário/jornada
   ├─ curriculum.ts → disciplinas → tópicos → subtópicos  (recorte por âncoras)
   ├─ exam.ts       → ExamConfig (blocos, duração, peso)
   ├─ placeholders  → Knowledge stubs + Relationship (CONTINUIDADE)
   └─ coverage.ts   → relatório de cobertura + inconsistências
                                   ▼
                              ContestSeed + ImportReport
```

Etapas (todas puras, orquestradas por `pipeline.ts`):

| Arquivo | Papel |
|---|---|
| `pdf.ts` | Extrai texto de PDF (streams FlateDecode via `zlib.inflateSync`; parser de operadores `BT/Tj/TJ/Td/ET`). |
| `text.ts` | Normalização, `slugify` (idêntico ao seed), `titleCase`, `deaccent`, limpeza. |
| `metadata.ts` | Regex para banca, cargo, cidade, **data** (prefere anos ≥ 2015), **salário** (maior `R$` perto de "remuneração"), jornada. |
| `curriculum.ts` | **Coração**: recorte de seção, detecção de disciplinas, parser de numeração + subtópicos decimais + fallback delimitado. |
| `exam.ts` | `ExamConfig` a partir das disciplinas achadas + duração/peso lidos do texto (fallback documentado). |
| `placeholders.ts` | Um `RESUMO`-stub por tópico (M15) + cadeia `CONTINUIDADE` seguindo a numeração do edital (M18). |
| `coverage.ts` | Cobertura estimada (tópicos gerados ÷ marcadores no texto da seção) + inconsistências ordenadas por severidade. |
| `emit.ts` | Serializa o `ContestSeed` em fonte `.ts` (codegen) para revisão/registro. |
| `cli.ts` | Ferramenta de dev: `cli.ts <edital.pdf> [--bank fgv] [--out dir]`. |

## 3. Parser de currículo (determinístico)

**Disciplina** = linha em caixa alta (razão de maiúsculas ≥ 0,7), sem palavra de
seção (`PERFIL`, `ANEXO`, `MÓDULO`, `CARGO`, `CONHECIMENTOS …`) e sem sinais de
fragmento de tabela (frase com `. `, ano fora de parênteses). Referências de lei
entre parênteses são preservadas (ex.: `Licitações (Lei 14.133/2021)`).

**Tópicos** = sequência numérica `1 … 2 … N`, seguindo o **próximo inteiro
esperado**. O marcador **nunca** pode vir logo após letra/dígito/ponto — assim
`IPv6 e`, `802.11` e `19C` **não** viram falsos tópicos. O lookahead tolera um
número espúrio de paginação entre o marcador e o texto (ex.: `17 35 GRASP`).

**Subtópicos** = decimais `N.M` (ex.: `7.1`), mais enumerações entre parênteses
com ≥ 2 itens (ex.: `(EJB, JPA, JMS)`).

**Fallback** = quando não há numeração, separa por `;` e depois `,`
(ex.: `Gitlab, HTML5, CSS3; Java EE; Spring Boot`).

**Recorte de seção** = `programSectionAnchor` (início) e `programSectionEnd`
(fim) permitem importar **um perfil/cargo específico** de um edital com vários
(ex.: DATAPREV Perfil 2, entre `PERFIL 2:` e `PERFIL 3:`).

## 4. Extensibilidade por banca (Open/Closed)

`BankAdapter` (em `adapters/types.ts`): `id`, `label`, `matches(texto)`,
`patterns` (regex de bloco/stopword) e hooks opcionais
`refineMetadata`/`refineExam`/`refineCurriculum`. O **registro**
(`adapters/registry.ts`) resolve por: id explícito → auto-detecção → genérico.

Registrados: **FGV, FCC, Quadrix, Cebraspe/CESPE, AOCP** (+ genérico).
**Adicionar uma banca = novo arquivo + `registerAdapter(...)`** — o pipeline não
muda. Os adaptadores **nunca** importam o pipeline (sem ciclo).

```ts
import { registerAdapter } from '@main/../importer' // exemplo
registerAdapter({
  id: 'vunesp', label: 'VUNESP',
  matches: (up) => /\bVUNESP\b/.test(up),
  patterns: GENERIC_PATTERNS
})
```

## 5. Validação (testes)

`src/importer/importer.test.ts` (17 testes) usa os **três editais**:

- **DATAPREV**: fixture com o **texto real** do Perfil 2 (FGV) → asserta a
  estrutura contra a numeração do próprio edital (5 disciplinas; tópicos
  5/10/24/9; subtópico `SQL 7.1`; data/duração/peso).
- **ABGF** e **SEDES**: **round-trip** — o seed manual é renderizado em texto de
  edital numerado e o parser **recupera a mesma estrutura** (nº de disciplinas,
  tópicos por disciplina exatos, subtópicos ≥ manuais, blocos GERAL/ESPECÍFICO).
- **Pipeline**: placeholders (1 por tópico), relações `CONTINUIDADE`, relatórios.
- **Extensibilidade**: fallback genérico + registro de nova banca.

**Verificação ponta a ponta** (não versionada, por depender do PDF externo):
o **PDF oficial da DATAPREV** produz 5 disciplinas com tópicos `[5, 10, 24, 9, 5]`
— idêntico à curadoria manual (`seed/contests/dataprev`).

## 6. Uso

```ts
import { importContestFromPdf } from './src/importer'

const { seed, report } = importContestFromPdf(pdfBuffer, {
  bank: 'fgv',                         // ou auto-detecção
  name: 'DATAPREV 2026', slug: 'dataprev-2026',
  defaultBlock: 'ESPECIFICO',
  programSectionAnchor: /PERFIL 2: ARQUITETURA/i,
  programSectionEnd: /PERFIL 3:/i
})
// seed  → ContestSeed (registrar em seed/contests/index.ts após revisão)
// report → cobertura + inconsistências para curadoria
```

## 7. Limites conscientes

- Parsing determinístico **degrada em PDFs muito ruidosos** (multicoluna,
  quebras no meio de palavras). Por isso a saída é um **rascunho** com
  placeholders + relatório — a curadoria humana confirma antes de registrar.
- **Conhecimento rico, relações semânticas e questões continuam manuais** — o
  importador cria a **estrutura** e os **stubs**, não o conteúdo pedagógico.
- Metadados são best-effort; o relatório lista o que não foi encontrado.
