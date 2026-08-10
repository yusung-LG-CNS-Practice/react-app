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


// 강사님이 퀴즈 및 실습 하신 코드

import styled from "styled-components";
import Button from "../../../components/styled/Button";
import BlogList from "../list/BlogList";
import React, { useEffect, useState, useMemo } from 'react';
import api from '../../../api/axios';
import { useNavigate } from "react-router-dom";

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

    & > *:not(:last-child) {
        margin-bottom: 16px;
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

const CategoryRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin: 24px 0 16px;
    padding: 16px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
`;

const CategoryChip = styled.button`
    padding: 9px 18px;
    border-radius: 20px;
    border: 1px solid
        ${({ $active }) => ($active ? "#007bff" : "#dddddd")};

    background-color:
        ${({ $active }) => ($active ? "#007bff" : "#ffffff")};

    color:
        ${({ $active }) => ($active ? "#ffffff" : "#555555")};

    font-size: 14px;
    font-weight:
        ${({ $active }) => ($active ? "bold" : "normal")};

    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color:
            ${({ $active }) => ($active ? "#0056b3" : "#f2f7ff")};

        border-color: #007bff;
        color:
            ${({ $active }) => ($active ? "#ffffff" : "#007bff")};
    }
`;

// blog property - title, content, category, email(pk)
const BlogIndexPage = () => {

    const user = localStorage.getItem('user');

    const CATEGORIES = ["전체", "개발", "생활", "취미", "일상"];

    // const blogs = [];

    const [blogs, setBlogs] = useState([]); // 초기값 배열로 설정

    // const blogs = [
    // {
    //     "title" : "til 작성",
    //     "content" : "component",
    //     "category" : "front-end",
    //     "email" : user
    // },
    // {
    //     "title" : "링거 (술)",
    //     "content" : "java",
    //     "category" : "back-end",
    //     "email" : user
    // }
    // ]

    /*
    Q)
    - axios 통신(get(blogs), params X)
    - 데이터를 reactive state 관리(setxxxx)
    - 랜더링 시점에 데이터 바인딩이 안됨, 그래서 effect이 필요함
    */

    const loadData = async () => {
        // json-server version
        await api.get('/blogs')
            .then(response => {
                console.log(
                    `debug >>>> axios request success`,
                    response
                );

                if (response.status === 200) {
                    setBlogs(response.data);
                }
            })
            .catch(error => {
                console.log(
                    `debug >>>> axios request error`,
                    error
                );
            });
    };
    useEffect(() => {
        loadData();
    }, [])

    // 선택된 카테고리에 따라 blogs 필터링
    const [selectedCategory, setSelectedCategory] = useState("전체");

    // case 01
    // const filteredBlogs =
    //     selectedCategory === "전체"
    //         ? blogs
    //         : blogs.filter(
    //             (blog) => blog.category === selectedCategory
    //         );

    // case 02 : useMemo() - 성능개선을 위해서 사용함(대용량 데이터 처리를 위해 사용)
    const filteredBlogs = useMemo(() => {
        return selectedCategory === "전체"
            ? blogs
            : blogs.filter((blog) => blog.category === selectedCategory)
    }, [blogs, selectedCategory])

    const moveUrl = useNavigate();
    // handler
    const writeHandler = (e) => {
        moveUrl('/blogs/write');
    }

    return (
        <Wrapper>
            <Container>
                {user && <WelcomeMessage>{user}님 환영합니다.</WelcomeMessage>}
                <Button title='글 작성하기'
                    onClick={(e) => writeHandler(e)}></Button>
                &nbsp;&nbsp;&nbsp;
                <Button title='로그아웃'
                    onClick={(e) => {
                        moveUrl("/");
                    }}></Button>
                &nbsp;&nbsp;&nbsp; {/* 버튼 간 간격 띄우기 */}
                <Button title='기상예보'></Button>
                &nbsp;&nbsp;&nbsp;
                <Button title='Openapi'
                    onClick={(e) => {
                        moveUrl('/openapi/index')
                    }}></Button>

                <CategoryRow>
                    {CATEGORIES.map((category) => (
                        <CategoryChip
                            key={category}
                            $active={category === selectedCategory}
                            onClick={() => setSelectedCategory(category)}>
                            {category}
                        </CategoryChip>
                    ))}
                </CategoryRow>

                <BlogList ary={filteredBlogs || []}></BlogList>
            </Container>
        </Wrapper>
    );
}

export default BlogIndexPage


// 내가 한 퀴즈 코드

// import styled from "styled-components";
// import Button from "../../../components/styled/Button";
// import BlogList from "../list/BlogList";
// import React, { useEffect, useState } from "react";
// import api from "../../../api/axios";

// const Wrapper = styled.div`
//     padding: 16px;
//     width: calc(100% - 32px);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;

// const Container = styled.div`
//     width: 100%;
//     max-width: 720px;

//     & > * {
//         :not(:last-child) {
//             margin-bottom: 16px;
//         }
//     }
// `;

// const WelcomeMessage = styled.div`
//     font-size: 18px;
//     font-weight: bold;
//     margin-bottom: 16px;
//     color: #333;
// `;

// const LogoutButton = styled(Button)`
//     background-color: #f44336;
//     color: white;

//     &:hover {
//         background-color: #d32f2f;
//     }
// `;

// // blog property
// // title, content, category, email
// const BlogIndexPage = () => {
//     const user = localStorage.getItem("user");

//     // 처음에는 서버 데이터가 없으므로 빈 배열
//     const [blogs, setBlogs] = useState([]);

//     /*
//     Q)
//     - axios 통신(get /blogs, params X)
//     - 데이터를 reactive state 관리(setBlogs)
//     - 렌더링 시점에 데이터 바인딩이 안됨
//     - 그래서 useEffect 필요
//     */

//     const loadData = async () => {
//         try {
//             const response = await api.get("/blogs");

//             console.log(
//                 "debug >>>> BlogIndexPage loadData response",
//                 response
//             );

//             // json-server에서 받은 배열을 상태에 저장
//             setBlogs(response.data);
//         } catch (error) {
//             console.log(
//                 "debug >>>> BlogIndexPage loadData error",
//                 error
//             );

//             setBlogs([]);
//         }
//     };

//     // BlogIndexPage가 처음 렌더링된 후 한 번 실행
//     useEffect(() => {
//         loadData();
//     }, []);

//     return (
//         <Wrapper>
//             <Container>
//                 {user && (
//                     <WelcomeMessage>
//                         {user}님 환영합니다.
//                     </WelcomeMessage>
//                 )}

//                 <Button title="글 작성하기" />

//                 &nbsp;&nbsp;&nbsp;

//                 <Button title="로그아웃" />

//                 &nbsp;&nbsp;&nbsp;

//                 <Button title="기상예보" />

//                 <BlogList ary={blogs || []} />
//             </Container>
//         </Wrapper>
//     );
// };

// export default BlogIndexPage;