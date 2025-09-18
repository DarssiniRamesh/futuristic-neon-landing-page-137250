import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock react-scroll animateScroll to observe calls
const scrollTopMock = jest.fn();
jest.mock('react-scroll', () => {
  const Actual = jest.requireActual('react-scroll');
  return { 
    ...Actual, 
    animateScroll: { scrollToTop: scrollTopMock },
    Link: ({ to, children, className, ...rest }) => (
      <button data-to={to} className={className} {...rest}>{children}</button>
    )
  };
});

function dispatchScroll(y) {
  Object.defineProperty(window, 'scrollY', { value: y, writable: true });
  window.dispatchEvent(new Event('scroll'));
}

describe('Scroll To Top Button', () => {
  test('toggles visibility based on scroll position and triggers scrollToTop on click', () => {
    render(<App />);

    const btn = screen.getByRole('button', { name: /scroll to top/i });
    // Initially hidden (opacity-0 + translate-y-4 + pointer-events-none)
    expect(btn.className).toMatch(/opacity-0/);

    // Scroll down past threshold
    dispatchScroll(500);
    expect(btn.className).toMatch(/opacity-100/);

    // Click triggers animateScroll.scrollToTop
    fireEvent.click(btn);
    expect(scrollTopMock).toHaveBeenCalledWith({ duration: 600 });

    // Scroll back up hides it
    dispatchScroll(0);
    expect(btn.className).toMatch(/opacity-0/);
  });
});
