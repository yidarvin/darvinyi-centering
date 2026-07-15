import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelfCheck } from './SelfCheck'

describe('SelfCheck', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('announces immediate support for a red flag without persisting the sensitive checklist state', async () => {
    const user = userEvent.setup()
    render(<SelfCheck />)

    await user.click(screen.getByRole('button', { name: /Thoughts of suicide or self-harm/ }))

    const response = screen.getByRole('status')
    expect(response).toHaveTextContent('Please reach out now.')
    expect(response).toHaveTextContent('Call or text 988')
    expect(window.localStorage.getItem('centering:widget:calm-is-not-numbness:checks')).toBeNull()
  })
})
