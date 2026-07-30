import { getAchievements } from '../../lib/achievements'
import type { AttemptRecord } from '../../types'

export default function AchievementsTab({ attempts }: { attempts: AttemptRecord[] }) {
  const achievements = getAchievements(attempts)
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-5">
        {unlockedCount} of {achievements.length} unlocked
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`card p-5 flex items-start gap-4 ${a.unlocked ? '' : 'opacity-50 grayscale'}`}
          >
            <span className="text-3xl leading-none shrink-0">{a.icon}</span>
            <div className="min-w-0">
              <h3 className="font-display font-bold">{a.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
              {!a.unlocked && a.progress && <p className="text-xs text-muted-foreground mt-2">{a.progress}</p>}
              {a.unlocked && <span className="tag bg-success-bg text-success mt-2">Unlocked</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
