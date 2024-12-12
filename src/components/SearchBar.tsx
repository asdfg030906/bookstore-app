import React, { useState } from "react";
import { Book } from "../types/book.type";
import styled from "styled-components";



interface SearchBarProps {
    books: Book[];
    setFilteredBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ books, setFilteredBooks }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (!term.trim()) {
            setFilteredBooks(books);
            return;
        }

        // 검색어가 있을 경우
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(term.toLowerCase()) ||
            book.author.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    return (
        <Wrap>
                <input
                    type="text"
                    placeholder="제목이나 저자를 검색해보세요."
                    value={searchTerm}
                    onChange={handleChange}
                />
        </Wrap>
    );
};

export default SearchBar;

const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    width: 100%;
            >input{
                width: 600px;
                height: 53px;
                box-sizing: border-box;
                border-radius: 30px;
                outline: none;
                border:2px solid #4CAF50;
                font-size: 18px;
                padding: 0 10px;
            }
`