import { useState } from "react";
import api from "../../../api/axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #e0f2fe 0%, #f5f7fb 60%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const Card = styled.div`
    width: 100%;
    max-width: 440px;
    background: white;
    padding: 40px 36px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
`;

const IconCircle = styled.div`
    width: 56px;
    height: 56px;
    margin: 0 auto 16px;
    border-radius: 50%;
    background: #e8f1fd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 6px;
    color: #1e293b;
    font-size: 22px;
`;

const Subtitle = styled.p`
    text-align: center;
    margin-bottom: 28px;
    color: #94a3b8;
    font-size: 13px;
`;

const Field = styled.div`
    margin-bottom: 18px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 13px;
    color: #475569;
`;

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border: 1px solid ${(props) => (props.$error ? "#ef4444" : "#e2e8f0")};
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    transition: 0.2s;
    background: #f8fafc;

    &:focus {
        border-color: #4a90e2;
        background: white;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
    }

    &::placeholder {
        color: #cbd5e1;
    }
`;

const ErrorText = styled.span`
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #ef4444;
`;

const Button = styled.button`
    width: 100%;
    padding: 14px;
    margin-top: 8px;
    background: ${(props) => (props.disabled ? "#a8c8ef" : "#4a90e2")};
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
        background: ${(props) => (props.disabled ? "#a8c8ef" : "#357abd")};
    }

    &:active {
        transform: ${(props) => (props.disabled ? "none" : "scale(0.98)")};
    }
`;

const Spinner = styled.span`
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const ServerError = styled.div`
    margin-top: 16px;
    padding: 10px 14px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #b91c1c;
    font-size: 13px;
    border-radius: 8px;
    text-align: center;
`;



const ForcastPage = () => {

    const at = localStorage.getItem("at");

    const [base_time, setBase_time] = useState("");
    const [base_date, setBase_date] = useState("");
    const [beach_num, setBeach_num] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const moveUrl = useNavigate();

    const isNumeric = (value) => {
        if (value.length === 0) {
            return false;
        }
        for (let i = 0; i < value.length; i++) {
            const char = value[i];
            if (char < "0" || char > "9") return false;
        }
        return true;
    };

    const validate = () => {
        const next = {};

        if (base_time.length !== 4 || !isNumeric(base_time)) {
            next.base_time = "시간은 4자리 숫자(예: 1100)로 입력해주세요.";
        }

        if (base_date.length !== 8 || !isNumeric(base_date)) {
            next.base_date = "날짜는 8자리 숫자(예: 20260708)로 입력해주세요.";
        }

        if (!beach_num.trim()) {
            next.beach_num = "해변 번호를 입력해주세요.";
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const forcastHandler = async () => {

        setServerError("");
        if (!validate()) {
            return;
        }
        setLoading(true);

        await api.post("/forcast/fcst", {
            base_time, base_date, beach_num
        })
            .then(response => {

                // console.log(response.data);

                moveUrl("/forcast/list", {
                    state: response.data
                })

            })
            .catch(err => {

            })
    }

    return (
        <Wrapper>
            <Card>
                <IconCircle>🌊</IconCircle>
                <Title>해수욕장 예보 조회</Title>
                <Subtitle>날짜, 시간, 해변 정보를 입력하고 예보를 확인하세요</Subtitle>

                <Field>
                    <Label>예보 시간</Label>
                    <Input
                        type="text"
                        placeholder="예: 1100"
                        value={base_time}
                        $error={!!errors.base_time}
                        onChange={(e) => setBase_time(e.target.value)}
                    />
                    {errors.base_time && <ErrorText>{errors.base_time}</ErrorText>}
                </Field>

                <Field>
                    <Label>예보 날짜</Label>
                    <Input
                        type="text"
                        placeholder="예: 20260708"
                        value={base_date}
                        $error={!!errors.base_date}
                        onChange={(e) => setBase_date(e.target.value)}
                    />
                    {errors.base_date && <ErrorText>{errors.base_date}</ErrorText>}
                </Field>

                <Field>
                    <Label>해변 번호</Label>
                    <Input
                        type="text"
                        placeholder="예: GYEPO"
                        value={beach_num}
                        $error={!!errors.beach_num}
                        onChange={(e) => setBeach_num(e.target.value)}
                    />
                    {errors.beach_num && <ErrorText>{errors.beach_num}</ErrorText>}
                </Field>

                <Button onClick={forcastHandler} disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner /> 조회 중...
                        </>
                    ) : (
                        <>🌊 예보 정보 조회</>
                    )}
                </Button>

                {serverError && <ServerError>{serverError}</ServerError>}
            </Card>
        </Wrapper>
    );
}

export default ForcastPage; 
