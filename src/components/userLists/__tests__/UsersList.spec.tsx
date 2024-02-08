import { render, screen } from '@testing-library/react';
import UsersList from '../UsersList';
import { worker } from '../../../browser-integration/mock/browser';



beforeAll(() => worker.start());
afterAll(() => worker.stop());
afterEach(() => worker.resetHandlers());

describe('UsersList component tests', () => {
    
    test('UsersList: Test 1', () => {
        render(<UsersList />);
        const header = screen.getByRole('heading');
        expect(header).toBeInTheDocument();
    });
    test('UsersList: Test 2', async () => {
        render(<UsersList />);
        const listItem = await screen.findAllByRole('listitem');
        expect(listItem).toHaveLength(10);
    });

    test('UsersList: error Test 3', async () => {
        
        render(<UsersList />);

        // worker.use(
        //     http.get('https://jsonplaceholder.typicode.com/users', () => {
        //         return new HttpResponse('Something happened', { status: 401 })
        //     })
        // )

        //expect(await screen.findAllByRole('listitem')).not.toBeInTheDocument()
        // expect(await screen.findByText('No users found')).toBeInTheDocument()

        // const error = screen.queryByText('Something happened');
        // expect(error).not.toBeInTheDocument();
    });

    // test('UsersList: Check response Test 3', async () => {
    //     render(<UsersList />);
    //     const heading = screen.getByRole('heading', { name: 'Fetching latest posts...'});
    //     // 🕗 Wait for the posts request to be finished.
    //     await waitFor(() => expect(heading).not.toBeInTheDocument());

        
    //     const getfromLocalStorage = localStorage.getItem('names')?.split(',') || [];
    //     expect(mockData[0]).toEqual(fakeUserResponse[0]);
    // });

    test('UsersList: Error Test 4', async () => {
        
        // render(<UsersList />);
        // const error = await screen.findByText('Something happened');
        // expect(error).toBeInTheDocument();
    });
})
