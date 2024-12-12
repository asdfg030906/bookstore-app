import {Book} from "../types/book.type.ts";
import {authInstance} from "./axios.ts";

//책 목록 가져오기
export const fetchBooks = async ():Promise<Book[]> => {
    const { data } = await authInstance.get<Book[]>('/books');
    return data;
}

// 책 추가
export const addBook = async (newBook: Omit<Book, "id">): Promise<Book> => {
    const { data } = await authInstance.post<Book>("/books", newBook);
    return data;
};