import type Database from 'better-sqlite3'

// Migrations versionadas via PRAGMA user_version — padrão robusto p/ SQLite
// embarcado, sem dependência de drizzle-kit no runtime. Cada migration é
// idempotente e aplicada em transação. Para evoluir o schema: adicionar nova
// entrada com version = N+1 (nunca editar as antigas).

interface Migration {
  version: number
  name: string
  up: string
}

const MIGRATION_0001_INIT = /* sql */ `
CREATE TABLE IF NOT EXISTS disciplines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  block TEXT NOT NULL,
  weight INTEGER NOT NULL DEFAULT 1,
  exam_question_estimate INTEGER NOT NULL DEFAULT 0,
  color TEXT NOT NULL DEFAULT '#6366f1',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  discipline_id INTEGER NOT NULL REFERENCES disciplines(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  discipline_id INTEGER NOT NULL REFERENCES disciplines(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES topics(id) ON DELETE SET NULL,
  type TEXT NOT NULL DEFAULT 'ME',
  statement TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'MEDIO',
  explanation TEXT,
  source TEXT,
  year INTEGER,
  board TEXT NOT NULL DEFAULT 'Quadrix',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS question_options (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  letter TEXT NOT NULL,
  text TEXT NOT NULL,
  is_correct INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  user_name TEXT NOT NULL DEFAULT 'Concurseiro(a)',
  theme TEXT NOT NULL DEFAULT 'dark',
  exam_date TEXT NOT NULL DEFAULT '2026-09-06',
  daily_goal_minutes INTEGER NOT NULL DEFAULT 180,
  daily_goal_questions INTEGER NOT NULL DEFAULT 30,
  ai_provider TEXT,
  ai_model TEXT,
  ai_api_key TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS mock_exams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'PERSONALIZADO',
  status TEXT NOT NULL DEFAULT 'EM_ANDAMENTO',
  total_questions INTEGER NOT NULL DEFAULT 0,
  time_limit_sec INTEGER,
  started_at TEXT,
  finished_at TEXT,
  score REAL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_option_id INTEGER REFERENCES question_options(id) ON DELETE SET NULL,
  is_correct INTEGER NOT NULL DEFAULT 0,
  time_ms INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'BANCO',
  mock_exam_id INTEGER REFERENCES mock_exams(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS error_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  answer_id INTEGER REFERENCES answers(id) ON DELETE SET NULL,
  error_type TEXT,
  status TEXT NOT NULL DEFAULT 'ABERTO',
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT
);

CREATE TABLE IF NOT EXISTS decks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS flashcards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deck_id INTEGER NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  source_question_id INTEGER REFERENCES questions(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS srs_cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  flashcard_id INTEGER NOT NULL UNIQUE REFERENCES flashcards(id) ON DELETE CASCADE,
  due TEXT NOT NULL,
  stability REAL NOT NULL DEFAULT 0,
  difficulty REAL NOT NULL DEFAULT 0,
  elapsed_days INTEGER NOT NULL DEFAULT 0,
  scheduled_days INTEGER NOT NULL DEFAULT 0,
  reps INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  state INTEGER NOT NULL DEFAULT 0,
  last_review TEXT
);

CREATE TABLE IF NOT EXISTS srs_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  srs_card_id INTEGER NOT NULL REFERENCES srs_cards(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL,
  state INTEGER NOT NULL,
  due TEXT NOT NULL,
  stability REAL NOT NULL,
  difficulty REAL NOT NULL,
  elapsed_days INTEGER NOT NULL,
  last_elapsed_days INTEGER NOT NULL,
  scheduled_days INTEGER NOT NULL,
  review TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mock_exam_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mock_exam_id INTEGER NOT NULL REFERENCES mock_exams(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL DEFAULT 0,
  selected_option_id INTEGER REFERENCES question_options(id) ON DELETE SET NULL,
  is_correct INTEGER,
  time_ms INTEGER
);

CREATE TABLE IF NOT EXISTS study_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  start_date TEXT NOT NULL,
  exam_date TEXT NOT NULL,
  daily_minutes INTEGER NOT NULL DEFAULT 180,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS study_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plan_id INTEGER NOT NULL REFERENCES study_plans(id) ON DELETE CASCADE,
  discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
  date TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'TEORIA',
  title TEXT NOT NULL,
  planned_minutes INTEGER NOT NULL DEFAULT 60,
  done INTEGER NOT NULL DEFAULT 0,
  done_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period TEXT NOT NULL,
  metric TEXT NOT NULL,
  target INTEGER NOT NULL,
  period_start TEXT NOT NULL,
  period_end TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS study_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  duration_sec INTEGER NOT NULL DEFAULT 0,
  questions_count INTEGER NOT NULL DEFAULT 0,
  source TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS gamification (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak_days INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_active_date TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  unlocked_at TEXT
);

CREATE TABLE IF NOT EXISTS ai_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  context_type TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_topics_discipline ON topics(discipline_id);
CREATE INDEX IF NOT EXISTS idx_questions_discipline ON questions(discipline_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_options_question ON question_options(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_created ON answers(created_at);
CREATE INDEX IF NOT EXISTS idx_error_question ON error_logs(question_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_deck ON flashcards(deck_id);
CREATE INDEX IF NOT EXISTS idx_srs_due ON srs_cards(due);
CREATE INDEX IF NOT EXISTS idx_mock_items_exam ON mock_exam_items(mock_exam_id);
CREATE INDEX IF NOT EXISTS idx_study_tasks_date ON study_tasks(plan_id, date);
`

const MIGRATION_0002_QUESTION_STATES = /* sql */ `
CREATE TABLE IF NOT EXISTS question_states (
  question_id INTEGER PRIMARY KEY REFERENCES questions(id) ON DELETE CASCADE,
  favorite INTEGER NOT NULL DEFAULT 0,
  note TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`

const MIGRATION_0003_SEED_KEY = /* sql */ `
ALTER TABLE questions ADD COLUMN seed_key TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_questions_seed_key ON questions(seed_key) WHERE seed_key IS NOT NULL;
`

// v4 — Plataforma multi-concurso: cria o agregado `contests`, migra o SEDES
// como primeiro concurso cadastrado (preservando a data da prova configurada
// pelo usuário), reconstrói `disciplines` com escopo por concurso
// (UNIQUE(contest_id, slug)) e vincula as demais entidades ao concurso.
// A estrutura da prova vira DADO (exam_config JSON) — nada de regra fixa.
const SEDES_EXAM_CONFIG_JSON =
  '{"durationMin":180,"blocks":[' +
  '{"block":"GERAL","label":"Conhecimentos Gerais","questions":20,"weightPerQuestion":1,"minScorePct":50},' +
  '{"block":"ESPECIFICO","label":"Conhecimentos Específicos","questions":40,"weightPerQuestion":2,"minScorePct":50}' +
  '],"approvalTargetPct":68}'

const MIGRATION_0004_CONTESTS = /* sql */ `
CREATE TABLE IF NOT EXISTS contests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT,
  board TEXT,
  exam_date TEXT,
  city TEXT,
  salary TEXT,
  benefits TEXT,
  exam_config TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO contests (slug, name, role, board, exam_date, city, salary, exam_config)
SELECT
  'sedes-df-2026',
  'SEDES DF 2026',
  'Técnico em Desenvolvimento e Assistência Social — Técnico Administrativo',
  'Instituto Quadrix',
  COALESCE((SELECT exam_date FROM settings WHERE id = 1), '2026-09-06'),
  'Brasília/DF',
  'R$ 4.320,16',
  '${SEDES_EXAM_CONFIG_JSON}'
WHERE NOT EXISTS (SELECT 1 FROM contests WHERE slug = 'sedes-df-2026');

-- Rebuild de disciplines: ganha contest_id e unicidade composta (contest, slug).
CREATE TABLE disciplines_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contest_id INTEGER NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  block TEXT NOT NULL,
  weight INTEGER NOT NULL DEFAULT 1,
  exam_question_estimate INTEGER NOT NULL DEFAULT 0,
  color TEXT NOT NULL DEFAULT '#6366f1',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (contest_id, slug)
);
INSERT INTO disciplines_new (id, contest_id, slug, name, block, weight, exam_question_estimate, color, order_index, created_at)
SELECT d.id, (SELECT id FROM contests WHERE slug = 'sedes-df-2026'),
       d.slug, d.name, d.block, d.weight, d.exam_question_estimate, d.color, d.order_index, d.created_at
FROM disciplines d;
DROP TABLE disciplines;
ALTER TABLE disciplines_new RENAME TO disciplines;
CREATE INDEX IF NOT EXISTS idx_disciplines_contest ON disciplines(contest_id);

-- Entidades com vínculo direto ao concurso (as demais herdam via disciplina/questão/deck).
ALTER TABLE decks ADD COLUMN contest_id INTEGER REFERENCES contests(id);
UPDATE decks SET contest_id = (SELECT id FROM contests WHERE slug = 'sedes-df-2026');
ALTER TABLE mock_exams ADD COLUMN contest_id INTEGER REFERENCES contests(id);
UPDATE mock_exams SET contest_id = (SELECT id FROM contests WHERE slug = 'sedes-df-2026');
ALTER TABLE study_plans ADD COLUMN contest_id INTEGER REFERENCES contests(id);
UPDATE study_plans SET contest_id = (SELECT id FROM contests WHERE slug = 'sedes-df-2026');
ALTER TABLE goals ADD COLUMN contest_id INTEGER REFERENCES contests(id);
UPDATE goals SET contest_id = (SELECT id FROM contests WHERE slug = 'sedes-df-2026');
ALTER TABLE study_sessions ADD COLUMN contest_id INTEGER REFERENCES contests(id);
UPDATE study_sessions SET contest_id = (SELECT id FROM contests WHERE slug = 'sedes-df-2026');
ALTER TABLE ai_messages ADD COLUMN contest_id INTEGER REFERENCES contests(id);
UPDATE ai_messages SET contest_id = (SELECT id FROM contests WHERE slug = 'sedes-df-2026');

CREATE INDEX IF NOT EXISTS idx_decks_contest ON decks(contest_id);
CREATE INDEX IF NOT EXISTS idx_mock_exams_contest ON mock_exams(contest_id);
CREATE INDEX IF NOT EXISTS idx_study_plans_contest ON study_plans(contest_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_contest ON study_sessions(contest_id);
CREATE INDEX IF NOT EXISTS idx_ai_messages_contest ON ai_messages(contest_id);

-- Concurso ativo do usuário.
ALTER TABLE settings ADD COLUMN active_contest_id INTEGER;
UPDATE settings SET active_contest_id = (SELECT id FROM contests WHERE slug = 'sedes-df-2026');

-- Chaves de seed passam a ser namespaced por concurso.
UPDATE questions
SET seed_key = 'sedes-df-2026:' || seed_key
WHERE seed_key IS NOT NULL AND seed_key NOT LIKE '%:%';
`

// v5 — Engine de Conhecimento: cada tópico vira um centro de conhecimento.
// knowledge_entries = CONTEÚDO do edital (blocos tipados por `kind`; imutável
// durante o estudo). topic_progress = PROGRESSO do usuário (entidade própria).
// flashcards.topic_id liga memorização ao conhecimento sem quebrar decks.
const MIGRATION_0005_KNOWLEDGE = /* sql */ `
CREATE TABLE IF NOT EXISTS knowledge_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  title TEXT,
  body TEXT,
  reference TEXT,
  url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_knowledge_topic_kind ON knowledge_entries(topic_id, kind);

CREATE TABLE IF NOT EXISTS topic_progress (
  topic_id INTEGER PRIMARY KEY REFERENCES topics(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'NAO_ESTUDADO',
  last_studied_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

ALTER TABLE flashcards ADD COLUMN topic_id INTEGER REFERENCES topics(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_flashcards_topic ON flashcards(topic_id);
`

const MIGRATIONS: Migration[] = [
  { version: 1, name: 'init', up: MIGRATION_0001_INIT },
  { version: 2, name: 'question_states', up: MIGRATION_0002_QUESTION_STATES },
  { version: 3, name: 'question_seed_key', up: MIGRATION_0003_SEED_KEY },
  { version: 4, name: 'contests', up: MIGRATION_0004_CONTESTS },
  { version: 5, name: 'knowledge_engine', up: MIGRATION_0005_KNOWLEDGE }
]

export function runMigrations(sqlite: Database.Database): void {
  const current = sqlite.pragma('user_version', { simple: true }) as number
  const pending = MIGRATIONS.filter((m) => m.version > current).sort((a, b) => a.version - b.version)
  if (pending.length === 0) return

  // FKs desligadas durante migrações (exigência do SQLite para rebuild seguro
  // de tabelas referenciadas). Reativadas em seguida, com verificação.
  sqlite.pragma('foreign_keys = OFF')
  try {
    for (const migration of pending) {
      const apply = sqlite.transaction(() => {
        sqlite.exec(migration.up)
        sqlite.pragma(`user_version = ${migration.version}`)
      })
      apply()
    }
    const violations = sqlite.pragma('foreign_key_check') as unknown[]
    if (Array.isArray(violations) && violations.length > 0) {
      console.error('[migrate] foreign_key_check encontrou violações:', violations.slice(0, 5))
    }
  } finally {
    sqlite.pragma('foreign_keys = ON')
  }
}
