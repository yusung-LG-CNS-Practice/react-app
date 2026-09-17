import { BrowserRouter, Routes, Route } from "react-router-dom";

import BlogIndexPage from "./features/blog/page/BlogIndexPage";
import BlogReadPage from "./features/blog/page/BlogReadPage";
import BlogWritePage from "./features/blog/page/BlogWritePage";
import SignInPage from "./features/user/page/SignInPage";
import SignUpPage from "./features/user/page/SignUpPage";
import WeatherPage from "./features/openapi/page/WeatherPage";
import ForcastPage from "./features/forcast/page/ForcastPage";
import ForcastList from "./features/forcast/list/ForcastList";

const ToyApp = () => {
    return(
        <BrowserRouter>
            <Routes>

                {/* user */}
                <Route path = "/" element = {<SignUpPage/>}></Route>
                <Route path = "/users/signIn" element = {<SignInPage/>}></Route>

                {/* blog */}
                <Route path = "/blogs/index" element = {<BlogIndexPage/>}></Route>
                <Route path = "/blogs/write" element = {<BlogWritePage/>}></Route>
                <Route path = "/blogs/read/:blogId" element = {<BlogReadPage/>}></Route>
                
                {/* open api */}
                <Route path = "/openapi/index" element = {<WeatherPage/>}></Route>

                {/* forcast api */}
                <Route path = "/forcast/index" element = {<ForcastPage/>}></Route>
                <Route path = "/forcast/list" element = {<ForcastList/>}></Route>
 
            </Routes>
        </BrowserRouter>
    );
}

export default ToyApp;