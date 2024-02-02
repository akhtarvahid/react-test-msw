import { render, screen } from '@testing-library/react';
import HeroTitle from './heroTitle';

describe('Hero component tests', () => {
    test('sub components: Test1', () => {
        render(<HeroTitle title="Hero" />);
        const linkElement = screen.getByText('Hero');
        expect(linkElement).toBeInTheDocument();
      });     
})
    