import { render, screen, waitFor } from '@testing-library/react';
import Listing from '../Listing';

describe('Listing component tests', () => {
    const fakeUserResponse = ["Leanne Graham", "Ervin Howell", "Clementine Bauch"];

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

    test('Listing: Check response Test 3', async () => {
        render(<Listing />);
        const heading = screen.getByRole('heading', { name: 'Fetching latest posts...'});
        // 🕗 Wait for the posts request to be finished.
        await waitFor(() => expect(heading).not.toBeInTheDocument());
        
        // expect(localStorage.getItem('names')).toEqual(fakeUserResponse);
    });
})
