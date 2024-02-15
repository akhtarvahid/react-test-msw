import { fireEvent, render, screen } from '@testing-library/react';
import CounterApp from './CounterApp';
import { userEvent } from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Counter component', () => {
  test('renders Counter App name', () => {
    render(<CounterApp />);
    const heading = screen.getByText(/Counter App/i);
    expect(heading).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  test('increment counter value', () => {
    render(<CounterApp />);
    const countValue = screen.getByTestId('count');
    expect(countValue.textContent).toBe("0");
    
    const incrementBtn = screen.getByRole('button', { name: 'Increment'});
    act(() => {
      fireEvent.click(incrementBtn);
    })
    expect(countValue.textContent).toBe('1');
  });

  test('decrement counter value', () => {
    render(<CounterApp />);
    const countValue = screen.getByTestId('count');
    expect(countValue.textContent).toBe("0");
    
    const decrementBtn = screen.getByRole('button', { name: 'Decrement'});
    act(() => {
      fireEvent.click(decrementBtn);
    })
    expect(countValue.textContent).toBe('-1');
  });
})