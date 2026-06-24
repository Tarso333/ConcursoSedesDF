import { addDays, differenceInCalendarDays, format, parseISO } from 'date-fns'
import { asc, eq, sql } from 'drizzle-orm'
import type { StudyPlanView, StudyTaskItem, StudyTaskType } from '@shared/domain'
import { getDb } from '../db/connection'
import { disciplines, studyPlans, studyTasks } from '../db/schema'
import { getSettings } from '../repositories/settingsRepository'

const nowExpr = sql`(datetime('now'))` as unknown as string

export function getStudyPlan(): StudyPlanView {
  const db = getDb()
  const settings = getSettings()
  const plan = db.select().from(studyPlans).where(eq(studyPlans.active, true)).get()
  if (!plan) {
    return {
      planId: null,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      examDate: settings.examDate,
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

export function generateStudyPlan(dailyMinutes: number): StudyPlanView {
  const db = getDb()
  const settings = getSettings()
  const today = new Date()
  const startStr = format(today, 'yyyy-MM-dd')

  db.update(studyPlans).set({ active: false }).where(eq(studyPlans.active, true)).run()
  const planRes = db
    .insert(studyPlans)
    .values({
      name: 'Plano até a prova',
      startDate: startStr,
      examDate: settings.examDate,
      dailyMinutes,
      active: true
    })
    .run()
  const planId = Number(planRes.lastInsertRowid)

  const discs = db
    .select({
      id: disciplines.id,
      name: disciplines.name,
      weight: disciplines.weight,
      est: disciplines.examQuestionEstimate
    })
    .from(disciplines)
    .orderBy(asc(disciplines.orderIndex))
    .all()

  // Fila ponderada: disciplinas de maior peso × incidência aparecem mais vezes.
  const queue: { id: number; name: string }[] = []
  for (const d of discs) {
    const reps = Math.max(1, Math.round((d.weight * d.est) / 4))
    for (let i = 0; i < reps; i++) queue.push({ id: d.id, name: d.name })
  }

  const totalDays = Math.max(1, differenceInCalendarDays(parseISO(settings.examDate), today))
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

  return getStudyPlan()
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
