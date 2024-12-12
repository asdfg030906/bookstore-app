import {Book} from "../types/book.type.ts";
import {authInstance} from "./axios.ts";

//책 목록 가져오기
export const fetchBooks = async ():Promise<Book[]> => {
    const { data } = await authInstance.get<Book[]>('/books');
    return data;
}

//책 추가
export const addBook = async (newBook: Omit<Book, "id">): Promise<Book> => {
    const { data } = await authInstance.post<Book>("/books", newBook);
    return data;
};

//삭제
export const deleteBook = async (id: number): Promise<void> => {
    await authInstance.delete(`/books/${id}`);
};

//수량 수정
export const updateBookQuantity = async (id: number, quantity: number): Promise<Book> => {
    const { data } = await authInstance.patch<Book>(`/books/${id}`, { quantity });
    return data;
};