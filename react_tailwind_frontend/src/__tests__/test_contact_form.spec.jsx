import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
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
    const contactSection = screen.getByTestId('section-contact');
    const submit = within(contactSection).getByTestId('contact-submit');
    // Submit with empty fields
    fireEvent.click(submit);

    expect(within(contactSection).getByText(/please enter your name\./i)).toBeInTheDocument();
    expect(within(contactSection).getByText(/enter a valid email\./i)).toBeInTheDocument();
    expect(within(contactSection).getByText(/message must be at least 10 characters\./i)).toBeInTheDocument();
  });

  test('submits when valid and shows temporary success, then resets', () => {
    render(<App />);

    const contactSection = screen.getByTestId('section-contact');
    const name = within(contactSection).getByLabelText(/name/i);
    const email = within(contactSection).getByLabelText(/email/i);
    const message = within(contactSection).getByLabelText(/message/i);
    const submit = within(contactSection).getByTestId('contact-submit');

    fireEvent.change(name, { target: { value: 'Jane Doe' } });
    fireEvent.change(email, { target: { value: 'jane@example.com' } });
    fireEvent.change(message, { target: { value: 'This is a longer valid message.' } });

    fireEvent.click(submit);

    // Success indicator appears
    expect(within(contactSection).getByText(/message sent!/i)).toBeInTheDocument();

    // After 2s it disappears and fields clear
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(within(contactSection).queryByText(/message sent!/i)).not.toBeInTheDocument();
    expect(name).toHaveValue('');
    expect(email).toHaveValue('');
    expect(message).toHaveValue('');
  });
});
