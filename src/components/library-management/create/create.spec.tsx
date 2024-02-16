import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Create from './create';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { server } from '../../../mocks/server';

beforeAll(() => {
    // Start the interception.
    server.listen()
})

afterEach(() => {
    // Remove any handlers you may have added
    // in individual tests (runtime handlers).
    server.resetHandlers()
})

afterAll(() => {
    // Disable request interception and clean up.
    server.close();
})
describe('Create Component', () => {
    
    it('should have 3 input field', () => {
        render(<Create />);
        const inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(3);
        expect(screen.getByRole('textbox', { name: 'Title' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Author' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Price' })).toBeInTheDocument();
    });
    it('library title field', () => {
        render(<Create />);
        const title = screen.getByRole('textbox', { name: 'Title' });
        expect(title).toHaveAttribute('value', '');


        // state update function should be inside act
        act(() => {
            fireEvent.change(title, { target: { value: 'Java' } })
        })

        expect(title).toHaveAttribute('value', 'Java')
    });
    it('library author field', () => {
        render(<Create />);
        const author = screen.getByRole('textbox', { name: 'Author' });
        expect(author).toHaveAttribute('value', '');


        // state update function should be inside act
        act(() => {
            fireEvent.change(author, { target: { value: 'James Gosling' } })
        })

        expect(author).toHaveAttribute('value', 'James Gosling')
    });
    it('library price field', () => {
        render(<Create />);
        const price = screen.getByRole('textbox', { name: 'Price' });
        expect(price).toHaveAttribute('value', '');


        // state update function should be inside act
        act(() => {
            fireEvent.change(price, { target: { value: '$1' } })
        })

        expect(price).toHaveAttribute('value', '$1')
    });

    it('should trigger submit button if fields are filled', async () => {
        
        render(<Create />);
        const submitBtn = screen.getByRole('button', { name: 'Submit' });
        expect(submitBtn).toBeInTheDocument();
        const title = screen.getByRole('textbox', { name: 'Title' });
        
        act(() => {
            userEvent.click(submitBtn)
        })

        expect(title).toHaveValue('')
        await waitFor(() => expect(screen.getByText('Fields are empty')).toBeInTheDocument());
    });
    it('submit new book in library api success request', async () => {
        render(<Create />);
        let title = screen.getByRole('textbox', { name: 'Title' })
        let author = screen.getByRole('textbox', { name: 'Author' })
        let price = screen.getByRole('textbox', { name: 'Price' })
        


        await act(async () => {
            await userEvent.type(title,  'NodeJs')
            await userEvent.type(author,  'Xyz')
            await userEvent.type(price,  '$1.2')
        })
        act(() => {
            userEvent.click(screen.getByRole('button', { name: 'Submit' }));
        })

        // Wait for the async operation to complete
        waitFor(() => {
            // Assert that the component displays the mocked success message
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
        waitFor(() => expect(screen.getByText('Successfully created')).toBeInTheDocument());
    });
})