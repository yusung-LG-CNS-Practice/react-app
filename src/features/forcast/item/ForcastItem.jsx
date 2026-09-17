import styled from "styled-components";

const Card = styled.div`
    background: white;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
    border: 1px solid #eef2f7;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: 0.2s;

    &:hover {
        box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
        transform: translateY(-2px);
    }
`;

const IconCircle = styled.div`
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #eaf2fd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
`;

const TextArea = styled.div`
    flex: 1;
    min-width: 0;
`;

const CategoryName = styled.div`
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Value = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
`;

// category 코드별 아이콘 매핑 (없는 코드는 기본 아이콘 사용)
const categoryIcons = {
    TMP: "🌡️",
    WTEMP: "🌊",
    WAV: "🌀",
    WSD: "💨",
    WDIR: "🧭",
    REH: "💧",
    POP: "☔",
    SKY: "☁️",
    PTY: "🌧️",
};

const getIcon = (category) => categoryIcons[category] ?? "📊";

const ForcastItem = ({ item }) => {
    return (
        <Card>
            <IconCircle>{getIcon(item.category)}</IconCircle>
            <TextArea>
                <CategoryName>{item.categoryName}</CategoryName>
                <Value>{item.fcstValue}</Value>
            </TextArea>
        </Card>
    );
}

export default ForcastItem;
