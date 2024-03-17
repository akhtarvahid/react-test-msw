import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Table from "../Index";
import { server } from "../../../mocks/server";

beforeAll(() => {
  // Start the interception.
  server.listen();
});

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers();
});

afterAll(() => {
  // Disable request interception and clean up.
  server.close();
});

describe("Table component", () => {
  test("render table row per page", async () => {
    // Render the component
    render(<Table />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => screen.getByText('Rick Sanchez'));
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  test("render next page data after firing next page event", async () => {

    // Render the component
    render(<Table />);

    fireEvent.click(screen.getByText('Next')); 
    await expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => screen.getByText('Aqua Morty'));
    expect(screen.getByText('Aqua Morty')).toBeInTheDocument();
    screen.debug();
  });
});
