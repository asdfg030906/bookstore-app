// src/components/BookList.tsx
import React, { useState, useEffect } from "react";
import { fetchBooks } from "../api/api";
import { Book } from "../types/book.type";
import {useNavigate} from "react-router-dom";
import {deleteBook} from "../api/api";

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

   const navigate = useNavigate();

    useEffect(() => {
        const getBooks = async () => {
            try {
                const booksData = await fetchBooks();
                setBooks(booksData);
                setFilteredBooks(booksData);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        getBooks();
    }, []);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleRemoveClick = async (id: number) => {
        try {
            await deleteBook(id);
            setBooks((prev) => prev.filter((book) => book.id !== id));
            setFilteredBooks((prev) => prev.filter((book) => book.id !== id));
            console.log(`Book ID ${id} removed`);
        } catch (error) {
            console.error(`Failed to remove book ID ${id}`, error);
        }
    };

    return (
        <div>
            <h1>책 목록</h1>
            <button onClick={() => navigate("/add")} >
                책 추가하기
            </button>
            <ul>
                {currentBooks.map((book) => (
                    <li key={book.id}>
                        <img src={book.img}/>
                        <h3>{book.title}</h3>
                        <p>작가: {book.author}</p>
                        <p>설명: {book.description}</p>
                        <p>수량: {book.quantity}</p>
                        <button onClick={() => handleRemoveClick(book.id)}>
                            삭제
                        </button>
                    </li>
                ))}
            </ul>

            <div>
                {Array.from({ length: Math.ceil(filteredBooks.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BookList;
