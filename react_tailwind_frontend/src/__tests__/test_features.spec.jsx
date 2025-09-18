import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from '../App';

describe('Features Section', () => {
  test('renders four feature cards with titles and learn more', () => {
    render(<App />);

    // Scope within the Features section to avoid ambiguity
    const featuresSection = screen.getByTestId('section-features');
    expect(featuresSection).toBeInTheDocument();

    // Section heading inside the features section
    expect(within(featuresSection).getByRole('heading', { name: /features/i })).toBeInTheDocument();

    const titles = [
      'Animated Hero',
      'Sticky Navbar',
      'Interactive Cards',
      'Contact Form'
    ];

    titles.forEach((title) => {
      // Each card has a specific data-testid
      const cardTestId = `feature-card-${title.toLowerCase().replace(/\\s+/g, '-')}`;
      const card = within(featuresSection).getByTestId(cardTestId);
      // Title inside the card
      const cardTitle = within(card).getByRole('heading', { name: new RegExp(title, 'i'), level: 3 });
      expect(cardTitle).toBeInTheDocument();
      // Learn more button inside the same card
      const learnMore = within(card).getByRole('button', { name: /learn more/i });
      expect(learnMore).toBeInTheDocument();
    });
  });
});
