import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Landing } from '@/pages/Landing';

describe('Landing', () => {
  it('provides a landmarked, accessible entry to the book', async () => {
    const { container, getByRole } = render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>,
    );

    expect(getByRole('main')).toBeInTheDocument();
    expect(getByRole('heading', { level: 1, name: 'centering' })).toBeInTheDocument();
    expect((await axe(container)).violations).toEqual([]);
  });
});
