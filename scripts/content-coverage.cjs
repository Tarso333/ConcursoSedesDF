// Relatório de cobertura de conteúdo (SOMENTE LEITURA) — dev tool.
// Executa sobre o banco real usando as engines existentes (nenhuma tabela
// nova, nenhuma escrita). Uso:
//   ./node_modules/.bin/electron scripts/content-coverage.cjs
// Mostra, por concurso e disciplina: tópicos, cobertura de conhecimento,
// knowledge/questões/flashcards/relações; e um ranking das disciplinas
// mais pobres em conteúdo (para priorizar a próxima carga).
const { app } = require('electron')
const path = require('node:path')
const Database = require(path.join(__dirname, '..', 'node_modules', 'better-sqlite3'))

function dbPath() {
  // userData padrão do Electron para este app.
  const roaming = process.env.APPDATA || path.join(process.env.USERPROFILE || '', 'AppData', 'Roaming')
  return path.join(roaming, 'aprova-sedes-df', 'aprova-sedes.db')
}

app.whenReady().then(() => {
  const db = new Database(dbPath(), { readonly: true })
  const contests = db.prepare('SELECT id, slug, name FROM contests ORDER BY id').all()
  const poorest = []

  for (const c of contests) {
    console.log(`\n======== ${c.name} (${c.slug}) ========`)
    const disc = db
      .prepare('SELECT id, name, block FROM disciplines WHERE contest_id=? ORDER BY block, order_index')
      .all(c.id)
    let totK = 0, totQ = 0, totF = 0, totR = 0, totT = 0, totTk = 0
    for (const d of disc) {
      const topicsTotal = db.prepare('SELECT COUNT(*) n FROM topics WHERE discipline_id=?').get(d.id).n
      const topicsWithK = db
        .prepare('SELECT COUNT(DISTINCT t.id) n FROM topics t JOIN knowledge_entries k ON k.topic_id=t.id WHERE t.discipline_id=?')
        .get(d.id).n
      const kCount = db.prepare('SELECT COUNT(*) n FROM knowledge_entries k JOIN topics t ON k.topic_id=t.id WHERE t.discipline_id=?').get(d.id).n
      const qCount = db.prepare('SELECT COUNT(*) n FROM questions WHERE discipline_id=?').get(d.id).n
      const fCount = db.prepare('SELECT COUNT(*) n FROM flashcards f JOIN topics t ON f.topic_id=t.id WHERE t.discipline_id=?').get(d.id).n
      const rCount = db.prepare('SELECT COUNT(*) n FROM topic_relations r JOIN topics t ON r.source_topic_id=t.id WHERE t.discipline_id=?').get(d.id).n
      totK += kCount; totQ += qCount; totF += fCount; totR += rCount; totT += topicsTotal; totTk += topicsWithK
      const kCov = topicsTotal ? Math.round((topicsWithK / topicsTotal) * 100) : 0
      console.log(`  [${d.block[0]}] ${d.name.slice(0, 52).padEnd(52)} top=${String(topicsTotal).padStart(3)} kCov=${String(kCov).padStart(3)}% K=${String(kCount).padStart(3)} Q=${String(qCount).padStart(3)} F=${String(fCount).padStart(3)} R=${String(rCount).padStart(3)}`)
      const poverty = (100 - kCov) + Math.max(0, 20 - qCount) * 2 + Math.max(0, 10 - fCount)
      poorest.push({ contest: c.slug, discipline: d.name, kCov, qCount, fCount, poverty })
    }
    const tCov = totT ? Math.round((totTk / totT) * 100) : 0
    console.log(`  ---- TOTAL: topicos=${totT} (com conhecimento=${totTk}, ${tCov}%) K=${totK} Q=${totQ} F=${totF} R=${totR}`)
  }

  console.log('\n\n======== RANKING — DISCIPLINAS MAIS POBRES (top 20) ========')
  poorest.sort((a, b) => b.poverty - a.poverty)
  poorest.slice(0, 20).forEach((p, i) => {
    console.log(`${String(i + 1).padStart(2)}. [${p.contest}] ${p.discipline.slice(0, 48).padEnd(48)} kCov=${p.kCov}% Q=${p.qCount} F=${p.fCount}`)
  })

  console.log('\n======== TOTAIS GLOBAIS ========')
  console.log('knowledge_entries =', db.prepare('SELECT COUNT(*) n FROM knowledge_entries').get().n)
  console.log('questions =', db.prepare('SELECT COUNT(*) n FROM questions').get().n)
  console.log('flashcards =', db.prepare('SELECT COUNT(*) n FROM flashcards').get().n)
  console.log('topic_relations =', db.prepare('SELECT COUNT(*) n FROM topic_relations').get().n)
  console.log('foreign_key_check =', JSON.stringify(db.pragma('foreign_key_check')))
  db.close()
  app.quit()
})
