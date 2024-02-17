import { Book } from "../create/create"
import { addBook, getBooks } from "../../../api/api";

export const createBookLibrary = async (form: Book) => {
       let result;
        try {
            const response = await addBook(form)
            result = await response;
        } catch (e) {
         
        }
    
    return result;
}

export const getBookLibrary = async () => {
    const response = await getBooks();
    const result = await response;
    return result;
}