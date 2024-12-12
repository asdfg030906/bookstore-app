import React from 'react';
import { addBook } from '../api/api';
import { Book } from '../types/book.type';
import AddBook from '../components/AddBook.tsx';
import { useNavigate } from 'react-router-dom';

const AddBookPage: React.FC = () => {
    const navigate = useNavigate();

    const handleAddBook = async (newBookData: Omit<Book, "id">) => {
        try {
            await addBook(newBookData);
            navigate("/");
        } catch (error) {
            console.error("Failed to add new book", error);
        }
    };

    return (
            <AddBook onAdd={handleAddBook} />
    );
};

export default AddBookPage;