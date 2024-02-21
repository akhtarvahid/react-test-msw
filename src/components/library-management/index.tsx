import { useEffect, useState } from "react";
import Listing from "./Listing/Listing";
import Create from "./create/create";
import { getBookLibrary } from "./helper/helper";
import { BookResponse } from "../../types/common-types";

function Library() {
  const [bookStore, setBookStore] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const books = await getBookLibrary();
      setBookStore(books?.reverse());
    };
    fetchData();
  }, []);

  const handleAddBook = async (newBook: any) => {
    setIsLoading(true);
    setBookStore((prevBooks: BookResponse[]) => [newBook, ...prevBooks]);
    setIsLoading(false);
  };
  const handleDeleteBook = (id: string) => {
    setBookStore((prevBooks: BookResponse[]) => prevBooks.filter(book => book.id !== id));
  }

  return (
    <>
      {isLoading && <h1 style={{ color: "green" }}>Loading...</h1>}
      <div data-testid="library">
        <h1>Library Form</h1>
        <Create onAddBook={handleAddBook} />
        <Listing books={bookStore} deleteBook={handleDeleteBook} />
      </div>
    </>
  );
}

export default Library;
