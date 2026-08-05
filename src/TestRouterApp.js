import { BrowserRouter, Route, Routes } from "react-router-dom";

// router page
import EventPage from "./pages/event/EventPage";
import SuccessPage from "./pages/event/SuccessPage";
import ErrorPage from "./pages/event/ErrorPage";
import ViewPage from "./pages/event/ViewPage";

const TestRouterApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<EventPage/>}></Route>
                <Route path = "/success" element = {<SuccessPage/>}></Route>
                <Route path = "/error" element = {<ErrorPage/>}></Route>
                <Route path = "/read/:id" element = {<ViewPage/>}></Route> {/* /read/:id => pathvariable로 하는 방법*/}
            </Routes>
        </BrowserRouter>
    );
}

export default TestRouterApp;