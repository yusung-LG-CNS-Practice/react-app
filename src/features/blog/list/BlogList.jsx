import styled from "styled-components";
import BlogItem from "../item/BlogItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    margin-top: 16px;
    gap: 16px;
`;

// pros 없어도 상관없음
const BlogList = (props) => {
    return (
        <Wrapper>
            {props.ary && props.ary.length > 0 ?
                props.ary.map((blog, idx) => {
                    return <BlogItem key={idx}
                        blog={blog} />
                })
                :
                '등록된 글이 없습니다.'
            }
        </Wrapper>
    );
}

export default BlogList;