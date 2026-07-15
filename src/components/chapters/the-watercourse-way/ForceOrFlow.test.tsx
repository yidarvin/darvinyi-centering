import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ForceOrFlow } from './ForceOrFlow'

describe('ForceOrFlow', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('keeps the verdict and slider text synchronized when force changes', () => {
    render(<ForceOrFlow />)

    const slider = screen.getByRole('slider', { name: 'how are you meeting it?' })
    fireEvent.change(slider, { target: { value: '68' } })

    expect(slider).toHaveAttribute('aria-valuetext', expect.stringContaining('68 percent push'))
    expect(screen.getByRole('status')).toHaveTextContent('still pushing, a little less')
  })
})
