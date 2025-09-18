import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from '../App';

describe('Features Section', () => {
  test('renders four feature cards with titles and learn more', () => {
    render(<App />);

    // Section heading
    expect(screen.getByRole('heading', { name: /features/i })).toBeInTheDocument();

    const titles = [
      /animated hero/i,
      /sticky navbar/i,
      /interactive cards/i,
      /contact form/i
    ];

    titles.forEach((t) => {
      const cardTitle = screen.getByRole('heading', { name: t, level: 3 });
      expect(cardTitle).toBeInTheDocument();
      // Learn more button exists inside same card container (closest parent)
      const card = cardTitle.closest('div');
      const learnMore = within(card).getByRole('button', { name: /learn more/i });
      expect(learnMore).toBeInTheDocument();
    });
  });
});
