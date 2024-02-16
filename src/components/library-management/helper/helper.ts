import axios from "axios"
import { LIBRARY_API } from "../constant"
import { Book } from "../create/create"



export const createBookLibrary = async (form: Book) => {
    let result;
    if (form.title) {
        try {
            const response = await axios.post(LIBRARY_API, { ...form });
            result = await response;
            console.log(result);
        } catch (e) {
        }
    }
    return result;
}