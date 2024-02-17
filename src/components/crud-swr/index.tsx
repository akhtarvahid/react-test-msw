import { useEffect, useMemo, useState } from "react";
import { useDeleteBook, useGetBooks, usePostBook, useUpdateBook } from "./hooks/useCrud";
import BookList from "./BookList";
import AddBook from "./AddBook";
import { Book, BookResponse } from "../../types/common-types";
import UpdateBook from "./UpdateBook";

const CrudWithSWR = () => {
    const [selected, setSelected] = useState<BookResponse | null>(null);
    const { books, getStoreBooks, isGetting, getError } = useGetBooks();
    const { book, addBookToStore, isCreating, createError } = usePostBook();
    const { updateBookToStore, isUpdating, updateError } = useUpdateBook();
    const { deleteBookFromStore, isDeleting, deleteError, } = useDeleteBook();


    useEffect(() => {
        getStoreBooks();
    }, 
    [   getStoreBooks,
        isCreating, 
        isUpdating, 
        isDeleting
    ])

    const booksFromStore = useMemo(() => {
        return books &&([...books].reverse() || [])
    }, [books])

    const handleAddBook = async (book: Book) => {
        try {
          await addBookToStore(book);
        } catch (err) {

        }
    }
    const handleUpateBook = async (book: BookResponse) => {
        try {
            await updateBookToStore({
                requestBody: book,
                queryParams: { id: book.id }
            });
        } catch (err) {

        }
    }
    const handleDeleteBook = async (id: string) => {
        try {
            await deleteBookFromStore({
                requestBody: book,
                queryParams: { id: id }
            });
        } catch (err) {

        }
    }

    const isLoading = isGetting || isUpdating || isCreating || isDeleting;

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (getError || createError || updateError || deleteError) {
        return <h1>Something happened wrong!</h1>
    }

    return (
        <div>
            <h1>Book Store</h1>
            {!selected ? <AddBook onAddBook={handleAddBook} /> :
                <UpdateBook onUpdateBook={handleUpateBook} selected={selected} />}
            <BookList books={booksFromStore} setSelected={setSelected} handleDeleteBook={handleDeleteBook} />
        </div>
    )
}
export default CrudWithSWR;