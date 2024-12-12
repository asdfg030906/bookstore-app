import React, { useState } from "react";
import { Book } from "../types/book.type";

interface AddBookFormProps {
    onAdd: (newBookData: Omit<Book, "id">) => Promise<void>;
}

const AddBook: React.FC<AddBookFormProps> = ({ onAdd }) => {
    const [newBookTitle, setNewBookTitle] = useState("");
    const [newBookAuthor, setNewBookAuthor] = useState("");
    const [newBookQuantity, setNewBookQuantity] = useState<number>(1);
    const [newBookDescription, setNewBookDescription] = useState("");
    const [newBookImgUrl, setNewBookImgUrl] = useState("");

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        const newBookData = {
            title: newBookTitle,
            author: newBookAuthor,
            quantity: newBookQuantity,
            description: newBookDescription,
            img: newBookImgUrl
        };

        await onAdd(newBookData);

        setNewBookTitle("");
        setNewBookAuthor("");
        setNewBookQuantity(1);
        setNewBookDescription("");
        setNewBookImgUrl("");
    };

    return (
        <form onSubmit={handleAddBook} style={{ marginBottom: "20px" }}>
            <h2>책 추가하기</h2>
            <div>
                <label>제목: </label>
                <input
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>저자: </label>
                <input
                    value={newBookAuthor}
                    onChange={(e) => setNewBookAuthor(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>수량: </label>
                <input
                    type="number"
                    value={newBookQuantity}
                    onChange={(e) => setNewBookQuantity(Number(e.target.value))}
                    required
                />
            </div>
            <div>
                <label>설명: </label>
                <input
                    value={newBookDescription}
                    onChange={(e) => setNewBookDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>이미지 URL: </label>
                <input
                    value={newBookImgUrl}
                    onChange={(e) => {
                        const value = e.target.value;
                        // 영문 대소문자, 숫자, :, /, ., _, - 만 허용
                        const regex = /^[A-Za-z0-9:\/._-]*$/;
                        if (regex.test(value)) {
                            setNewBookImgUrl(value);
                        }
                    }}
                    required
                />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;