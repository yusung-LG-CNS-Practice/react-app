import styled from "styled-components";
import Button from "../../../components/styled/Button";
import TextInput from "../../../components/styled/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../api/axios";

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

// category UI
const CategoryLabel = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 8px;
`;

const CategoryWrapper = styled.div`
    /* Container의 margin-bottom 규칙과 충돌 없이 label + row 묶기 위한 wrapper */
`;

const CategoryRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    width: 100%;
`;

const CategoryChip = styled.button`
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    white-space: nowrap;
    height: 36px;
    line-height: 1;
    type: button;

    border: 1.5px solid ${(props) => (props.$active ? "#6366f1" : "#e5e7eb")};
    background: ${(props) => (props.$active ? "#6366f1" : "#ffffff")};
    color: ${(props) => (props.$active ? "#ffffff" : "#4b5563")};
    font-size: 13px;
    font-weight: 600;
    padding: 0 18px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.15s;
    outline: none;

    &:focus {
        outline: none;
        box-shadow: none;
    }

    &:hover {
        border-color: #6366f1;
    }
`;

const BlogWritePage = () => {

    const user = localStorage.getItem('user');
    const CATEGORIES = ["개발", "생활", "취미", "일상"];
    const [selectedCategory, setSelectedCategory] = useState("");

    const moveUrl = useNavigate();

    // state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // handler
    const writeHandler = async () => {
        /*
        Q)
        - api를 이용한 post 통신 : data(category, title, content, email)
        - status code : 201(Created)
        - blod index로 transition이 되야함
        */
        console.log(`debug >>>> BlogWritePage writeHandler`);
        console.log(`debug >>>> title ${title}, content ${content}, category ${selectedCategory}, email ${user}`);

        // 내가 한 퀴즈 코드
        // const data = {
        //     category: selectedCategory,
        //     title: title,
        //     content: content,
        //     email: user
        // };

        // api.post('/blogs', data)
        //     .then((response) => {
        //         console.log('debug >>> blog write response', response);

        //         if (response.status === 201) {
        //             moveUrl('/blogs/index');
        //         }
        //     })
        //     .catch((error) => {
        //         console.log('debug >>> blog write error', error);
        //     });


        await api.post('/blogs', {
            title: title,
            content: content,
            category: selectedCategory,
            email: user
        })
            .then(response => {
                console.log('debug >>> axios request success', response);
                if (response.status === 201) {
                    moveUrl('/blogs/index');
                }
            })
            .catch(error => {
                console.log('debug >>> axios request error', error);
            });

    };

    return (
        <Wrapper>
            <Container>
                {user && <WelcomeMessage>{user}님 환영합니다.</WelcomeMessage>}

                {/* 카테고리 선택 */}
                <CategoryWrapper>
                    <CategoryLabel>카테고리</CategoryLabel>
                    <CategoryRow>
                        {CATEGORIES.map((category, idx) => {
                            return (
                                <CategoryChip
                                    key={idx}
                                    type="button"
                                    $active={selectedCategory === category}
                                    // onClick={() => {
                                    //     setSelectedCategory(category);
                                    // }}
                                    onClick={(e) => {
                                        setSelectedCategory(category);
                                    }}>
                                    {category}
                                </CategoryChip>
                            );
                        })}
                    </CategoryRow>
                </CategoryWrapper>

                {/* title */}
                <TextInput height={20}
                    value={title}
                    handler={(e) => {
                        setTitle(e.target.value);
                    }}></TextInput>

                {/* content */}
                <TextInput height={280}
                    value={content}
                    handler={(e) => {
                        setContent(e.target.value);
                    }}></TextInput>

                {/* button */}
                <Button title='글 작성하기'
                    onClick={writeHandler}></Button>

                &nbsp;&nbsp;&nbsp;

                <Button title='이전'
                    onClick={() => {
                        moveUrl('/blogs/index');
                    }}>
                </Button>
            </Container>
        </Wrapper>
    );
}

export default BlogWritePage;