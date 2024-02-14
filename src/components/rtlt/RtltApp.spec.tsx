import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RtltApp from './RtltApp';
import axios from 'axios';

import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
jest.mock('axios');
describe('RtltApp component', () => {
    it('fetches stories from an API and displays them', async () => {
        const stories = [
            { objectID: '1', title: 'Hello' },
            { objectID: '2', title: 'React' },
        ];
        (axios.get as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({ data: { hits: stories } })
        );
        render(<RtltApp />);
        act(() => {
            userEvent.click(screen.getByRole('button'));

        })
        const items = await screen.findAllByRole('listitem');
        expect(items).toHaveLength(2);
    });
    it('fetches stories from an API and fails', async () => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
            Promise.reject(new Error())
        );

        render(<RtltApp />);

        act(() => {
            userEvent.click(screen.getByRole('button'));

        })
        const message = await screen.findByText(/Something went wrong/);

        expect(message).toBeInTheDocument();
    });
})