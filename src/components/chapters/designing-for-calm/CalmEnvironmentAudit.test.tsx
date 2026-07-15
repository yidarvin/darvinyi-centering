import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CalmEnvironmentAudit } from './CalmEnvironmentAudit'

describe('CalmEnvironmentAudit', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('keeps one chosen default while allowing the reader to revise it', async () => {
    const user = userEvent.setup()
    render(<CalmEnvironmentAudit />)

    await user.click(screen.getByRole('button', { name: /Most of my apps can buzz/ }))
    await user.click(screen.getByRole('button', { name: /My phone is always within arm’s reach/ }))
    expect(screen.getByText('2 of 12 flagged')).toBeVisible()

    const notifications = screen.getByRole('button', { name: /notifications off/ })
    const phone = screen.getByRole('button', { name: /phone out of reach/ })

    await user.click(notifications)
    expect(notifications).toHaveAttribute('aria-pressed', 'true')

    await user.click(phone)
    expect(notifications).toHaveAttribute('aria-pressed', 'false')
    expect(phone).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByText(/Park it in another room/)).toHaveLength(2)
  })
})
