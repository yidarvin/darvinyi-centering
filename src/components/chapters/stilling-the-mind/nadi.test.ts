import { describe, expect, it } from 'vitest'
import { buildRound, pattern, roundPhases, sampleAt } from './nadi'

describe('nāḍī śodhana timing', () => {
  it('keeps the extended-exhale pattern retention-free and alternates nostrils', () => {
    const extended = pattern('extended')
    const phases = roundPhases(extended)

    expect(phases).toEqual([
      { kind: 'inhale', nostril: 'left', sec: 4 },
      { kind: 'exhale', nostril: 'right', sec: 6 },
      { kind: 'inhale', nostril: 'right', sec: 4 },
      { kind: 'exhale', nostril: 'left', sec: 6 },
    ])

    const { segments, cycle } = buildRound(extended)
    expect(cycle).toBe(20)
    expect(sampleAt(segments, cycle, 4).nostril).toBe('right')
    expect(sampleAt(segments, cycle, 10).kind).toBe('inhale')
  })
})
