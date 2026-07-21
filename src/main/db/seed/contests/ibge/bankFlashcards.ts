// M28 — Flashcards IBFC do IBGE (fila FSRS). Compartilhados (LP/RLQ, contam
// para ACS e ACA) + específicos de cada cargo. APENAS DADOS; idempotente por
// deck+frente. Formatos variados: conceito, definição, V/F, associação,
// palavra-chave, legislação, pegadinha.
import type { SeedStarterDeck } from '../types'

const LP = 'lingua-portuguesa'
const RL = 'raciocinio-logico'
const ADM_ACS = 'administracao-situacoes-gerenciais'
const CT = 'conhecimentos-tecnicos-censo'
const ADM_ACA = 'nocoes-administracao'

// ─────────── Compartilhado (LP + RLQ) — vale para ACS e ACA ───────────
export const IBGE_BANK_SHARED_DECKS: SeedStarterDeck[] = [
  {
    name: 'IBGE — Português essencial (banco extenso)',
    disciplineSlug: LP,
    description: 'Cartões objetivos de Língua Portuguesa no padrão IBFC (ACS e ACA).',
    cards: [
      { front: 'Extrapolação (interpretação)', back: 'Vício de acrescentar o que o texto NÃO afirma. Inferência válida decorre do texto; extrapolação vai além dele.', topic: { disciplineSlug: LP, topic: 'Compreensão e interpretação de texto' } },
      { front: 'Pressuposto × subentendido', back: 'Pressuposto: marcado na língua ("ainda", "já", "deixou de"). Subentendido: depende do contexto, não marcado.', topic: { disciplineSlug: LP, topic: 'Compreensão e interpretação de texto' } },
      { front: 'V ou F: "belo" e "bonito" são antônimos', back: 'FALSO — são sinônimos. Antônimos têm sentidos opostos (lícito × ilícito).', topic: { disciplineSlug: LP, topic: 'Sinônimos e antônimos' } },
      { front: 'infringir × inferir × inserir', back: 'Infringir = violar. Inferir = deduzir. Inserir = introduzir. (Parônimos.)', topic: { disciplineSlug: LP, topic: 'Homônimos e parônimos' } },
      { front: 'Vírgula e o aposto', back: 'O aposto explicativo vem entre vírgulas: "Brasília, capital federal, ...".', topic: { disciplineSlug: LP, topic: 'Pontuação; estrutura e sequência lógica de frases e parágrafos' } },
      { front: 'exceção / privilégio / beneficente', back: 'Grafias corretas (não "excessão", "previlégio", "beneficiente").', topic: { disciplineSlug: LP, topic: 'Ortografia oficial; acentuação gráfica' } },
      { front: 'Regra de "lâmpada" e "análise"', back: 'Proparoxítonas — TODAS acentuadas.', topic: { disciplineSlug: LP, topic: 'Ortografia oficial; acentuação gráfica' } },
      { front: '"bastante": adjetivo × advérbio', back: 'Advérbio (invariável) quando intensifica verbo: "trabalharam bastante". Adjetivo (varia) = "muitos": "bastantes agentes".', topic: { disciplineSlug: LP, topic: 'Classes das palavras' } },
      { front: '"É necessário paciência" tem erro?', back: 'NÃO. Sujeito sem determinante → "é necessário" invariável. Com artigo: "É necessária A paciência".', topic: { disciplineSlug: LP, topic: 'Concordância nominal e verbal' } },
      { front: 'Vendem-se equipamentos', back: 'Passiva sintética CONCORDA com o sujeito (equipamentos) → plural.', topic: { disciplineSlug: LP, topic: 'Concordância nominal e verbal' } },
      { front: '"Chegar" — regência', back: 'Pede "a": "Cheguei AO local" (não "no local", na norma culta).', topic: { disciplineSlug: LP, topic: 'Regência nominal e verbal' } },
      { front: '"à mão" tem crase?', back: 'SIM — locução adverbial feminina. Mas NÃO antes de verbo, masculino, pronome de tratamento ou "a partir de".', topic: { disciplineSlug: LP, topic: 'Regência nominal e verbal' } },
      { front: 'Voz passiva analítica', back: 'Sujeito paciente + verbo SER + particípio + agente: "Os dados foram coletados pelo recenseador".', topic: { disciplineSlug: LP, topic: 'Emprego dos verbos regulares, irregulares e anômalos; vozes dos verbos' } },
      { front: '"Entre eu e você" tem erro?', back: 'SIM. Após preposição, oblíquo tônico: "Entre MIM e você".', topic: { disciplineSlug: LP, topic: 'Emprego dos pronomes' } },
      { front: 'Sujeito indeterminado', back: 'VTI/VI + "se": "Precisa-se de agentes" (verbo no singular).', topic: { disciplineSlug: LP, topic: 'Sintaxe: termos essenciais, integrantes e acessórios da oração' } },
      { front: '"no entanto" — relação', back: 'Adversidade (contraste). Opõe-se a "portanto/logo/assim" (conclusão).', topic: { disciplineSlug: LP, topic: 'Coesão e coerência' } },
      { front: 'Atributos da redação oficial', back: 'Clareza, concisão, impessoalidade, formalidade, padrão culto, uniformidade.', topic: { disciplineSlug: LP, topic: 'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)' } }
    ]
  },
  {
    name: 'IBGE — Raciocínio Lógico (banco extenso)',
    disciplineSlug: RL,
    description: 'Lógica e matemática básica no padrão IBFC (ACS e ACA).',
    cards: [
      { front: 'Conjunção (p ∧ q) — quando V?', back: 'Só quando AMBAS são verdadeiras.', topic: { disciplineSlug: RL, topic: 'Estruturas lógicas' } },
      { front: 'Disjunção (p ∨ q) — quando V?', back: 'Quando ao menos UMA é verdadeira.', topic: { disciplineSlug: RL, topic: 'Estruturas lógicas' } },
      { front: 'Negar "todos... p e q"', back: '"Algum não-p OU não-q" (De Morgan + negação do "todo").', topic: { disciplineSlug: RL, topic: 'Estruturas lógicas' } },
      { front: 'Modus tollens', back: 'p→q e ~q ∴ ~p (nega o consequente, nega o antecedente).', topic: { disciplineSlug: RL, topic: 'Lógica de argumentação' } },
      { front: 'Falácia da afirmação do consequente', back: 'p→q; q ∴ p é INVÁLIDO. Válido é modus ponens (afirmar o antecedente).', topic: { disciplineSlug: RL, topic: 'Lógica de argumentação' } },
      { front: 'Nenhum A é B; algum C é A ∴ ?', back: 'Algum C não é B (os C que são A não são B).', topic: { disciplineSlug: RL, topic: 'Diagramas lógicos' } },
      { front: '75% de 240', back: '180. (25% = 60; 240 − 60 = 180.)', topic: { disciplineSlug: RL, topic: 'Aritmética' } },
      { front: 'Regra de três: mais gente, menos dias', back: 'INVERSA: 40·12 = 60·x → x = 8.', topic: { disciplineSlug: RL, topic: 'Aritmética' } },
      { front: 'Inclusão-exclusão (2 conjuntos)', back: '|A ∪ B| = |A| + |B| − |A ∩ B|.', topic: { disciplineSlug: RL, topic: 'Áreas avaliadas' } },
      { front: 'Área do retângulo e hectare', back: 'base × altura. 1 ha = 10.000 m². (250×40 = 10.000 m² = 1 ha.)', topic: { disciplineSlug: RL, topic: 'Álgebra e geometria básicas' } }
    ]
  }
]

// ─────────── ACS — Administração/Situações Gerenciais + Conhecimentos Técnicos ───────────
export const IBGE_BANK_ACS_DECKS: SeedStarterDeck[] = [
  {
    name: 'IBGE ACS — Administração (banco extenso)',
    disciplineSlug: ADM_ACS,
    description: 'Teorias, funções e gestão no padrão IBFC (ACS).',
    cards: [
      { front: 'Taylor', back: 'Administração CIENTÍFICA: racionalização do trabalho, tempos e movimentos (nível operacional).', topic: { disciplineSlug: ADM_ACS, topic: 'Aspectos gerais da Administração; organizações como sistemas abertos' } },
      { front: 'Weber', back: 'Teoria BUROCRÁTICA: hierarquia, impessoalidade, normas escritas, mérito.', topic: { disciplineSlug: ADM_ACS, topic: 'Aspectos gerais da Administração; organizações como sistemas abertos' } },
      { front: 'Maslow — nível de "reconhecimento/status"', back: 'ESTIMA (4º nível). Topo = autorrealização.', topic: { disciplineSlug: ADM_ACS, topic: 'Motivação, comunicação e liderança' } },
      { front: 'Teoria Y (McGregor)', back: 'Pessoas buscam responsabilidade e se autodirigem (visão otimista). X = controle/punição.', topic: { disciplineSlug: ADM_ACS, topic: 'Motivação, comunicação e liderança' } },
      { front: 'Decisão programada × não programada', back: 'Programada: rotineira, com procedimento. Não programada: nova/complexa, exige julgamento.', topic: { disciplineSlug: ADM_ACS, topic: 'Processo decisório e resolução de problemas' } },
      { front: 'Poder de referência (French & Raven)', back: 'Influência por admiração/identificação (carisma). Competência = perito; legítimo = cargo.', topic: { disciplineSlug: ADM_ACS, topic: 'Responsabilidade, coordenação, autoridade, poder e delegação' } },
      { front: 'Avaliação 360°', back: 'Avaliado por chefe, pares, subordinados e por si mesmo (múltiplas fontes).', topic: { disciplineSlug: ADM_ACS, topic: 'Avaliação de desempenho' } },
      { front: 'PDCA — etapa "Check"', back: 'Verificar/medir os resultados frente ao planejado.', topic: { disciplineSlug: ADM_ACS, topic: 'Compromisso com a qualidade nos serviços prestados' } },
      { front: 'Controle concomitante', back: 'Ocorre DURANTE a execução (correção em tempo real). Prévio=antes; posterior=depois.', topic: { disciplineSlug: ADM_ACS, topic: 'Controle' } },
      { front: 'Metas SMART', back: 'eSpecíficas, Mensuráveis, Alcançáveis, Relevantes, Temporais.', topic: { disciplineSlug: ADM_ACS, topic: 'Planejamento' } }
    ]
  },
  {
    name: 'IBGE ACS — Censo (banco extenso)',
    disciplineSlug: CT,
    description: 'Conceitos do Censo Agropecuário e da supervisão de campo (ACS).',
    cards: [
      { front: 'Cobertura (Censo)', back: 'Proporção das unidades já recenseadas em relação ao total previsto.', topic: { disciplineSlug: CT, topic: 'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências' } },
      { front: 'DMC — online/offline', back: 'Coleta offline sem sinal; transmite quando há Wi-Fi/4G. Há logs de transmissão.', topic: { disciplineSlug: CT, topic: 'Uso de dispositivos móveis (DMC) e transmissão de dados de coleta' } },
      { front: 'Prestar informação ao IBGE (Lei 5.534/68)', back: 'OBRIGATÓRIA, com sigilo e uso exclusivamente estatístico.', topic: { disciplineSlug: CT, topic: 'Mediação com informantes e articulação institucional local' } },
      { front: 'Unidade do Censo Agropecuário', back: 'O estabelecimento agropecuário (unidade de produção sob uma administração).', topic: { disciplineSlug: CT, topic: 'Conhecimentos técnicos do 12º Censo Agropecuário, Florestal e Aquícola (apostila oficial)' } }
    ]
  }
]

// ─────────── ACA — Noções de Administração ───────────
export const IBGE_BANK_ACA_DECKS: SeedStarterDeck[] = [
  {
    name: 'IBGE ACA — Administração (banco extenso)',
    disciplineSlug: ADM_ACA,
    description: 'Administração, atendimento e arquivo no padrão IBFC (ACA).',
    cards: [
      { front: 'Burocracia (Weber)', back: 'Hierarquia, impessoalidade, normas escritas, mérito. NÃO é informalidade.', topic: { disciplineSlug: ADM_ACA, topic: 'Aspectos gerais da Administração; organizações como sistemas abertos' } },
      { front: 'Coordenação (Fayol)', back: 'Harmonizar e integrar os esforços dos setores rumo ao objetivo comum.', topic: { disciplineSlug: ADM_ACA, topic: 'Funções administrativas: planejamento, organização, direção, coordenação e controle' } },
      { front: 'Melhorar só fatores higiênicos (Herzberg)', back: 'Reduz a insatisfação, mas NÃO motiva.', topic: { disciplineSlug: ADM_ACA, topic: 'Motivação, comunicação e liderança' } },
      { front: 'Feedback (comunicação)', back: 'Retorno do receptor que confirma se a mensagem foi compreendida.', topic: { disciplineSlug: ADM_ACA, topic: 'Motivação, comunicação e liderança' } },
      { front: 'Grupo informal', back: 'Surge espontaneamente por afinidade (não vem do organograma).', topic: { disciplineSlug: ADM_ACA, topic: 'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho' } },
      { front: 'Delegação — responsabilidade final', back: 'NÃO se transfere: permanece com o delegante. Delega-se autoridade/execução.', topic: { disciplineSlug: ADM_ACA, topic: 'Responsabilidade, coordenação, autoridade, poder e delegação' } },
      { front: 'Perecibilidade (serviços)', back: 'Serviço não pode ser estocado (horário não usado se perde).', topic: { disciplineSlug: ADM_ACA, topic: 'Qualidade na prestação de serviços' } },
      { front: 'Escuta ativa', back: 'Ouvir com atenção plena, sem interromper, para compreender a demanda do cidadão.', topic: { disciplineSlug: ADM_ACA, topic: 'Noções de atendimento ao público' } },
      { front: 'Impessoalidade no atendimento', back: 'Tratar todos igualmente; prioridade só a quem a lei garante.', topic: { disciplineSlug: ADM_ACA, topic: 'Noções de atendimento ao público' } },
      { front: 'Arquivo intermediário', back: 'Uso eventual; aguarda prazos antes de eliminar ou recolher ao permanente.', topic: { disciplineSlug: ADM_ACA, topic: 'Noções de documentação e arquivo' } },
      { front: 'Protocolo', back: 'Receber, registrar, distribuir e controlar a tramitação de documentos.', topic: { disciplineSlug: ADM_ACA, topic: 'Noções de documentação e arquivo' } },
      { front: 'Planejamento estratégico', back: 'Longo prazo, abrange toda a organização e seus grandes objetivos.', topic: { disciplineSlug: ADM_ACA, topic: 'Funções administrativas: planejamento, organização, direção, coordenação e controle' } }
    ]
  }
]
