// Diagnóstico por TÓPICO dos contests do IBGE (somente leitura).
const { app } = require('electron')
const path = require('node:path')
const Database = require('C:/Users/tr8500254es/Documents/ConcursoSedesDF/node_modules/better-sqlite3')

app.whenReady().then(() => {
  const db = new Database('C:/Users/tr8500254es/AppData/Roaming/aprova-sedes-df/aprova-sedes.db', { readonly: true })
  for (const slug of ['ibge-2026', 'ibge-2026-aca']) {
    const c = db.prepare('SELECT id, name FROM contests WHERE slug=?').get(slug)
    if (!c) { console.log(`\n### ${slug} NAO ENCONTRADO`); continue }
    console.log(`\n############ ${c.name} (${slug}) ############`)
    const disc = db.prepare('SELECT id, name, block FROM disciplines WHERE contest_id=? ORDER BY block, order_index').all(c.id)
    let empty = 0, partial = 0, complete = 0
    for (const d of disc) {
      console.log(`\n== [${d.block}] ${d.name} ==`)
      const topics = db.prepare('SELECT id, name, parent_id FROM topics WHERE discipline_id=? ORDER BY parent_id NULLS FIRST, order_index').all(d.id)
      for (const t of topics) {
        const k = db.prepare('SELECT COUNT(*) n FROM knowledge_entries WHERE topic_id=?').get(t.id).n
        const q = db.prepare('SELECT COUNT(*) n FROM questions WHERE topic_id=?').get(t.id).n
        const f = db.prepare('SELECT COUNT(*) n FROM flashcards WHERE topic_id=?').get(t.id).n
        // classificação: completo = K>=4 e Q>=2; parcial = algum conteúdo; vazio = K=0
        let cls
        if (k === 0) { cls = 'VAZIO   '; empty++ }
        else if (k >= 4 && q >= 2) { cls = 'COMPLETO'; complete++ }
        else { cls = 'PARCIAL '; partial++ }
        const indent = t.parent_id ? '    · ' : '  '
        console.log(`${indent}[${cls}] K=${String(k).padStart(2)} Q=${String(q).padStart(2)} F=${String(f).padStart(2)}  ${t.name.slice(0, 62)}`)
      }
    }
    console.log(`\n>>> ${slug}: VAZIOS=${empty} PARCIAIS=${partial} COMPLETOS=${complete} (total ${empty + partial + complete} tópicos)`)
  }
  db.close(); app.quit()
})
