import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PartsMapper } from './PartsMapper'

describe('PartsMapper', () => {
  it('funnels keyboard users through unblending before parts become interactive', async () => {
    const user = userEvent.setup()
    render(<PartsMapper />)

    const sentinel = screen.getByRole('button', { name: 'the sentinel' })
    expect(sentinel).toHaveAttribute('tabindex', '-1')
    expect(sentinel).toHaveAttribute('aria-disabled', 'true')

    await user.click(screen.getByRole('button', { name: /step back · unblend/i }))

    expect(sentinel).toHaveAttribute('tabindex', '0')
    expect(sentinel).toHaveAttribute('aria-disabled', 'false')
    expect(screen.getByText('Self · you are at the center')).toBeVisible()
  })
})
