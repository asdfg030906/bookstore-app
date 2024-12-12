import React, { useState } from "react";
import { Book } from "../types/book.type";
import styled from "styled-components";

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
        <Container onSubmit={handleAddBook}>
            <Wrap>
            <h2>도서 상품 추가하기</h2>
                <div>

            <div>
                <span>제목: </span>
                <input
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <span>저자: </span>
                <input
                    value={newBookAuthor}
                    onChange={(e) => setNewBookAuthor(e.target.value)}
                    required
                />
            </div>
            <div>
                <span>수량: </span>
                <input
                    type="number"
                    value={newBookQuantity}
                    onChange={(e) => setNewBookQuantity(Number(e.target.value))}
                    required
                />
            </div>
            <div>
                <span>설명: </span>
                <input
                    value={newBookDescription}
                    onChange={(e) => setNewBookDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <span>이미지 URL: </span>
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
            <button type="submit">추가하기</button>
                </div>
            </Wrap>
        </Container>
    );
};

export default AddBook;

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #fff;
`

const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    >h2{
        font-size: 32px;
        margin: 100px;
    }
    
    >div{
        display: flex;
        flex-direction: column;
        >div{
            margin-bottom: 20px;
            border: 1px solid #E0E0E0;
            padding: 0 10px;
            border-radius: 5px;
            >span{
                font-size: 18px;
            }
            >input{
                width: 600px;
                padding: 10px;
                font-size: 18px;
            }
        }
        >button{
            font-size: 20px;
            padding: 10px 30px;
            background-color: #4CAF50;
            color: #fff;
            border-radius: 7px;
        }
    }
`
