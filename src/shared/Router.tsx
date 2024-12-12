import {BrowserRouter, Route, Routes} from "react-router-dom";
import BookList from "../pages/BookList.tsx";
import AddBookPage from "../pages/AddBookPage.tsx";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<BookList/>}/>
                <Route path={"/add"} element={<AddBookPage/>}/>
            </Routes>
        </BrowserRouter>
);
}

export default Router