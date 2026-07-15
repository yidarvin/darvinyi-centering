import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThoughtDistancer } from './ThoughtDistancer'

describe('ThoughtDistancer', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('keeps the pronoun I capitalized in an ACT defusion frame', async () => {
    const user = userEvent.setup()
    render(<ThoughtDistancer />)

    await user.click(screen.getByRole('button', { name: 'I always mess things up like this.' }))
    await user.click(screen.getByRole('button', { name: '"I\'m having the thought that…"' }))

    expect(screen.getByText('"I\'m having the thought that I always mess things up like this."')).toBeVisible()
  })
})
