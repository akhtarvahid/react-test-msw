import { render, screen } from '@testing-library/react';
import HeroTitle from './heroTitle';

describe('Hero component tests', () => {
  test('sub components: Test1', () => {
    render(<HeroTitle title="Todo App" />);
    const linkElement = screen.getByRole('heading');
    //log('LOGGER: ', linkElement.textContent);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('Todo App');
  });
  test('sub components: Test2', () => {
    render(<HeroTitle />);
    const linkElement = screen.getByText('Vahid');
    expect(linkElement).toBeInTheDocument();
  });
  test('sub components: Test3', () => {
    const view = render(<HeroTitle />);
    expect(view).toMatchSnapshot();
  });
})
