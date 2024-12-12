import React, { useState, useEffect } from "react";
import {fetchBooks, updateBookQuantity} from "../api/api";
import { Book } from "../types/book.type";
import {useNavigate} from "react-router-dom";
import {deleteBook} from "../api/api";
import SearchBar from "../components/SearchBar.tsx";
import styled from "styled-components";
import det from "../../public/assets/det.png";

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
        <Container>
            <Wrap>
                <Sectcion>
                    <span>행운 서점</span>
                    <SearchBar books={books} setFilteredBooks={setFilteredBooks}/>
                </Sectcion>
                <BooksList>
                    <Category>
                        <span>도서 목록</span>
                        <button onClick={() => navigate("/add")}>
                            추가하기
                        </button>
                    </Category>
                    <List>
                        {currentBooks.map((book) => (
                            <BookBox key={book.id}>
                                <div className="line"></div>
                                <div>
                                    <div>
                                        <img src={book.img}/>
                                        <div>
                                            <h3>{book.title}</h3>
                                            <span>{book.author}(저자)</span>
                                            <br/>
                                            <span className={'quantity'}>
                                            수량:
                                        </span>
                                            <input
                                                type="number"
                                                value={editQuantities[book.id] || book.quantity}
                                                onChange={(e) => handleQuantityChange(book.id, Number(e.target.value))}
                                            />
                                            <button className={'update'} onClick={() => handleUpdateClick(book.id)}>
                                                수정하기
                                            </button>
                                        </div>
                                    </div>
                                    <button className={'remove'} onClick={() => handleRemoveClick(book.id)}>
                                        <img src={det}/>
                                    </button>
                                </div>
                                <div className="line"></div>
                            </BookBox>
                        ))}
                    </List>
                </BooksList>
                <Page>
                    {Array.from({length: Math.ceil(filteredBooks.length / itemsPerPage)}, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </Page>
            </Wrap>
        </Container>
    );
};

export default BookList;


export const Container = styled.div`
    width: 100%;
    background-color: #fff;
`
export const Wrap = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 270px;
    display: flex;
    flex-direction: column;
`
export const Sectcion = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > span {
        font-size: 35px;
        font-weight: 700;
        margin-top: 75px;
    }
`

export const BooksList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`

export const Category  = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 60px 0 19px 0;
    >span{
        font-size: 25px;
    }
    >button{
        font-size: 16px;
        border-radius: 6px;
        background-color: #4CAF50;
        padding: 5px 10px;
        color: #fff;
    }
`
export const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    
`

export const BookBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 80px;
    >div.line{
        border-top: 1px solid #E0E0E0;
        //margin: 30px 0;
        width: 100%;
        padding: 0;
    }
    >div{
        display: flex;
        justify-content: space-between;
        >button.remove{
            background-color: #FF5252;
            width: 40px;
            height: 36px;
            border-radius: 4px;
            margin: 20px 10px 0 0;
            >img{
                width: 24px;
                height: 24px;
            }
        }
        >div{
            padding: 32px 0;
            display: flex;
            >img{
                width: 150px;
                height: auto;
            }
            >div{
                padding-left: 50px;
                >h3{
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                >span{
                    color: #666666;
                    font-size: 16px;
                }
                >span.quantity{
                    font-size: 16px;
                    color: #000;
                }
                >input{
                    border-bottom: 1px solid #E0E0E0;
                    margin-right: 10px;
                    font-size: 16px;
                }
                >button.update{
                    background-color: #fff;
                    border: 1px solid #4CAF50;
                    padding: 10px 15px;
                    font-size: 13px;
                    border-radius: 4px;
                }
            }
        }
    }
`

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    >button{
        font-size: 15px;
        border-radius: 2px;
        border: 1px solid #E0E0E0;
        padding: 5px 10px;
        margin-right: 10px;
    }
`