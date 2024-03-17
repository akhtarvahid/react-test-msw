import { render, screen, waitFor } from "@testing-library/react";
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
  test("render table row per page", () => {
    // Render the component
    render(<Table />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("render component asynchronously to render data", async () => {
    // Render the component
    render(<Table />);

    await waitFor(() => {
      screen.debug();
    });
  });
});
