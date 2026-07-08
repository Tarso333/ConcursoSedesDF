import { addDays, differenceInCalendarDays, format, parseISO } from 'date-fns'
import { and, asc, eq, sql } from 'drizzle-orm'
import type { Contest, StudyPlanView, StudyTaskItem, StudyTaskType } from '@shared/domain'
import { getDb } from '../db/connection'
import { disciplines, studyPlans, studyTasks } from '../db/schema'
import { getSettings } from '../repositories/settingsRepository'
import { rankDisciplines } from '../strategy/engine'
import { buildStrategyInput } from '../strategy/snapshot'

const nowExpr = sql`(datetime('now'))` as unknown as string

export function getStudyPlan(contest: Contest): StudyPlanView {
  const db = getDb()
  const settings = getSettings()
  const plan = db
    .select()
    .from(studyPlans)
    .where(and(eq(studyPlans.active, true), eq(studyPlans.contestId, contest.id)))
    .get()
  if (!plan) {
    return {
      planId: null,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      examDate: contest.examDate ?? format(new Date(), 'yyyy-MM-dd'),
      dailyMinutes: settings.dailyGoalMinutes,
      totalTasks: 0,
      doneTasks: 0,
      byDate: []
    }
  }

  const rows = db
    .select({
      id: studyTasks.id,
      disciplineId: studyTasks.disciplineId,
      disciplineName: disciplines.name,
      disciplineColor: disciplines.color,
      date: studyTasks.date,
      type: studyTasks.type,
      title: studyTasks.title,
      plannedMinutes: studyTasks.plannedMinutes,
      done: studyTasks.done
    })
    .from(studyTasks)
    .leftJoin(disciplines, eq(studyTasks.disciplineId, disciplines.id))
    .where(eq(studyTasks.planId, plan.id))
    .orderBy(asc(studyTasks.date), asc(studyTasks.id))
    .all()

  const byDateMap = new Map<string, StudyTaskItem[]>()
  for (const r of rows) {
    const list = byDateMap.get(r.date) ?? []
    list.push(r)
    byDateMap.set(r.date, list)
  }

  return {
    planId: plan.id,
    startDate: plan.startDate,
    examDate: plan.examDate,
    dailyMinutes: plan.dailyMinutes,
    totalTasks: rows.length,
    doneTasks: rows.filter((r) => r.done).length,
    byDate: [...byDateMap.entries()].map(([date, tasks]) => ({ date, tasks }))
  }
}

export function generateStudyPlan(contest: Contest, dailyMinutes: number): StudyPlanView {
  const db = getDb()
  if (!contest.examDate) {
    throw new Error('Defina a data da prova deste concurso (em Configurações) antes de gerar o plano.')
  }
  const today = new Date()
  const startStr = format(today, 'yyyy-MM-dd')

  db.update(studyPlans)
    .set({ active: false })
    .where(and(eq(studyPlans.active, true), eq(studyPlans.contestId, contest.id)))
    .run()
  const planRes = db
    .insert(studyPlans)
    .values({
      contestId: contest.id,
      name: 'Plano até a prova',
      startDate: startStr,
      examDate: contest.examDate,
      dailyMinutes,
      active: true
    })
    .run()
  const planId = Number(planRes.lastInsertRowid)

  // Fila ponderada pelo RANKING do Motor de Estratégia (M16): as disciplinas
  // mais prioritárias (peso × incidência × desempenho × esquecimento…)
  // aparecem mais vezes no cronograma — fonte única de verdade.
  const ranked = rankDisciplines(buildStrategyInput(contest, dailyMinutes))
  if (ranked.length === 0) throw new Error('Este concurso ainda não possui disciplinas cadastradas.')

  const queue: { id: number; name: string }[] = []
  for (const r of ranked) {
    const reps = Math.max(1, Math.round(r.score / 20))
    for (let i = 0; i < reps; i++) queue.push({ id: r.discipline.id, name: r.discipline.name })
  }

  const totalDays = Math.max(1, differenceInCalendarDays(parseISO(contest.examDate), today))
  let qi = 0
  const teoriaMin = Math.round(dailyMinutes * 0.4)
  const revisaoMin = Math.round(dailyMinutes * 0.25)
  const questoesMin = Math.max(10, dailyMinutes - teoriaMin - revisaoMin)

  const insertTask = (
    disciplineId: number | null,
    date: string,
    type: StudyTaskType,
    title: string,
    plannedMinutes: number
  ): void => {
    db.insert(studyTasks).values({ planId, disciplineId, date, type, title, plannedMinutes }).run()
  }

  for (let offset = 0; offset <= totalDays; offset++) {
    const day = addDays(today, offset)
    const date = format(day, 'yyyy-MM-dd')
    if (offset > 0 && day.getDay() === 0) {
      insertTask(null, date, 'SIMULADO', 'Simulado da semana', dailyMinutes)
      continue
    }
    const d = queue[qi % queue.length]
    qi += 1
    insertTask(d.id, date, 'TEORIA', `Teoria — ${d.name}`, teoriaMin)
    insertTask(d.id, date, 'QUESTOES', `Questões — ${d.name}`, questoesMin)
    insertTask(null, date, 'REVISAO', 'Revisão espaçada (flashcards)', revisaoMin)
  }

  return getStudyPlan(contest)
}

export function toggleStudyTask(id: number): void {
  const db = getDb()
  const t = db.select({ done: studyTasks.done }).from(studyTasks).where(eq(studyTasks.id, id)).get()
  if (!t) return
  const next = !t.done
  db.update(studyTasks)
    .set({ done: next, doneAt: next ? nowExpr : null })
    .where(eq(studyTasks.id, id))
    .run()
}
