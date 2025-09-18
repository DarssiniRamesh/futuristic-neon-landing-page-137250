import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';

// Mock react-scroll animateScroll to observe calls without referencing out-of-scope variables
jest.mock('react-scroll', () => {
  const Actual = jest.requireActual('react-scroll');
  const scrollTopMockLocal = jest.fn();
  return {
    ...Actual,
    __mocks__: { scrollTopMock: scrollTopMockLocal },
    animateScroll: { scrollToTop: scrollTopMockLocal },
    // Strip non-standard props to avoid DOM attribute warnings
    Link: ({ to, children, className, smooth, duration, offset, ...rest }) => (
      <button data-to={to} className={className} {...rest}>{children}</button>
    ),
  };
});

function dispatchScroll(y) {
  // set scroll position and raise a scroll event to trigger listeners
  Object.defineProperty(window, 'scrollY', { value: y, writable: true });
  fireEvent.scroll(window);
}

describe('Scroll To Top Button', () => {
  test('toggles visibility based on scroll position and triggers scrollToTop on click', () => {
    // obtain the mock from the mocked module
    const { __mocks__ } = require('react-scroll');
    const scrollTopMock = __mocks__.scrollTopMock;

    render(<App />);

    const btn = screen.getByRole('button', { name: /scroll to top/i });
    // Initially hidden (opacity-0 + translate-y-4 + pointer-events-none)
    expect(btn.className).toMatch(/opacity-0/);

    // Scroll down past threshold
    act(() => {
      dispatchScroll(500);
    });
    expect(btn.className).toMatch(/opacity-100/);

    // Click triggers animateScroll.scrollToTop
    act(() => {
      fireEvent.click(btn);
    });
    expect(scrollTopMock).toHaveBeenCalledWith({ duration: 600 });

    // Scroll back up hides it
    act(() => {
      dispatchScroll(0);
    });
    expect(btn.className).toMatch(/opacity-0/);
  });
});
