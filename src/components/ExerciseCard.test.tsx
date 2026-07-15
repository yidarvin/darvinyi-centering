import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ExerciseCard } from '@/components/ExerciseCard';

describe('ExerciseCard', () => {
  beforeEach(() => window.localStorage.clear());

  it('persists a reader response under its chapter-scoped key', async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <ExerciseCard chapterSlug="calm-abiding" id="notice" title="Notice" input="text" placeholder="Write here" />,
    );

    await user.type(screen.getByRole('textbox', { name: 'Response for Notice' }), 'A clear response');
    expect(window.localStorage.getItem('centering:ex:calm-abiding:notice')).toBe('"A clear response"');

    unmount();
    render(<ExerciseCard chapterSlug="calm-abiding" id="notice" title="Notice" input="text" placeholder="Write here" />);
    expect(screen.getByRole('textbox', { name: 'Response for Notice' })).toHaveValue('A clear response');
  });
});
