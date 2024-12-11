import {BrowserRouter, Route, Routes} from "react-router-dom";
import BookList from "../pages/BookList.tsx";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<BookList/>}/>
            </Routes>
        </BrowserRouter>
);
}

export default Router