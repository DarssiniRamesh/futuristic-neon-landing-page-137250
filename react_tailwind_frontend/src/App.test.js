import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main sections and navbar', () => {
  render(<App />);
  // navbar brand
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
  // hero headline
  expect(screen.getByRole('heading', { name: /futuristic interfaces, bold performance\./i })).toBeInTheDocument();
  // sections headings
  expect(screen.getByRole('heading', { name: /features/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
});
