import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Table from "../Index";
import { server } from "../../../mocks/server";
import { SERIES_API } from "../../../utils/env";
import { HttpResponse, http } from "msw";

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

    // firstEvent of Next page
    fireEvent.click(screen.getByText("Next"));
    await expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => screen.getByText("Aqua Morty"));
    expect(screen.getByText("Aqua Morty")).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText("Prev")).toBeEnabled();
      expect(screen.getByText("First Page")).toBeEnabled();
    });

    // fireEvent of first page
    fireEvent.click(screen.getByText(/First page/i));
    await waitFor(() => screen.getByText("Rick Sanchez"));
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText("Prev")).toBeDisabled();
      expect(screen.getByText("First Page")).toBeDisabled();
    });

    // firstEvent of last page
    fireEvent.click(screen.getByText(/Last page/i));
    await expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("Jerry Smith")).toBeInTheDocument()
    );
    waitFor(() => {
      expect(screen.getByText("Next")).toBeDisabled();
      expect(screen.getByText("Last Page")).toBeDisabled();
    });

    // fireEvent prev of Last button
    fireEvent.click(screen.getByText(/Prev/i));
    await waitFor(() => screen.getByText("Beth Smith"));
    expect(screen.getByText("Beth Smith")).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText("Prev")).toBeEnabled();
      expect(screen.getByText("First Page")).toBeEnabled();
    });
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

  test("should render error state if API fails/error occurred", async () => {
    server.use(
      http.get(`${SERIES_API}`, async () => {
        return HttpResponse.error();
      })
    );
    // Render the component
    render(<Table />);

    waitFor(() => {
      const error = screen.findByText("Error loading data");
      expect(error).toBeInTheDocument();
    });
  });
});
