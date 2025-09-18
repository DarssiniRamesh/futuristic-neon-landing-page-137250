import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock react-scroll to control behavior in tests
jest.mock('react-scroll', () => {
  const Actual = jest.requireActual('react-scroll');
  // render ScrollLink as a simple button with data-to for assertions
  // strip non-standard props to prevent unknown DOM attribute warnings
  const Link = ({ to, children, className, smooth, duration, offset, ...rest }) => (
    <button data-to={to} className={className} {...rest}>{children}</button>
  );
  return {
    ...Actual,
    Link,
    LinkElement: Link,
    LinkS: Link,
    Element: ({ name, children, ...rest }) => <section data-name={name} {...rest}>{children}</section>,
    animateScroll: { scrollToTop: jest.fn() }
  };
});

describe('Navbar', () => {
  test('renders nav with expected links', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav).toBeInTheDocument();
    const home = screen.getByRole('button', { name: /home/i });
    const about = screen.getByRole('button', { name: /about/i });
    const features = screen.getByRole('button', { name: /features/i });
    const contact = screen.getByRole('button', { name: /contact/i });
    expect(home).toHaveAttribute('data-to', 'home');
    expect(about).toHaveAttribute('data-to', 'about');
    expect(features).toHaveAttribute('data-to', 'features');
    expect(contact).toHaveAttribute('data-to', 'contact');
  });
});
