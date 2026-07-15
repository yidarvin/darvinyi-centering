import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { PresenceTimer } from '@/components/chapters/the-ordinary-mind/PresenceTimer';

describe('PresenceTimer', () => {
  beforeEach(() => window.localStorage.clear());

  it('offers a clear completion and reset path to keyboard users', async () => {
    const user = userEvent.setup();
    render(<PresenceTimer />);

    await user.click(screen.getByRole('button', { name: 'begin' }));
    await user.click(screen.getByRole('button', { name: 'end here' }));
    expect(screen.getByText('the sitting is done')).toBeInTheDocument();

    const again = screen.getByRole('button', { name: 'again' });
    await waitFor(() => expect(again).toHaveFocus());
    await user.click(again);
    await waitFor(() => expect(screen.getByRole('button', { name: 'begin' })).toHaveFocus());
  });
});
