import { useMemo, useState } from "react";
import { useDeleteBook, usePostBook, useUpdateBook } from "./hooks/useCrud";
import BookList from "./BookList";
import AddBook from "./AddBook";
import { Book, BookResponse } from "../../types/common-types";
import UpdateBook from "./UpdateBook";
import useSWR, { mutate } from "swr";
import { LIBRARY_API } from "../library-management/constant";
import './style.css';

const CrudWithSWR = () => {
  const [selected, setSelected] = useState<BookResponse | null>(null);
  const { data: books, isLoading } = useSWR(LIBRARY_API);
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

    setSelected(null);
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
      <h2>Add Book To Store</h2>
      {!selected ? (
        <AddBook onAddBook={handleAddBook} />
      ) : (
        <UpdateBook onUpdateBook={handleUpateBook} selected={selected} />
      )}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <BookList
          title="Books Available"
          books={[...booksFromStore].reverse()}
          setSelected={setSelected}
          handleDeleteBook={handleDeleteBook}
        />
      )}
    </div>
  );
};
export default CrudWithSWR;
