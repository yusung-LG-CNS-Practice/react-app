import { Link } from "react-router-dom";

// 데이터를 state를 통해서 전달받을 경우
import { useLocation } from "react-router-dom";

const SuccessPage = () => {

    const location = useLocation();
    const { user, from } = location.state || {}; //=> 휘발성이다.

    const name = localStorage.getItem('userName');

    return (
        <div>
            <center>{name}-{user.name}님 로그인 성공</center>
            &nbsp;&nbsp;&nbsp;
            <Link to="/read/10">상세페이지로...</Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/">랜딩페이지로...</Link>
        </div>
    );

    // 아래처럼 할 수도 있고 위에 처럼도 할 수 있음

    // return(
    //     <div>
    //         <center>{user.name}님 로그인 성공</center>
    //         &nbsp;&nbsp;&nbsp;
    //         {/* <a href = "/">랜딩페이지로...</a> */}
    //         <Link to = "/read/1">상세페이지로...</Link>
    //         <Link to = "/">랜딩페이지로...</Link>
    //     </div>
    // );
}

export default SuccessPage;