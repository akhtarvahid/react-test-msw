import { render, screen } from '@testing-library/react';
import SearchRoot from '../Search';

describe('SearchRoot', () => {
  it('renders SearchRoot component', async () => {
    render(<SearchRoot />);

    expect(screen.queryByText(/Signed in as/)).toBeNull();

    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });
});