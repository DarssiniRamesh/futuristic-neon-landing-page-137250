import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders main sections and navbar', () => {
  render(<App />);
  // navbar brand
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
  // hero headline
  expect(screen.getByRole('heading', { name: /futuristic interfaces, bold performance\./i })).toBeInTheDocument();
  // sections headings
  expect(screen.getByRole('heading', { name: /features/i })).toBeInTheDocument();

  // Scope contact heading within the contact section to avoid ambiguity
  const contactSection = screen.getByTestId('section-contact');
  expect(within(contactSection).getByRole('heading', { name: /contact/i })).toBeInTheDocument();
});
