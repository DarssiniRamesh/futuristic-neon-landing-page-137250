import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';

describe('Contact Form', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('shows validation errors for invalid inputs', () => {
    render(<App />);
    const submit = screen.getByRole('button', { name: /send message/i });
    // Submit with empty fields
    fireEvent.click(submit);

    expect(screen.getByText(/please enter your name\./i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email\./i)).toBeInTheDocument();
    expect(screen.getByText(/message must be at least 10 characters\./i)).toBeInTheDocument();
  });

  test('submits when valid and shows temporary success, then resets', () => {
    render(<App />);

    const name = screen.getByLabelText(/name/i);
    const email = screen.getByLabelText(/email/i);
    const message = screen.getByLabelText(/message/i);
    const submit = screen.getByRole('button', { name: /send message/i });

    fireEvent.change(name, { target: { value: 'Jane Doe' } });
    fireEvent.change(email, { target: { value: 'jane@example.com' } });
    fireEvent.change(message, { target: { value: 'This is a longer valid message.' } });

    fireEvent.click(submit);

    // Success indicator appears
    expect(screen.getByText(/message sent!/i)).toBeInTheDocument();

    // After 2s it disappears and fields clear
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByText(/message sent!/i)).not.toBeInTheDocument();
    expect(name).toHaveValue('');
    expect(email).toHaveValue('');
    expect(message).toHaveValue('');
  });
});
