import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
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

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
  margin: 100px auto;
`;

const WelcomeMessage = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
`;

const BlogReadPage = () => {
    const { blogId } = useParams();
    const user = localStorage.getItem('user');
    const [blog, setBlog] = useState({});

    console.log(`debug >>>> BlogReadPage rendering ${blogId}, ${user}`)

    /*
    Q)
    - component mount 일때 blogId 해당하는 객체를 얻어올 수 있어야 함
    - api .get('/blogs/blogId') : blog => 이러면 해당 객체 하나만 가져옴
    - blog는 reactive state 상태로 관리 : useState();
    */

    // 내가 한 퀴즈 코드
    // const loadData = () => {
    //     api.get(`/blogs/${blogId}`)
    //         .then(response => {
    //             console.log('debug >>> blog read success', response.data);
    //             setBlog(response.data);
    //         })
    //         .catch(error => {
    //             console.log('debug >>> blog read error', error);
    //         });
    // }

    // useEffect(() => {
    //     loadData();
    // }, []);

    // 강사님이 한 코드
    const loadData = async () => {
        // json-server : 댓글이 없는 상황
        /*
        - axios -get(blogs?key=value&key=value)
        -axios - get(blogs,{
            params : {}
        })
        - axios - get(blogs/&{}/&{}/&{}) 
        - sql : select * from table where id = ? ; ->필터링
        */

        const id = blogId
        await api.get(`/blogs/${id}`) //서버 통신 엔드 포인트
            .then(response => {
                console.log('debug >>> axios request success', response);
                if (response.status === 200) {
                    setBlog(response.data);
                }
            })
            .catch(error => {
                console.log('debug >>> axios request error', error);
            })

        // json-server : 댓글이 있는 상황
        // - 1:N 관계
        // - axios - get(blogs/&{}?_embed=comments)
    }
    useEffect(() => {
        loadData();
    }, []);


    return (
        <Wrapper>
            {!blog.id && <Spinner></Spinner>}
            {blog.id &&
                <Container>
                    {user && <WelcomeMessage>{user}님 환영합니다.</WelcomeMessage>}

                    {/* 내가 한 퀴즈 코드 */}
                    {/* <PostContainer>
                        <TitleText>{blog.title}</TitleText>
                        <ContentText>{blog.content}</ContentText>
                    </PostContainer> */}
                </Container>
            }
        </Wrapper>
    );
}

export default BlogReadPage;