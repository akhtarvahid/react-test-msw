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
    await waitFor(() => screen.getByText("Rick Sanchez"));
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  test("should render first and prev button as disabled ", async () => {
    // Render the component
    render(<Table />);

    waitFor(() => {
      expect(screen.getByRole("button", { name: "First Page" })).toBeDisabled();
      expect(screen.getByText("Prev")).toBeDisabled();
    });
  });

  test("render next page data after firing next page event", async () => {
    // Render the component
    render(<Table />);

    // firstEvent Next page
    fireEvent.click(screen.getByText("Next"));
    await expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => screen.getByText("Aqua Morty"));
    expect(screen.getByText("Aqua Morty")).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText("Prev")).toBeEnabled();
      expect(screen.getByText("First Page")).toBeEnabled();
    });

    // firstEvent last page
    fireEvent.click(screen.getByText(/Last page/i));
    await expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => screen.getByText("Jerry Smith"));

  });

  test("should render filtered/searched items on onchange", async () => {
    // Render the component
    render(<Table />);

    const inputs = screen.getAllByRole("textbox");
    //screen.debug();
    inputs.forEach((input, i) =>
      fireEvent.change(input, { target: { value: `Alan ${i}` } })
    );

    inputs.forEach((input, i) =>
      expect(input).toHaveAttribute("value", `Alan ${i}`)
    );
  });
});
