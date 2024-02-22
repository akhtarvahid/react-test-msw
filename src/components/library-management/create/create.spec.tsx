import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Create from "./create";
// act should be from @testing-library/react 👉 not from 'react-dom/test-utils';
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../../../mocks/server";
import { HttpResponse, http } from "msw";
import { LIBRARY_API } from "../constant";
import { isFieldsEmpty } from "../helper/helper";
import { BookResponse } from "../../../types/common-types";

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
describe("Create Component", () => {
  it("should have 3 input field", () => {
    const mockFn = jest.fn();
    render(
      <Create
        onAddBook={mockFn}
        selectedBook={null}
        setSelectedBook={jest.fn()}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(3);
    expect(screen.getByRole("textbox", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Author" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Price" })).toBeInTheDocument();
  });
  it("library title field", () => {
    const mockFn = jest.fn();

    render(
      <Create
        onAddBook={mockFn}
        selectedBook={null}
        setSelectedBook={jest.fn()}
      />
    );
    const title = screen.getByRole("textbox", { name: "Title" });
    expect(title).toHaveAttribute("value", "");

    // state update function should be inside act
    act(() => {
      fireEvent.change(title, { target: { value: "Java" } });
    });

    expect(title).toHaveAttribute("value", "Java");
  });
  it("library author field", () => {
    const mockFn = jest.fn();

    render(
      <Create
        onAddBook={mockFn}
        selectedBook={null}
        setSelectedBook={jest.fn()}
      />
    );
    const author = screen.getByRole("textbox", { name: "Author" });
    expect(author).toHaveAttribute("value", "");

    // state update function should be inside act
    act(() => {
      fireEvent.change(author, { target: { value: "James Gosling" } });
    });

    expect(author).toHaveAttribute("value", "James Gosling");
  });
  it("library price field", () => {
    const mockFn = jest.fn();

    render(
      <Create
        onAddBook={mockFn}
        selectedBook={null}
        setSelectedBook={jest.fn()}
      />
    );
    const price = screen.getByRole("textbox", { name: "Price" });
    expect(price).toHaveAttribute("value", "");

    // state update function should be inside act
    act(() => {
      fireEvent.change(price, { target: { value: "$1" } });
    });

    expect(price).toHaveAttribute("value", "$1");
  });

  it("submit new book in library successfully", async () => {
    const mockFn = jest.fn();

    render(
      <Create
        onAddBook={mockFn}
        selectedBook={null}
        setSelectedBook={jest.fn()}
      />
    );
    let title = screen.getByRole("textbox", { name: "Title" });
    let author = screen.getByRole("textbox", { name: "Author" });
    let price = screen.getByRole("textbox", { name: "Price" });

    await act(async () => {
      await userEvent.type(title, "NodeJs");
      await userEvent.type(author, "Xyz");
      await userEvent.type(price, "$1.2");
    });
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    });
    // Wait for the async operation to complete
    waitFor(() =>
      expect(screen.getByText("Successfully created")).toBeInTheDocument()
    );
  });
  it("submit new book in library failure", async () => {
    server.use(
      http.post(LIBRARY_API, () => {
        return HttpResponse.error();
      })
    );
    const mockFn = jest.fn();

    render(
      <Create
        onAddBook={mockFn}
        selectedBook={null}
        setSelectedBook={jest.fn()}
      />
    );
    let title = screen.getByRole("textbox", { name: "Title" });
    let author = screen.getByRole("textbox", { name: "Author" });
    let price = screen.getByRole("textbox", { name: "Price" });

    await act(async () => {
      await userEvent.type(title, "NodeJs");
      await userEvent.type(author, "Xyz");
      await userEvent.type(price, "$1.2");
    });
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    });
    //waitFor(()=> screen.debug());
    // Wait for the async operation to complete
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("isFieldsEmpty function returns true if fields are empty", () => {
    const inputFields = {
      title: "",
      author: "",
      price: "",
    };
    expect(isFieldsEmpty(inputFields)).toBeTruthy();
  });
  it("isFieldsEmpty function returns false if fields arenot empty", () => {
    const inputFields = {
      title: "MERN",
      author: "stephen",
      price: "$3",
    };
    expect(isFieldsEmpty(inputFields)).toBeFalsy();
  });
  it("should update successfully", async () => {
    const mockSelectBookFn = jest.fn();
    const book = {
      title: "My book",
      author: "akhtra",
      price: "$24",
    } as unknown as BookResponse;
    render(
      <Create
        onAddBook={mockSelectBookFn}
        selectedBook={book}
        setSelectedBook={jest.fn()}
      />
    );
    const updateBadge = screen.getByText("Update");
    expect(updateBadge).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(updateBadge);
    });
    waitFor(() => expect(screen.getByText("Updated succesfully")));
  });
  it("updating book details failure", async () => {
    const mockSelectBookFn = jest.fn();
    const book = {
      title: "My book",
      author: "akhtra",
      price: "$24",
    } as unknown as BookResponse;
    render(
      <Create
        onAddBook={mockSelectBookFn}
        selectedBook={book}
        setSelectedBook={jest.fn()}
      />
    );
    const updateBadge = screen.getByText("Update");
    expect(updateBadge).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(updateBadge);
    });
    waitFor(() => expect(screen.getByText("Error occured while updation!")));
    waitFor(() => screen.debug());
  });
});
