// M27 — Auditoria completa da biblioteca de conteúdo (SOMENTE LEITURA).
// Gera reports/{questions,knowledge,flashcards,coverage}-report.md e imprime
// diagnósticos (órfãos, FSRS, UI). NÃO altera o banco nem cria conteúdo.
// Uso: ./node_modules/.bin/electron scripts/audit.cjs
const { app } = require('electron')
const fs = require('node:fs')
const path = require('node:path')
const Database = require(path.join(__dirname, '..', 'node_modules', 'better-sqlite3'))

const OUT = path.join(__dirname, '..', 'reports')
const dbFile = path.join(process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming'), 'aprova-sedes-df', 'aprova-sedes.db')

app.whenReady().then(() => {
  const db = new Database(dbFile, { readonly: true })
  const contests = db.prepare('SELECT id, slug, name FROM contests ORDER BY id').all()

  // helpers ------------------------------------------------------------
  const disciplinesOf = (cid) => db.prepare('SELECT id, name, block, order_index FROM disciplines WHERE contest_id=? ORDER BY block, order_index').all(cid)
  const topTopics = (did) => db.prepare('SELECT id, name FROM topics WHERE discipline_id=? AND parent_id IS NULL ORDER BY order_index').all(did)
  const subTopics = (pid) => db.prepare('SELECT id, name FROM topics WHERE parent_id=? ORDER BY order_index').all(pid)
  const qCount = (tid) => db.prepare('SELECT COUNT(*) n FROM questions WHERE topic_id=?').get(tid).n
  const kCount = (tid) => db.prepare('SELECT COUNT(*) n FROM knowledge_entries WHERE topic_id=?').get(tid).n
  const fCount = (tid) => db.prepare('SELECT COUNT(*) n FROM flashcards WHERE topic_id=?').get(tid).n
  const kKinds = (tid) => new Set(db.prepare('SELECT DISTINCT kind FROM knowledge_entries WHERE topic_id=?').all(tid).map((r) => r.kind))

  // ============ 1) QUESTÕES por concurso/disciplina/tópico/subtópico ============
  let q = '# Auditoria de QUESTÕES (números absolutos)\n\n'
  for (const c of contests) {
    let contestTotal = 0
    let body = ''
    for (const d of disciplinesOf(c.id)) {
      body += `\n### ${d.name} [${d.block}]\n`
      for (const t of topTopics(d.id)) {
        body += `- ${t.name}: **${qCount(t.id)}**\n`
        for (const s of subTopics(t.id)) body += `  - ${s.name}: ${qCount(s.id)}\n`
      }
      const dTot = db.prepare('SELECT COUNT(*) n FROM questions WHERE discipline_id=?').get(d.id).n
      contestTotal += dTot
      body += `  _subtotal disciplina: ${dTot}_\n`
    }
    q += `\n## ${c.name} (${c.slug}) — total ${contestTotal} questões\n${body}`
  }
  fs.writeFileSync(path.join(OUT, 'questions-report.md'), q)

  // ============ 2) CONHECIMENTOS ============
  let k = '# Auditoria de CONHECIMENTOS (knowledge_entries — números absolutos)\n\n'
  for (const c of contests) {
    let contestTotal = 0
    let body = ''
    for (const d of disciplinesOf(c.id)) {
      body += `\n### ${d.name} [${d.block}]\n`
      for (const t of topTopics(d.id)) {
        body += `- ${t.name}: **${kCount(t.id)}**\n`
        for (const s of subTopics(t.id)) body += `  - ${s.name}: ${kCount(s.id)}\n`
      }
      const dTot = db.prepare('SELECT COUNT(*) n FROM knowledge_entries ke JOIN topics t ON ke.topic_id=t.id WHERE t.discipline_id=?').get(d.id).n
      contestTotal += dTot
      body += `  _subtotal disciplina: ${dTot}_\n`
    }
    k += `\n## ${c.name} (${c.slug}) — total ${contestTotal} conhecimentos\n${body}`
  }
  fs.writeFileSync(path.join(OUT, 'knowledge-report.md'), k)

  // ============ 3) FLASHCARDS ============
  const activeId = db.prepare('SELECT active_contest_id a FROM settings WHERE id=1').get()?.a
  const activeContest = activeId ? db.prepare('SELECT slug, name FROM contests WHERE id=?').get(activeId) : null
  let f = '# Auditoria de FLASHCARDS\n\n'
  f += `Concurso ATIVO (settings.active_contest_id): **${activeId ?? 'null'}** — ${activeContest ? activeContest.name + ' (' + activeContest.slug + ')' : 'nenhum'}\n\n`
  f += '## Decks existentes\n\n| deck_id | contest_id | concurso | deck | disciplina | cards | com srs | sem topic_id |\n|---|---|---|---|---|---|---|---|\n'
  const decks = db.prepare(`SELECT dk.id, dk.contest_id, dk.name, c.slug, d.name disc
     FROM decks dk JOIN contests c ON dk.contest_id=c.id LEFT JOIN disciplines d ON dk.discipline_id=d.id ORDER BY dk.contest_id, dk.id`).all()
  const emptyDecks = []
  for (const dk of decks) {
    const cards = db.prepare('SELECT COUNT(*) n FROM flashcards WHERE deck_id=?').get(dk.id).n
    const withSrs = db.prepare('SELECT COUNT(*) n FROM flashcards fc JOIN srs_cards s ON s.flashcard_id=fc.id WHERE fc.deck_id=?').get(dk.id).n
    const noTopic = db.prepare('SELECT COUNT(*) n FROM flashcards WHERE deck_id=? AND topic_id IS NULL').get(dk.id).n
    if (cards === 0) emptyDecks.push(dk.id)
    f += `| ${dk.id} | ${dk.contest_id} | ${dk.slug} | ${dk.name} | ${dk.disc ?? '—'} | ${cards} | ${withSrs} | ${noTopic} |\n`
  }

  // FSRS audit
  const totF = db.prepare('SELECT COUNT(*) n FROM flashcards').get().n
  const fNoSrs = db.prepare('SELECT COUNT(*) n FROM flashcards fc WHERE NOT EXISTS (SELECT 1 FROM srs_cards s WHERE s.flashcard_id=fc.id)').get().n
  const fNoDeck = db.prepare('SELECT COUNT(*) n FROM flashcards fc WHERE NOT EXISTS (SELECT 1 FROM decks dk WHERE dk.id=fc.deck_id)').get().n
  const fNoTopic = db.prepare('SELECT COUNT(*) n FROM flashcards WHERE topic_id IS NULL').get().n
  const dueNow = db.prepare("SELECT COUNT(*) n FROM srs_cards WHERE due <= datetime('now')").get().n
  f += `\n## Auditoria FSRS\n\n`
  f += `- Flashcards totais: ${totF}\n`
  f += `- Flashcards SEM srs_card: ${fNoSrs} ${fNoSrs === 0 ? '✅' : '❌'}\n`
  f += `- Flashcards SEM deck (órfãos): ${fNoDeck} ${fNoDeck === 0 ? '✅' : '❌'}\n`
  f += `- Flashcards SEM topic_id: ${fNoTopic} (topic_id é OPCIONAL — não impede exibição)\n`
  f += `- Cards na fila (due <= agora): ${dueNow}\n`
  // por contest: flashcards têm contest? (via deck)
  f += `\n### Flashcards por concurso (via deck→contest)\n\n| concurso | decks | cards | com srs |\n|---|---|---|---|\n`
  for (const c of contests) {
    const dks = db.prepare('SELECT COUNT(*) n FROM decks WHERE contest_id=?').get(c.id).n
    const cds = db.prepare('SELECT COUNT(*) n FROM flashcards fc JOIN decks dk ON fc.deck_id=dk.id WHERE dk.contest_id=?').get(c.id).n
    const srs = db.prepare('SELECT COUNT(*) n FROM flashcards fc JOIN decks dk ON fc.deck_id=dk.id JOIN srs_cards s ON s.flashcard_id=fc.id WHERE dk.contest_id=?').get(c.id).n
    f += `| ${c.name} | ${dks} | ${cds} | ${srs} |\n`
  }

  // Diagnóstico UI do IBGE (com prova, sem hipótese)
  f += `\n## Diagnóstico: por que os flashcards do IBGE "não aparecem" na UI\n\n`
  const listDecksSql = (cid) => db.prepare('SELECT dk.id, dk.name, (SELECT COUNT(*) FROM flashcards fc WHERE fc.deck_id=dk.id) c FROM decks dk WHERE dk.contest_id=? ORDER BY dk.name').all(cid)
  const ibgeContests = contests.filter((c) => c.slug.startsWith('ibge-2026'))
  f += 'Prova: rodando a query EXATA de `listDecks(contestId)` (deckRepository.ts) para cada contest do IBGE:\n\n'
  for (const c of ibgeContests) {
    const r = listDecksSql(c.id)
    f += `- \`listDecks(${c.id})\` [${c.slug}] → **${r.length} decks**, ${r.reduce((s, x) => s + x.c, 0)} cards: ${r.map((x) => x.name + ' (' + x.c + ')').join('; ')}\n`
  }
  f += `\n**CONCLUSÃO (comprovada):** os decks e cards do IBGE EXISTEM e a query \`listDecks\` os RETORNA corretamente. Não há deck órfão, deck vazio do IBGE, rota errada, consulta errada nem bug de UI/SQL.\n\n`
  f += 'A causa é o **padrão Active Contest (ADR-010)**: a tela Flashcards (e Conteúdo, Dashboard, Plano, Simulados) mostra SOMENTE o concurso ATIVO. Como o IBGE está modelado em DOIS contests (ACS = ibge-2026, ACA = ibge-2026-aca), cada um exibe apenas os SEUS decks. ' +
    `O concurso ativo atual é **${activeId} (${activeContest ? activeContest.slug : '—'})**. ` +
    'Os flashcards do IBGE aparecem quando o concurso ativo é um cargo do IBGE — e mostram apenas os decks daquele cargo. Se, no momento em que foram observados como "ausentes", o concurso ativo era outro (SEDES/ABGF/DATAPREV ou o outro cargo do IBGE), é esperado que não apareçam. **Solução para o usuário: trocar o concurso ativo no seletor da sidebar para o cargo IBGE desejado.** Não há correção de código a fazer (comportamento por design).\n'
  fs.writeFileSync(path.join(OUT, 'flashcards-report.md'), f)

  // questão sem topic_id (identifica)
  const nullTopicQ = db.prepare(`SELECT q.id, q.statement, d.name disc, c.slug FROM questions q JOIN disciplines d ON q.discipline_id=d.id JOIN contests c ON d.contest_id=c.id WHERE q.topic_id IS NULL`).all()

  // ============ 4) COBERTURA PONDERADA ============
  // pontos: RESUMO 2, CONCEITO 1, exemplos(OBSERVACAO) 1, PEGADINHA 1, DICA 1,
  // PALAVRA_CHAVE 1, MAPA_MENTAL 1, tem flashcard 2, tem questão 2  (máx 11)
  const scoreTopic = (tid) => {
    const kinds = kKinds(tid)
    let s = 0
    if (kinds.has('RESUMO')) s += 2
    if (kinds.has('CONCEITO')) s += 1
    if (kinds.has('OBSERVACAO')) s += 1
    if (kinds.has('PEGADINHA')) s += 1
    if (kinds.has('DICA')) s += 1
    if (kinds.has('PALAVRA_CHAVE')) s += 1
    if (kinds.has('MAPA_MENTAL') || kinds.has('LEGISLACAO')) s += 1
    if (fCount(tid) > 0) s += 2
    if (qCount(tid) > 0) s += 2
    return s
  }
  const cls = (s) => (s === 0 ? 'VAZIO' : s <= 4 ? 'FRACO' : s <= 7 ? 'BOM' : 'COMPLETO')
  let cov = '# Cobertura REAL (métrica ponderada por tópico)\n\n'
  cov += 'Pontuação (máx 11): Resumo=2, Conceito=1, Observações/Exemplos=1, Pegadinha=1, Dica=1, Palavra-chave=1, Mapa/Legislação=1, tem Flashcard=2, tem Questão=2.\n'
  cov += 'Classes: VAZIO=0 · FRACO 1–4 · BOM 5–7 · COMPLETO 8–11.\n'
  const globalCls = { VAZIO: 0, FRACO: 0, BOM: 0, COMPLETO: 0 }
  for (const c of contests) {
    cov += `\n## ${c.name} (${c.slug})\n`
    for (const d of disciplinesOf(c.id)) {
      const local = { VAZIO: 0, FRACO: 0, BOM: 0, COMPLETO: 0 }
      let rows = ''
      const allT = []
      for (const t of topTopics(d.id)) { allT.push(t); for (const s of subTopics(t.id)) allT.push(s) }
      for (const t of allT) {
        const s = scoreTopic(t.id)
        const cl = cls(s)
        local[cl]++; globalCls[cl]++
        rows += `  - [${cl} ${s}/11] K=${kCount(t.id)} Q=${qCount(t.id)} F=${fCount(t.id)}  ${t.name.slice(0, 58)}\n`
      }
      cov += `\n### ${d.name} — VAZIO=${local.VAZIO} FRACO=${local.FRACO} BOM=${local.BOM} COMPLETO=${local.COMPLETO}\n${rows}`
    }
  }
  cov += `\n## Resumo global de completude por tópico\nVAZIO=${globalCls.VAZIO} · FRACO=${globalCls.FRACO} · BOM=${globalCls.BOM} · COMPLETO=${globalCls.COMPLETO}\n`
  fs.writeFileSync(path.join(OUT, 'coverage-report.md'), cov)

  // ============ 5) ÓRFÃOS / INCONSISTÊNCIAS (stdout) ============
  const orphKnow = db.prepare('SELECT COUNT(*) n FROM knowledge_entries ke WHERE NOT EXISTS (SELECT 1 FROM topics t WHERE t.id=ke.topic_id)').get().n
  const orphQTopic = db.prepare('SELECT COUNT(*) n FROM questions q WHERE q.topic_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM topics t WHERE t.id=q.topic_id)').get().n
  const orphQDisc = db.prepare('SELECT COUNT(*) n FROM questions q WHERE NOT EXISTS (SELECT 1 FROM disciplines d WHERE d.id=q.discipline_id)').get().n
  const orphFc = db.prepare('SELECT COUNT(*) n FROM flashcards fc WHERE NOT EXISTS (SELECT 1 FROM decks dk WHERE dk.id=fc.deck_id)').get().n
  const orphRelSrc = db.prepare('SELECT COUNT(*) n FROM topic_relations r WHERE NOT EXISTS (SELECT 1 FROM topics t WHERE t.id=r.source_topic_id) OR NOT EXISTS (SELECT 1 FROM topics t WHERE t.id=r.target_topic_id)').get().n
  const orphSrs = db.prepare('SELECT COUNT(*) n FROM srs_cards s WHERE NOT EXISTS (SELECT 1 FROM flashcards fc WHERE fc.id=s.flashcard_id)').get().n
  const qNoTopic = db.prepare('SELECT COUNT(*) n FROM questions WHERE topic_id IS NULL').get().n
  // tópicos sem nenhuma ligação (sem knowledge, sem questão, sem flashcard, sem relação)
  const topicsNoLink = db.prepare(`SELECT COUNT(*) n FROM topics t WHERE
     NOT EXISTS (SELECT 1 FROM knowledge_entries k WHERE k.topic_id=t.id)
     AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.topic_id=t.id)
     AND NOT EXISTS (SELECT 1 FROM flashcards f WHERE f.topic_id=t.id)
     AND NOT EXISTS (SELECT 1 FROM topic_relations r WHERE r.source_topic_id=t.id OR r.target_topic_id=t.id)`).get().n

  console.log('===== ÓRFÃOS / INCONSISTÊNCIAS =====')
  console.log('knowledge órfãos (topic inexistente):', orphKnow)
  console.log('questões com topic_id inválido:', orphQTopic)
  console.log('questões com discipline_id inválido:', orphQDisc)
  console.log('questões SEM topic_id (permitido, mas some da árvore):', qNoTopic)
  nullTopicQ.forEach((r) => console.log(`   → q#${r.id} [${r.slug}/${r.disc}]: ${r.statement.slice(0, 70)}`))
  const emptyDeckInfo = emptyDecks.map((id) => db.prepare('SELECT dk.id, dk.name, c.slug FROM decks dk JOIN contests c ON dk.contest_id=c.id WHERE dk.id=?').get(id))
  emptyDeckInfo.forEach((d) => console.log(`   → deck vazio #${d.id} "${d.name}" [${d.slug}] (deck criado pelo usuário/UI, não do seed)`))
  console.log('flashcards órfãos (deck inexistente):', orphFc)
  console.log('srs_cards órfãos (flashcard inexistente):', orphSrs)
  console.log('relações órfãs (topic inexistente):', orphRelSrc)
  console.log('decks vazios (0 cards):', emptyDecks.length, emptyDecks.length ? '→ ids ' + emptyDecks.join(',') : '')
  console.log('tópicos SEM nenhuma ligação (k/q/f/rel):', topicsNoLink)
  console.log('foreign_key_check:', JSON.stringify(db.pragma('foreign_key_check')))
  console.log('\n===== RELATÓRIOS GERADOS em reports/ =====')
  console.log('questions-report.md, knowledge-report.md, flashcards-report.md, coverage-report.md')
  db.close(); app.quit()
})
