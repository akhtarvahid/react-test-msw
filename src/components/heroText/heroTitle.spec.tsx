import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroTitle from './heroTitle';

test('sub components', () => {
    render(<HeroTitle title="Hero" />);
    const linkElement = screen.getByText('Hero');
    expect(linkElement).toBeInTheDocument();
  });

    