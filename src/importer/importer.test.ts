// Testes do Universal Contest Import Engine.
// Estratégia:
//  1) DATAPREV: fixture com o TEXTO REAL do conteúdo programático do Perfil 2
//     (FGV) → asserta a estrutura contra os números do próprio edital.
//  2) ABGF e SEDES: round-trip — renderiza o seed MANUAL em texto de edital
//     numerado e verifica que o parser recupera a mesma estrutura.
//  3) Pipeline, placeholders, relatórios e extensibilidade por banca.
import { describe, expect, it } from 'vitest'
import type { SeedDiscipline, SeedTopic } from '@main/db/seed/curriculum'
import { DATAPREV_CURRICULUM } from '@main/db/seed/contests/dataprev/curriculum'
import { ABGF_CURRICULUM } from '@main/db/seed/contests/abgf/curriculum'
import { CURRICULUM as SEDES_CURRICULUM } from '@main/db/seed/curriculum'
import {
  detectAdapter,
  importContestFromText,
  listAdapters,
  registerAdapter
} from './index'

// ───────────────────── helpers ─────────────────────

function bySlug(disciplines: SeedDiscipline[], slug: string): SeedDiscipline {
  const d = disciplines.find((x) => x.slug === slug)
  if (!d) throw new Error(`disciplina não encontrada: ${slug} (tem: ${disciplines.map((x) => x.slug).join(', ')})`)
  return d
}

function countTopics(topics: SeedTopic[]): { topics: number; subtopics: number } {
  let subtopics = 0
  for (const t of topics) if (typeof t !== 'string') subtopics += t.children.length
  return { topics: topics.length, subtopics }
}

/** Renderiza uma disciplina do seed manual em texto de edital numerado. */
function renderDiscipline(name: string, topics: SeedTopic[]): string {
  const parts: string[] = []
  topics.forEach((t, i) => {
    const n = i + 1
    if (typeof t === 'string') {
      parts.push(`${n} ${t}.`)
    } else {
      let seg = `${n} ${t.name}:`
      t.children.forEach((c, j) => {
        seg += ` ${n}.${j + 1} ${c}.`
      })
      parts.push(seg)
    }
  })
  return `${name.toUpperCase()}:\n${parts.join(' ')}`
}

/** Renderiza um currículo inteiro (com marcadores de bloco) em texto. */
function renderCurriculum(disciplines: SeedDiscipline[]): string {
  const lines: string[] = []
  let block: string | null = null
  for (const d of disciplines) {
    if (d.block !== block) {
      lines.push(d.block === 'GERAL' ? 'CONHECIMENTOS GERAIS' : 'CONHECIMENTOS ESPECÍFICOS')
      block = d.block
    }
    lines.push(renderDiscipline(d.name, d.topics))
  }
  return lines.join('\n')
}

// ───────────────────── 1) DATAPREV (texto real) ─────────────────────

// Trecho literal do conteúdo programático do Perfil 2 (Edital FGV 001/2026),
// com o cabeçalho de metadados que o edital traz.
const DATAPREV_EDITAL = `
CONCURSO PÚBLICO DATAPREV — EDITAL Nº 001/2026
Banca: FGV
A prova objetiva será aplicada no dia 11 de outubro de 2026, das 13h às 17h.
Remuneração inicial de R$ 8.273,94.
A prova terá 70 questões. As questões de conhecimentos específicos terão peso 2,5.

PERFIL 2: ARQUITETURA, ENGENHARIA E SUSTENTAÇÃO TECNOLÓGICA
REDES DE COMPUTADORES:
1 Conceitos de redes de computadores: meios de transmissão, classificação, topologia de redes, redes de longa distância, redes locais e redes sem fio. 2 Elementos de interconexão de redes de computadores (hubs repetidores, switches, roteadores). VLANs. Cabeamento estruturado. 3 Noções dos modelos de referência OSI (Open System Interconnection Reference Model). 4 Noções dos padrões IEEE 802.1, IEEE 802.3, IEEE 802.11 a/b/g/n/ac. 5 Arquitetura e pilhas de protocolos TCP/IP: camada de rede (IPv4, IPv6 e IPsec), conceitos básicos de endereçamento e roteamento; camada de transporte (TCP e UDP); camada de aplicação (FTP, SSH, DNS, SMTP, POP, IMAP, HTTP, HTTPS, SSL, RDP, DHCP). Sistemas de nomes.
BANCO DE DADOS:
1 Banco de dados. 2 Conceitos básicos. 3 Arquitetura. 4 Estrutura de dados. 5 Modelagem e normalização de dados. 6 Noções de administração de dados e de banco de dados. 7 SQL (ANSI). 7.1 Oracle 19C, MySql, Postgresql, MongoDB e MS-SQLSERVER 2019. 8 Arquitetura e políticas de armazenamento, backup, restauração, segurança e monitoração de dados. 9 Engenharia de dados ingestão e armazenamento de grande quantidade de dados (Big Data). 10 Noções para Otimização de Performance em Larga Escala.
ARQUITETURA TECNOLÓGICA:
1 Ciclo de vida do software. 2 Metodologias de desenvolvimento de software. 3 Metodologias ágeis. 4 Qualidade de software. 5 Gestão de Configuração: Controle de versão, controle de mudança e integração contínua. 6 Engenharia de requisitos. 7 Técnicas de Elicitação de requisitos. 8 Gerenciamento de requisitos. 9 Especificação de requisitos. 10 Técnicas de validação de requisitos. 11 Prototipação. 12 Engenharia de usabilidade. 13 Análise de requisitos de usabilidade. 14 Métodos para avaliação de usabilidade. 15 Orientação a objetos: classes e objetos; relacionamentos; herança e polimorfismo; encapsulamento. 16 SOLID. 17 GRASP. 18 TDD. 19 BDD. 20 Padrões de projeto. 21 Análise e projeto orientados a objetos. 22 UML: visão geral, modelos e diagramas. 23 Interoperabilidade de sistemas e padrões de integração: APIs, Gateway de APIs e Web Services; padrões XML, JSON e REST. 24 Engenharia de desempenho: técnicas de análise de desempenho; DEVSECOPS.
COMPUTAÇÃO EM NUVEM E VIRTUALIZAÇÃO:
1 Conceitos de computação em nuvem: conceitos básicos; tipologia (IaaS, PaaS, SaaS). 2 Modelo: privada, pública, híbrida. 3 Benefícios, alta disponibilidade, escalabilidade, elasticidade, agilidade, recuperação de desastres. 4 Componentes centrais da arquitetura em nuvem: distribuição geográfica, regiões, zonas de disponibilidade, subscrições, grupos de gestão, recursos. 5 Características gerais de identidade, privacidade, conformidade e segurança na nuvem. 6 Infrastructure as Code (IaC). 7 Automação. 8 Red Hat Clair. 9 Docker, Harbor, Kubernetes, VMware NSX, VMware vCenter Server, VMware vCloud Director, VMware vRealize Automation, VMware vRealize Log Insight, VMware vRealize Operations, VMware vRealize Orchestrator.
LINGUAGEM DE PROGRAMAÇÃO, FRAMEWORKS E VERSIONAMENTO DE SOFTWARE:
Gitlab, HTML5, CSS3, Java e Javascript React.js; Java EE (EJB, JPA, JMS); Spring Boot; Spring Cloud; Confluent Kafka.
`

describe('DATAPREV 2026 (FGV) — texto real do edital', () => {
  const { seed, report } = importContestFromText(DATAPREV_EDITAL, {
    slug: 'dataprev-2026',
    name: 'DATAPREV 2026',
    defaultBlock: 'ESPECIFICO'
  })

  it('detecta a banca FGV', () => {
    expect(report.resolvedBank).toBe('fgv')
    expect(report.detectedBank).toBe('fgv')
  })

  it('identifica exatamente as 5 disciplinas específicas do Perfil 2', () => {
    expect(seed.disciplines).toHaveLength(5)
    // slug truncado em 60 chars (mesma regra do seed).
    expect(seed.disciplines.map((d) => d.slug)).toEqual([
      'redes-de-computadores',
      'banco-de-dados',
      'arquitetura-tecnologica',
      'computacao-em-nuvem-e-virtualizacao',
      'linguagem-de-programacao-frameworks-e-versionamento-de-softw'
    ])
    expect(seed.disciplines.every((d) => d.block === 'ESPECIFICO')).toBe(true)
  })

  it('recupera a numeração de tópicos fiel ao edital', () => {
    const n = seed.disciplines.map((d) => d.topics.length)
    expect(n[0]).toBe(5) // Redes: itens 1..5
    expect(n[1]).toBe(10) // Banco de Dados: itens 1..10
    expect(n[2]).toBe(24) // Arquitetura Tecnológica: itens 1..24
    expect(n[3]).toBe(9) // Nuvem: itens 1..9
    expect(n[4]).toBeGreaterThanOrEqual(5) // Linguagens: sem numeração → modo delimitado
  })

  it('detecta subtópicos decimais (SQL 7.1 em Banco de Dados)', () => {
    const bd = bySlug(seed.disciplines, 'banco-de-dados')
    const sql = bd.topics.find((t) => typeof t !== 'string' && /SQL/i.test(t.name))
    expect(sql).toBeTruthy()
    if (sql && typeof sql !== 'string') expect(sql.children.length).toBeGreaterThanOrEqual(1)
  })

  it('extrai metadados e estrutura da prova', () => {
    expect(seed.examDate).toBe('2026-10-11')
    expect(seed.salary).toBe('R$ 8.273,94')
    expect(seed.examConfig.durationMin).toBe(240)
    const espec = seed.examConfig.blocks.find((b) => b.block === 'ESPECIFICO')
    expect(espec?.weightPerQuestion).toBe(2.5)
  })

  it('equivale à estrutura curada manualmente (numeradas exatas; delimitada aproximada)', () => {
    expect(seed.disciplines.length).toBe(DATAPREV_CURRICULUM.length)
    const P = seed.disciplines.map((d) => d.topics.length)
    const M = DATAPREV_CURRICULUM.map((d) => d.topics.length)
    // Disciplinas numeradas: equivalência exata com a curadoria manual.
    expect(P[0]).toBe(M[0]) // Redes
    expect(P[1]).toBe(M[1]) // Banco de Dados
    expect(P[3]).toBe(M[3]) // Nuvem
    // Arquitetura: o manual separou o item 24 (desempenho × DevSecOps) em 2.
    expect(Math.abs(P[2] - M[2])).toBeLessThanOrEqual(1)
    // Linguagens: sem numeração no edital → modo delimitado, aproximado.
    expect(P[4]).toBeGreaterThanOrEqual(5)
  })
})

// ───────────────────── 2) Round-trip ABGF e SEDES ─────────────────────

describe('ABGF 2026 (FCC) — round-trip do seed manual', () => {
  const text = 'Banca: FCC\n' + renderCurriculum(ABGF_CURRICULUM)
  const { seed } = importContestFromText(text, { slug: 'abgf-2026', name: 'ABGF 2026', defaultBlock: 'GERAL' })

  it('recupera todas as disciplinas', () => {
    expect(seed.disciplines).toHaveLength(ABGF_CURRICULUM.length)
  })

  it('recupera a contagem de tópicos e subtópicos de cada disciplina', () => {
    ABGF_CURRICULUM.forEach((manual, i) => {
      const parsed = seed.disciplines[i]
      const mc = countTopics(manual.topics)
      const pc = countTopics(parsed.topics)
      // Tópicos de topo: equivalência exata (numeração determinística).
      expect(pc.topics, `tópicos de ${manual.name}`).toBe(mc.topics)
      // Subtópicos: o parser recupera os decimais e ainda enriquece com
      // enumerações entre parênteses → nunca menos que a curadoria manual.
      expect(pc.subtopics, `subtópicos de ${manual.name}`).toBeGreaterThanOrEqual(mc.subtopics)
    })
  })

  it('preserva os blocos GERAL/ESPECÍFICO', () => {
    ABGF_CURRICULUM.forEach((manual, i) => {
      expect(seed.disciplines[i].block).toBe(manual.block)
    })
  })
})

describe('SEDES DF 2026 (Quadrix) — round-trip do seed manual', () => {
  const text = 'Banca: Instituto Quadrix\n' + renderCurriculum(SEDES_CURRICULUM)
  const { seed } = importContestFromText(text, { slug: 'sedes-df-2026', name: 'SEDES DF 2026', defaultBlock: 'GERAL' })

  it('recupera todas as disciplinas', () => {
    expect(seed.disciplines).toHaveLength(SEDES_CURRICULUM.length)
  })

  it('recupera a contagem de tópicos e subtópicos de cada disciplina', () => {
    SEDES_CURRICULUM.forEach((manual, i) => {
      const mc = countTopics(manual.topics)
      const pc = countTopics(seed.disciplines[i].topics)
      expect(pc.topics, `tópicos de ${manual.name}`).toBe(mc.topics)
      expect(pc.subtopics, `subtópicos de ${manual.name}`).toBeGreaterThanOrEqual(mc.subtopics)
    })
  })

  it('detecta a banca Quadrix', () => {
    const { report } = importContestFromText(text)
    expect(report.resolvedBank).toBe('quadrix')
  })
})

// ───────────────────── 3) Pipeline, placeholders, relatórios ─────────────────────

describe('pipeline: placeholders e relatórios', () => {
  const { seed, report } = importContestFromText(DATAPREV_EDITAL, {
    slug: 'dataprev-2026',
    name: 'DATAPREV 2026',
    defaultBlock: 'ESPECIFICO'
  })

  it('gera um placeholder de conhecimento por tópico de topo', () => {
    const totalTopics = seed.disciplines.reduce((s, d) => s + d.topics.length, 0)
    expect(seed.knowledge).toHaveLength(totalTopics)
    expect(report.coverage.knowledgePlaceholders).toBe(totalTopics)
    expect(seed.knowledge!.every((k) => k.entries.length > 0)).toBe(true)
  })

  it('gera relações de CONTINUIDADE seguindo a numeração do edital', () => {
    const expected = seed.disciplines.reduce((s, d) => s + Math.max(0, d.topics.length - 1), 0)
    expect(seed.relations).toHaveLength(expected)
    expect(seed.relations!.every((r) => r.kind === 'CONTINUIDADE')).toBe(true)
  })

  it('produz um seed sem questões (base a curar) e cobertura alta', () => {
    expect(seed.questions).toHaveLength(0)
    expect(report.coverage.disciplines).toBe(5)
    expect(report.coverage.estimatedProgramCoveragePct).toBeGreaterThanOrEqual(60)
  })
})

describe('extensibilidade e fallback', () => {
  it('cai no adaptador genérico e reporta metadados ausentes', () => {
    const { report } = importContestFromText(
      'CONHECIMENTOS ESPECÍFICOS\nMATÉRIA X:\n1 Tópico um. 2 Tópico dois.'
    )
    expect(report.resolvedBank).toBe('generic')
    expect(report.detectedBank).toBeNull()
    expect(report.inconsistencies.some((i) => i.stage === 'metadata')).toBe(true)
  })

  it('permite registrar um novo adaptador de banca sem tocar no pipeline', () => {
    registerAdapter({
      id: 'vunesp',
      label: 'VUNESP',
      matches: (up) => /\bVUNESP\b/.test(up),
      patterns: listAdapters()[0].patterns
    })
    expect(detectAdapter('CONCURSO ORGANIZADO PELA VUNESP')?.id).toBe('vunesp')
  })
})
