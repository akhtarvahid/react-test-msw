import { render, screen, waitFor } from '@testing-library/react';
import Listing from '../Listing';

describe('Listing component tests', () => {
    test('Listing: Test 1', () => {
        render(<Listing />);
        const header = screen.getByRole('heading');
        expect(header).toBeInTheDocument();
    });
    test('Listing: Test 2', async () => {
        render(<Listing />);
        const listItem = await screen.findAllByRole('listitem');
        expect(listItem).toHaveLength(10);
        
    });
})
