import {Book} from "../types/book.type.ts";
import {authInstance} from "./axios.ts";

export const fetchBooks = async ():Promise<Book[]> => {
    const { data } = await authInstance.get<Book[]>('/books');
    return data;
}