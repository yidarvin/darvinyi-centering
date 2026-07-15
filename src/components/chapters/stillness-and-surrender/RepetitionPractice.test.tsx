import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RepetitionPractice } from './RepetitionPractice'

describe('RepetitionPractice', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('announces a gentle return after a reader records a drift', async () => {
    const user = userEvent.setup()
    render(<RepetitionPractice />)

    await user.click(screen.getByRole('button', { name: 'I drifted, return' }))

    expect(screen.getByRole('status')).toHaveTextContent('Returned to the anchor word.')
    expect(screen.getByText(/Noticing you wandered is not a failure/)).toBeVisible()
  })
})
