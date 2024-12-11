import React, { useState, useEffect } from "react";
import { fetchBooks } from "../api/api";
import {Book} from "../types/book.type.ts";

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);



    useEffect(() => {
        const getBooks = async () => {
            try {
                const booksData = await fetchBooks();
                setBooks(booksData);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        getBooks();
    }, []);

    return (
        <>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <h3>{book.title}</h3>
                        <p>작가: {book.author}</p>
                        <p>설명: {book.description}</p>
                        <p>재고 수량: {book.quantity}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default BookList;
