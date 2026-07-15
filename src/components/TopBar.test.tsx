import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { TopBar } from '@/components/TopBar';

describe('TopBar', () => {
  it('shows reading controls only on chapter routes', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/sources']}>
        <TopBar />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('link', { name: 'contents' })).not.toBeInTheDocument();

    unmount();
    render(
      <MemoryRouter initialEntries={['/calm-abiding']}>
        <TopBar />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'contents' })).toBeInTheDocument();
  });
});
