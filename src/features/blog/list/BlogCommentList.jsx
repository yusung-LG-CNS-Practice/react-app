import styled from "styled-components";
import BlogCommentItem from "../item/BlogCommentItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    margin-top: 16px;
    gap: 16px;
`;

const BlogCommentList = ({ comments, handler }) => {
    return (
        <Wrapper>
            {
                comments.map((comment, idx) => {
                    return <BlogCommentItem key={idx}
                        comment={comment}
                        handler={handler}>
                    </BlogCommentItem>
                })
            }
        </Wrapper>
    );
}

export default BlogCommentList;