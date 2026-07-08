import type { Contest, DailyPlan } from '@shared/domain'
import { getSettings } from '../repositories/settingsRepository'
import { generateDailyPlan } from '../strategy/engine'
import { buildStrategyInput } from '../strategy/snapshot'

/** Plano do dia: snapshot do estado real + motor determinístico puro. */
export function getDailyPlan(contest: Contest, minutes?: number): DailyPlan {
  const available = minutes && minutes > 0 ? minutes : getSettings().dailyGoalMinutes
  const input = buildStrategyInput(contest, available)
  return generateDailyPlan(input)
}
