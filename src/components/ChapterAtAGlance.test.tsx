import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ChapterAtAGlance } from '@/components/ChapterAtAGlance';
import { CalmQuadrant } from '@/components/chapters/what-calm-is/CalmQuadrant';

describe('ChapterAtAGlance', () => {
  beforeEach(() => window.localStorage.clear());

  it('keeps the compact chapter recap closed until a reader asks for it', async () => {
    const user = userEvent.setup();
    const { container } = render(<ChapterAtAGlance chapterSlug="what-calm-is" />);
    const details = container.querySelector('details');

    expect(details).not.toHaveAttribute('open');
    await user.click(container.querySelector('summary')!);
    expect(details).toHaveAttribute('open');
    expect(screen.getByText('Arousal tells you how activated the body is. Engagement tells you whether you are still in contact with the moment.')).toBeInTheDocument();
    expect(screen.getByText('calm quadrant')).toBeInTheDocument();
  });
});

describe('CalmQuadrant', () => {
  beforeEach(() => window.localStorage.clear());

  it('maps a state with arrow keys and announces the resulting quadrant', async () => {
    const user = userEvent.setup();
    render(<CalmQuadrant />);
    const map = screen.getByRole('application', { name: /calm map/i });

    map.focus();
    await user.keyboard('{ArrowRight}{ArrowDown}');

    expect(screen.getByRole('status')).toHaveTextContent('equanimity. engagement middling, arousal middling.');
  });
});
