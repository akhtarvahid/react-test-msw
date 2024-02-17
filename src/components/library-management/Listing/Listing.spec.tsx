import { render, screen } from "@testing-library/react"
import Listing from "./Listing";
import { server } from "../../../mocks/server";

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

// AAA(Arrange-Act-Assert)

describe('Library Listing component', () => {

    it('users fetched successfully', async () => {
        const mockData = [{ id: 1, title: 'Enrique Stokes'}, { id: 2, title: 'MERN Stack'}]
        render(<Listing books={mockData} />);
        const heading = await screen.findByText('Enrique Stokes');
        expect(heading).toBeInTheDocument();
    })
})