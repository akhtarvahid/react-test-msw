import { useEffect, useState } from "react";
import Listing from "./Listing/Listing";
import Create from "./create/create";
import { getBookLibrary } from "./helper/helper";

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
    setBookStore((prevBooks: any) => [newBook, ...prevBooks]);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <h1 style={{ color: "green" }}>Loading...</h1>}
      <div data-testid="library">
        <h1>Library Form</h1>
        <Create onAddBook={handleAddBook} />
        <Listing books={bookStore} />
      </div>
    </>
  );
}

export default Library;
