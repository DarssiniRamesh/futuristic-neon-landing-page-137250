import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('react-scroll', () => {
  // Mock Link that strips non-DOM props to avoid React warnings
  const Link = ({ to, children, className, smooth, duration, offset, ...rest }) => (
    <button data-to={to} className={className} {...rest}>{children}</button>
  );
  return { Link, animateScroll: { scrollToTop: jest.fn() } };
});

describe('Hero', () => {
  test('renders headline and CTA links point to sections', () => {
    render(<App />);
    // Headline
    expect(
      screen.getByRole('heading', { name: /futuristic interfaces, bold performance\./i })
    ).toBeInTheDocument();

    // CTA buttons act as scroll links
    const explore = screen.getByRole('button', { name: /explore features/i });
    const learn = screen.getByRole('button', { name: /learn more/i });
    expect(explore).toHaveAttribute('data-to', 'features');
    expect(learn).toHaveAttribute('data-to', 'about');
  });
});
