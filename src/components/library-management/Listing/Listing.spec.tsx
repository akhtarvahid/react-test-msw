import { render, screen } from "@testing-library/react"
import Listing from "./Listing";
import { server } from "../../../mocks/server";
import { libraryMoock } from "../../../utils/mock-data/mock-data";

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
    it('users undefined', async () => {
        render(<Listing books={[]} />);
        const listItem = screen.queryByText('Enrique Stokes');
        expect(listItem).not.toBeInTheDocument();
    })
    it('users fetched successfully', async () => {
        render(<Listing books={libraryMoock} />);
        const listItem = await screen.findByText('Enrique Stokes');
        expect(listItem).toBeInTheDocument();
    })
})