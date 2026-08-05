import { BrowserRouter, Route, Routes } from "react-router-dom";

// router page
import EventPage from "./pages/event/EventPage";
import SuccessPage from "./pages/event/SuccessPage";
import ErrorPage from "./pages/event/ErrorPage";

const TestRouterApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<EventPage/>}></Route>
                <Route path = "/success" element = {<SuccessPage/>}></Route>
                <Route path = "/error" element = {<ErrorPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default TestRouterApp;