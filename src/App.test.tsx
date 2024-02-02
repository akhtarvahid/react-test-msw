import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/hero title/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('sub components', () => {
    render(<App />);
    const linkElement = screen.getByTestId('app');
    expect(linkElement).toBeInTheDocument();
  });
})