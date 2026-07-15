import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NatureDosePlanner } from './NatureDosePlanner'

describe('NatureDosePlanner', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('counts outdoor time toward the evidence-labeled weekly floor and can clear it', async () => {
    const user = userEvent.setup()
    render(<NatureDosePlanner />)

    await user.click(screen.getByRole('button', { name: /One longer immersion/ }))
    expect(screen.getByText('120 min outdoors / wk')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'clear' }))
    expect(screen.getByText('0 min outdoors / wk')).toBeVisible()
  })
})
