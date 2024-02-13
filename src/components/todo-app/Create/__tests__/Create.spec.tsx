import { render, screen } from "@testing-library/react"
import { server } from "../../../../mocks/server";
import Create from "../create";

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

describe('Create component', () => {
    it('name field', async () => {
        render(<Create />);
        const name = await screen.findByLabelText('Name');
        expect(name).toBeInTheDocument();
      });
})