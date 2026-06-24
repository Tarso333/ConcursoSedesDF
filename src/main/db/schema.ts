import { sql } from 'drizzle-orm'
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Espelho tipado do DDL em migrate.ts (fonte física da verdade).
// Mantenha os nomes de coluna idênticos aos da migration.

const createdAt = () => text('created_at').notNull().default(sql`(datetime('now'))`)

export const disciplines = sqliteTable('disciplines', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  block: text('block', { enum: ['GERAL', 'ESPECIFICO'] }).notNull(),
  weight: integer('weight').notNull().default(1),
  examQuestionEstimate: integer('exam_question_estimate').notNull().default(0),
  color: text('color').notNull().default('#6366f1'),
  orderIndex: integer('order_index').notNull().default(0),
  createdAt: createdAt()
})

export const topics = sqliteTable('topics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  disciplineId: integer('discipline_id').notNull(),
  parentId: integer('parent_id'),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  orderIndex: integer('order_index').notNull().default(0),
  createdAt: createdAt()
})

export const questions = sqliteTable('questions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  disciplineId: integer('discipline_id').notNull(),
  topicId: integer('topic_id'),
  type: text('type', { enum: ['ME', 'CE'] }).notNull().default('ME'),
  statement: text('statement').notNull(),
  difficulty: text('difficulty', { enum: ['FACIL', 'MEDIO', 'DIFICIL'] }).notNull().default('MEDIO'),
  explanation: text('explanation'),
  source: text('source'),
  year: integer('year'),
  board: text('board').notNull().default('Quadrix'),
  createdAt: createdAt()
})

export const questionOptions = sqliteTable('question_options', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  questionId: integer('question_id').notNull(),
  letter: text('letter').notNull(),
  text: text('text').notNull(),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull().default(false),
  orderIndex: integer('order_index').notNull().default(0)
})

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey(),
  userName: text('user_name').notNull().default('Concurseiro(a)'),
  theme: text('theme', { enum: ['light', 'dark'] }).notNull().default('dark'),
  examDate: text('exam_date').notNull().default('2026-09-06'),
  dailyGoalMinutes: integer('daily_goal_minutes').notNull().default(180),
  dailyGoalQuestions: integer('daily_goal_questions').notNull().default(30),
  aiProvider: text('ai_provider'),
  aiModel: text('ai_model'),
  aiApiKey: text('ai_api_key'),
  createdAt: createdAt(),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
})

export const answers = sqliteTable('answers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  questionId: integer('question_id').notNull(),
  selectedOptionId: integer('selected_option_id'),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull().default(false),
  timeMs: integer('time_ms').notNull().default(0),
  source: text('source').notNull().default('BANCO'),
  mockExamId: integer('mock_exam_id'),
  createdAt: createdAt()
})

export const errorLogs = sqliteTable('error_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  questionId: integer('question_id').notNull(),
  answerId: integer('answer_id'),
  errorType: text('error_type'),
  status: text('status', { enum: ['ABERTO', 'COMPREENDIDO'] }).notNull().default('ABERTO'),
  note: text('note'),
  createdAt: createdAt(),
  resolvedAt: text('resolved_at')
})

export const decks = sqliteTable('decks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  disciplineId: integer('discipline_id'),
  description: text('description'),
  createdAt: createdAt()
})

export const flashcards = sqliteTable('flashcards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  deckId: integer('deck_id').notNull(),
  front: text('front').notNull(),
  back: text('back').notNull(),
  sourceQuestionId: integer('source_question_id'),
  createdAt: createdAt()
})

export const srsCards = sqliteTable('srs_cards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  flashcardId: integer('flashcard_id').notNull().unique(),
  due: text('due').notNull(),
  stability: real('stability').notNull().default(0),
  difficulty: real('difficulty').notNull().default(0),
  elapsedDays: integer('elapsed_days').notNull().default(0),
  scheduledDays: integer('scheduled_days').notNull().default(0),
  reps: integer('reps').notNull().default(0),
  lapses: integer('lapses').notNull().default(0),
  state: integer('state').notNull().default(0),
  lastReview: text('last_review')
})

export const srsReviews = sqliteTable('srs_reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  srsCardId: integer('srs_card_id').notNull(),
  rating: integer('rating').notNull(),
  state: integer('state').notNull(),
  due: text('due').notNull(),
  stability: real('stability').notNull(),
  difficulty: real('difficulty').notNull(),
  elapsedDays: integer('elapsed_days').notNull(),
  lastElapsedDays: integer('last_elapsed_days').notNull(),
  scheduledDays: integer('scheduled_days').notNull(),
  review: text('review').notNull()
})

export const mockExams = sqliteTable('mock_exams', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  mode: text('mode', { enum: ['OFICIAL', 'DISCIPLINA', 'PERSONALIZADO', 'DIAGNOSTICO'] })
    .notNull()
    .default('PERSONALIZADO'),
  status: text('status', { enum: ['EM_ANDAMENTO', 'CONCLUIDO'] }).notNull().default('EM_ANDAMENTO'),
  totalQuestions: integer('total_questions').notNull().default(0),
  timeLimitSec: integer('time_limit_sec'),
  startedAt: text('started_at'),
  finishedAt: text('finished_at'),
  score: real('score'),
  createdAt: createdAt()
})

export const mockExamItems = sqliteTable('mock_exam_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  mockExamId: integer('mock_exam_id').notNull(),
  questionId: integer('question_id').notNull(),
  orderIndex: integer('order_index').notNull().default(0),
  selectedOptionId: integer('selected_option_id'),
  isCorrect: integer('is_correct', { mode: 'boolean' }),
  timeMs: integer('time_ms')
})

export const studyPlans = sqliteTable('study_plans', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  startDate: text('start_date').notNull(),
  examDate: text('exam_date').notNull(),
  dailyMinutes: integer('daily_minutes').notNull().default(180),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  createdAt: createdAt()
})

export const studyTasks = sqliteTable('study_tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  planId: integer('plan_id').notNull(),
  disciplineId: integer('discipline_id'),
  date: text('date').notNull(),
  type: text('type', { enum: ['TEORIA', 'QUESTOES', 'REVISAO', 'SIMULADO'] }).notNull().default('TEORIA'),
  title: text('title').notNull(),
  plannedMinutes: integer('planned_minutes').notNull().default(60),
  done: integer('done', { mode: 'boolean' }).notNull().default(false),
  doneAt: text('done_at'),
  createdAt: createdAt()
})

export const goals = sqliteTable('goals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  period: text('period', { enum: ['DIARIA', 'SEMANAL', 'MENSAL'] }).notNull(),
  metric: text('metric', { enum: ['QUESTOES', 'MINUTOS', 'ACERTOS'] }).notNull(),
  target: integer('target').notNull(),
  periodStart: text('period_start').notNull(),
  periodEnd: text('period_end').notNull(),
  progress: integer('progress').notNull().default(0),
  createdAt: createdAt()
})

export const studySessions = sqliteTable('study_sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  disciplineId: integer('discipline_id'),
  startedAt: text('started_at').notNull(),
  endedAt: text('ended_at'),
  durationSec: integer('duration_sec').notNull().default(0),
  questionsCount: integer('questions_count').notNull().default(0),
  source: text('source'),
  createdAt: createdAt()
})

export const gamification = sqliteTable('gamification', {
  id: integer('id').primaryKey(),
  xp: integer('xp').notNull().default(0),
  level: integer('level').notNull().default(1),
  streakDays: integer('streak_days').notNull().default(0),
  longestStreak: integer('longest_streak').notNull().default(0),
  lastActiveDate: text('last_active_date'),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
})

export const achievements = sqliteTable('achievements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  icon: text('icon'),
  unlockedAt: text('unlocked_at')
})

export const questionStates = sqliteTable('question_states', {
  questionId: integer('question_id').primaryKey(),
  favorite: integer('favorite', { mode: 'boolean' }).notNull().default(false),
  note: text('note'),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
})

export const aiMessages = sqliteTable('ai_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  role: text('role', { enum: ['user', 'assistant'] }).notNull(),
  content: text('content').notNull(),
  contextType: text('context_type'),
  createdAt: createdAt()
})
