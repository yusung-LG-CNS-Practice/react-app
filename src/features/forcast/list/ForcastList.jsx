import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ForcastItem from "../item/ForcastItem";

const Wrapper = styled.div`
    padding: 40px;
    background: #f5f7fa;
    min-height: 100vh;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 30px;
`;

const Title = styled.h2`
    margin: 0;
    color: #1e293b;
`;

const HomeButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #4a90e2;
    background: white;
    color: #4a90e2;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background: #4a90e2;
        color: white;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
`;

const Empty = styled.div`
    text-align: center;
    color: #94a3b8;
    margin-top: 100px;
    font-size: 15px;
`;

const ForcastList = () => {

    const at = localStorage.getItem("at");
    const location = useLocation();
    console.log(`debug >>>> state date : ${location.state}`);

    const moveUrl = useNavigate();

    const forcastData = Array.isArray(location.state) ? location.state : [];

    const moveHandler = () => {
        moveUrl("/blogs/index");
    }

    return (
        <Wrapper>
            <Header>
                <Title>해수욕장 예보 정보</Title>
                <HomeButton onClick={moveHandler}>메인페이지</HomeButton>
            </Header>
            {
                forcastData.length === 0 ? (
                    <Empty>조회된 예보 정보가 없습니다.</Empty>
                )
                    :
                    (
                        <Grid>
                            {
                                forcastData.map((item, idx) => {
                                    return <ForcastItem
                                        key={idx}
                                        item={item} />
                                })
                            }
                        </Grid>
                    )
            }
        </Wrapper>
    );
}

export default ForcastList;
