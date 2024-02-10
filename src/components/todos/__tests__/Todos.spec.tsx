import { render, screen, waitFor } from "@testing-library/react"
import { server } from "../../../mocks/server";
import { todosMock } from "../../../utils/mock-data/mock-data";
import Todos from "../Todos";

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

describe('Todos component', () => {

    it('Todos Component title', async () => {
        render(<Todos />);
        const loadingText = screen.getByRole('heading', { name: "User Todos" });
        expect(loadingText).toBeInTheDocument();
    })

    it('users fetched successfully', async () => {
        render(<Todos />);
        const heading = await screen.findByText('Geoffrey Metz');
        expect(heading).toBeInTheDocument();

        // ternary condition tests by adding 2 mock data
        const paragraph = await screen.findByTestId('non-resident');
        expect(paragraph).toBeInTheDocument();
        const paragraph2 = await screen.findByTestId('resident');
        expect(paragraph2).toBeInTheDocument();
    })

    it('fetched data and renders Todos ', async () => {
        await render(<Todos />);
        const loading = await screen.findByText('loading...');
        expect(loading).toBeInTheDocument();
        const listNode = await screen.findByTestId('todos')
        waitFor(() => expect(loading).not.toBeInTheDocument());
        expect(listNode.childNodes).toHaveLength(todosMock.length);
      });

    it('Todos List rendering', async () => {
        render(<Todos />);
        const lists = await screen.findAllByTestId('todo-row');
        expect(lists).toHaveLength(todosMock.length);
    })
})