// Decks iniciais de flashcards da ABGF 2026 (M15: flashcards ligados a
// tópicos do conhecimento; entram na fila FSRS imediatamente).
import type { SeedStarterDeck } from '../types'

export const ABGF_STARTER_DECKS: SeedStarterDeck[] = [
  {
    name: 'TI — Siglas e conceitos-chave (ABGF)',
    disciplineSlug: 'seguranca-cibernetica',
    description: 'Os conceitos de TI que a FCC mais cobra em prova, prontos para revisão espaçada.',
    cards: [
      {
        front: 'Princípios CID da segurança da informação',
        back: 'Confidencialidade, Integridade e Disponibilidade (+ autenticidade e não repúdio como complementares).',
        topic: { disciplineSlug: 'seguranca-cibernetica', topic: 'Conceitos fundamentais: vulnerabilidades, ameaças e ataques; princípios CID' }
      },
      {
        front: 'OAuth2 × OpenID Connect',
        back: 'OAuth2 = AUTORIZAÇÃO delegada (acesso a recursos). OIDC = camada de AUTENTICAÇÃO sobre o OAuth2 (id_token).',
        topic: { disciplineSlug: 'seguranca-cibernetica', topic: 'SAML2, OAuth2, OpenID Connect e JWT' }
      },
      {
        front: 'Assinatura digital usa qual chave?',
        back: 'A chave PRIVADA de quem assina (verificação com a pública). Garante integridade, autenticidade e não repúdio.',
        topic: { disciplineSlug: 'seguranca-cibernetica', topic: 'Criptografia' }
      },
      {
        front: 'CVE × NVD × CVSS',
        back: 'CVE identifica a vulnerabilidade; NVD é a base que a enriquece; CVSS pontua a severidade (0–10).',
        topic: { disciplineSlug: 'seguranca-cibernetica', topic: 'Bases de conhecimento: CVE, NVD e CVSS' }
      },
      {
        front: 'Worm × vírus',
        back: 'Worm se autopropaga pela rede, sem hospedeiro; vírus precisa de arquivo hospedeiro executado.',
        topic: { disciplineSlug: 'seguranca-cibernetica', topic: 'Código malicioso: vírus, worm, trojan, ransomware, spyware, keylogger, rootkit' }
      },
      {
        front: 'IaaS × PaaS × SaaS — o que o cliente gerencia?',
        back: 'IaaS: do SO para cima. PaaS: só aplicação e dados. SaaS: nada — apenas usa.',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Modelos de serviço: IaaS, PaaS e SaaS' }
      },
      {
        front: 'Pod no Kubernetes',
        back: 'Menor unidade implantável do K8s: um ou mais contêineres que compartilham rede e armazenamento.',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Contêineres e orquestração: Docker; Kubernetes' }
      },
      {
        front: 'Backup diferencial × incremental',
        back: 'Diferencial: tudo desde o último COMPLETO. Incremental: desde o último backup de QUALQUER tipo.',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Backup: completo, incremental e diferencial; retenção e restauração' }
      },
      {
        front: 'CI × Continuous Delivery × Continuous Deployment',
        back: 'CI: integra+testa a cada commit. Delivery: artefato sempre PRONTO (gate manual). Deployment: produção automática.',
        topic: { disciplineSlug: 'devops-cicd', topic: 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)' }
      },
      {
        front: 'Formas normais (1FN, 2FN, 3FN)',
        back: '1FN: atributos atômicos. 2FN: sem dependência PARCIAL. 3FN: sem dependência TRANSITIVA.',
        topic: { disciplineSlug: 'banco-de-dados', topic: 'Modelo relacional; formas normais' }
      },
      {
        front: 'WHERE × HAVING no SQL',
        back: 'WHERE filtra LINHAS antes do agrupamento; HAVING filtra GRUPOS/agregações depois do GROUP BY.',
        topic: { disciplineSlug: 'banco-de-dados', topic: 'Consultas, junções e subconsultas' }
      },
      {
        front: 'Incidente × problema (ITIL v4)',
        back: 'Incidente: restaurar o serviço RÁPIDO. Problema: investigar a CAUSA RAIZ (erro conhecido, workaround).',
        topic: { disciplineSlug: 'gestao-ti', topic: 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua' }
      }
    ]
  },
  {
    name: 'ABGF, garantias e integridade (essencial)',
    disciplineSlug: 'economia-financas-garantias',
    description: 'O núcleo institucional do concurso: SCE, FGE, SFN, LGPD e controles.',
    cards: [
      {
        front: 'SCE — riscos comercial × político',
        back: 'Comercial: inadimplência/insolvência do importador. Político: atos de governo (moratória, restrição cambial, guerra).',
        topic: { disciplineSlug: 'economia-financas-garantias', topic: 'Seguro de Crédito à Exportação (SCE): cobertura de riscos comerciais, políticos e extraordinários; papel da ABGF' }
      },
      {
        front: 'FGE — o que é e qual lei o criou?',
        back: 'Fundo de Garantia à Exportação (Lei nº 9.818/1999): fundo contábil que lastreia o SCE concedido em nome da União.',
        topic: { disciplineSlug: 'economia-financas-garantias', topic: 'Garantias e fundos garantidores: modalidades; fundos públicos; FGE como instrumento de apoio às exportações' }
      },
      {
        front: 'Cadeia seguro → resseguro → retrocessão',
        back: 'Segurado→seguradora (seguro); seguradora→ressegurador (resseguro); ressegurador→outro ressegurador (retrocessão).',
        topic: { disciplineSlug: 'economia-financas-garantias', topic: 'Mercado de seguros e resseguros: seguro, cosseguro, resseguro e retrocessão; contratos e modalidades' }
      },
      {
        front: 'SFN — papéis de CMN, BCB e CVM',
        back: 'CMN: órgão normativo máximo. BCB: executa e supervisiona instituições. CVM: mercado de valores mobiliários.',
        topic: { disciplineSlug: 'economia-financas-garantias', topic: 'Sistema Financeiro Nacional: CMN, BCB e CVM; instrumentos financeiros; Basileia III (noções)' }
      },
      {
        front: 'LGPD — controlador × operador × encarregado',
        back: 'Controlador decide; operador trata em nome do controlador; encarregado (DPO) é o canal com titulares e ANPD.',
        topic: { disciplineSlug: 'protecao-dados-seguranca', topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD' }
      },
      {
        front: 'Três linhas — quem é a terceira?',
        back: 'A auditoria interna: avaliação independente e objetiva (1ª = gestão operacional; 2ª = riscos/compliance).',
        topic: { disciplineSlug: 'etica-governanca-compliance', topic: 'Controles internos: Framework COSO e COSO ERM; matriz de riscos; três linhas de defesa' }
      },
      {
        front: 'Lei Anticorrupção — tipo de responsabilização da PJ',
        back: 'OBJETIVA (independe de culpa), nos âmbitos administrativo e civil (Lei nº 12.846/2013).',
        topic: { disciplineSlug: 'etica-governanca-compliance', topic: 'Anticorrupção: Lei nº 12.846/2013 e Decreto nº 11.129/2022; leniência; OCDE, FCPA e UK Bribery Act' }
      },
      {
        front: 'Negação de "Se p, então q"',
        back: 'p E não-q (afirma o antecedente e nega o consequente). Nunca é outro "se...então".',
        topic: { disciplineSlug: 'raciocinio-logico', topic: 'Equivalências lógicas; leis de De Morgan; implicações' }
      }
    ]
  }
]
