/*
title, content, email
- 실제 보여질때는 title만 나오게끔
*/

// 글 목록 페이지

// 실습 전 코드
// const BlogIndexPage = () => {
//     const user = localStorage.getItem('user');
//     return (
//         <div>{user}님 환영합니다.</div>
//     )
// }

// export default BlogIndexPage;

//내가 실습 한 코드

// import styled from "styled-components";
// import { Link } from "react-router-dom";

// const Container = styled.div`
//     min-height: 100vh;
//     padding: 50px 20px;
//     background-color: #f2f2f2;
// `;

// const ContentWrapper = styled.div`
//     width: 700px;
//     margin: 0 auto;
// `;

// const Header = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 30px;
// `;

// const WelcomeMessage = styled.div`
//     font-size: 18px;
//     color: #333;
// `;

// const WriteButton = styled(Link)`
//     padding: 10px 18px;
//     border-radius: 6px;
//     background-color: #007bff;
//     color: white;
//     text-decoration: none;
//     font-size: 14px;

//     &:hover {
//         background-color: #0056b3;
//     }
// `;

// const Title = styled.h2`
//     margin-bottom: 20px;
//     color: #333;
// `;

// const BlogList = styled.div`
//     background-color: white;
//     border-radius: 10px;
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//     overflow: hidden;
// `;

// const BlogItem = styled(Link)`
//     display: block;
//     padding: 20px;
//     border-bottom: 1px solid #eeeeee;
//     color: #333;
//     text-decoration: none;
//     font-size: 17px;

//     &:last-child {
//         border-bottom: none;
//     }

//     &:hover {
//         background-color: #f8f9fa;
//         color: #007bff;
//     }
// `;

// // 글 목록 페이지
// const BlogIndexPage = () => {
//     const user = localStorage.getItem("user");

//     const blogs = [
//         {
//             id: 1,
//             title: "React 상태 관리 알아보기",
//             content: "useState에 대한 내용입니다.",
//             email: "test01@gmail.com"
//         },
//         {
//             id: 2,
//             title: "styled-components 사용하기",
//             content: "styled-components 실습 내용입니다.",
//             email: "test02@gmail.com"
//         },
//         {
//             id: 3,
//             title: "axios로 서버 통신하기",
//             content: "axios POST, GET 요청 내용입니다.",
//             email: "test03@gmail.com"
//         }
//     ];

//     return (
//         <Container>
//             <ContentWrapper>
//                 <Header>
//                     <WelcomeMessage>
//                         {user}님 환영합니다.
//                     </WelcomeMessage>

//                     <WriteButton to="/blogs/write">
//                         글 작성
//                     </WriteButton>
//                 </Header>

//                 <Title>블로그 글 목록</Title>

//                 <BlogList>
//                     {blogs.map((blog) => (
//                         <BlogItem
//                             key={blog.id}
//                             to={`/blogs/read/${blog.id}`}
//                         >
//                             {blog.title}
//                         </BlogItem>
//                     ))}
//                 </BlogList>
//             </ContentWrapper>
//         </Container>
//     );
// };

// export default BlogIndexPage;


// 강사님이 실습 하신 코드

import styled from "styled-components";
import Button from"../../../components/styled/Button";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const WelcomeMessage = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
`;

const LogoutButton = styled(Button)`
    background-color: #f44336;
    color: white;

    &:hover {
        background-color: #d32f2f;
    }
`;

const BlogIndexPage = () => {
    const user = localStorage.getItem('user');

    return (
        <Wrapper>
            <Container>
                {user && <WelcomeMessage>{user}님 환영합니다.</WelcomeMessage>}
                <Button title='글 작성하기'></Button>
                &nbsp;&nbsp;&nbsp;
                <Button title = '로그아웃'></Button>
                &nbsp;&nbsp;&nbsp; {/* 버튼 간 간격 띄우기 */}
                <Button title = '기상예보'></Button>
            </Container>
        </Wrapper>
    );
}

export default BlogIndexPage