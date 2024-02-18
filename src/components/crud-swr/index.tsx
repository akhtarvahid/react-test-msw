import { useMemo, useState } from "react";
import { useDeleteBook, usePostBook, useUpdateBook } from "./hooks/useCrud";
import BookList from "./BookList";
import AddBook from "./AddBook";
import { Book, BookResponse } from "../../types/common-types";
import UpdateBook from "./UpdateBook";
import useSWR, { mutate } from "swr";
import { LIBRARY_API } from "../library-management/constant";

const CrudWithSWR = () => {
  const [selected, setSelected] = useState<BookResponse | null>(null);
  const { data: books } = useSWR(LIBRARY_API);
  const { addBookToStore, createError } = usePostBook();
  const { updateBookToStore, updateError } = useUpdateBook();
  const { deleteBookFromStore, deleteError } = useDeleteBook();

  const booksFromStore = useMemo(() => {
    return books || [];
  }, [books]);

  const handleAddBook = async (book: Book) => {
    try {
      mutate(LIBRARY_API, [...booksFromStore, book], false);
      await addBookToStore(book);
    } catch (err) {}
  };
  const handleUpateBook = async (book: BookResponse) => {
    const modifiedBooks = booksFromStore.map((b: BookResponse) =>
      b.id === book.id ? book : b
    );
    try {
      mutate(LIBRARY_API, [...modifiedBooks], false);
      await updateBookToStore({
        requestBody: book,
        queryParams: { id: book.id },
      });
    } catch (err) {}
  };
  const handleDeleteBook = async (id: string) => {
    const filtered = booksFromStore.filter((b: BookResponse) => b.id !== id);
    try {
      mutate(LIBRARY_API, [...filtered], false);
      await deleteBookFromStore(id);
    } catch (err) {}
  };

  if (createError || updateError || deleteError) {
    return <h1>Something happened wrong!</h1>;
  }

  return (
    <div>
      <h1>Book Store</h1>
      {!selected ? (
        <AddBook onAddBook={handleAddBook} />
      ) : (
        <UpdateBook onUpdateBook={handleUpateBook} selected={selected} />
      )}
      <BookList
        books={[...booksFromStore].reverse()}
        setSelected={setSelected}
        handleDeleteBook={handleDeleteBook}
      />
    </div>
  );
};
export default CrudWithSWR;
