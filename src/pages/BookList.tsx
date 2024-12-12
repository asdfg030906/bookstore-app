// src/components/BookList.tsx
import React, { useState, useEffect } from "react";
import {fetchBooks, updateBookQuantity} from "../api/api";
import { Book } from "../types/book.type";
import {useNavigate} from "react-router-dom";
import {deleteBook} from "../api/api";

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;
    const [editQuantities, setEditQuantities] = useState<{ [key: number]: number }>({});

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

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setEditQuantities((prev) => ({
            ...prev,
            [id]: newQuantity
        }));
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

    const handleUpdateClick = async (id: number) => {
        const newQuantity = editQuantities[id];
        try {
            const updatedBook = await updateBookQuantity(id, newQuantity);
            setBooks((prev) =>
                prev.map((book) => (book.id === id ? updatedBook : book))
            );
            setFilteredBooks((prev) =>
                prev.map((book) => (book.id === id ? updatedBook : book))
            );

            console.log(`Book ID ${id} quantity updated to ${newQuantity}`);
        } catch (error) {
            console.error(`Failed to update quantity for book ID ${id}`, error);
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
                        <p>
                            수량:
                            <input
                                type="number"
                                value={editQuantities[book.id] || book.quantity}
                                onChange={(e) => handleQuantityChange(book.id, Number(e.target.value))}
                                style={{width: "60px", marginLeft: "10px"}}
                            />
                            <button onClick={() => handleUpdateClick(book.id)} style={{marginLeft: "10px"}}>
                                수정하기
                            </button>
                            <button onClick={() => handleRemoveClick(book.id)}
                                    style={{marginLeft: "10px", color: "red"}}>
                                삭제하기
                            </button>
                        </p>
                    </li>
                ))}
            </ul>

            <div>
                {Array.from({length: Math.ceil(filteredBooks.length / itemsPerPage)}, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BookList;
