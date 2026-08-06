
// 내가 한 코드

// import { useState } from "react";
// import styled from "styled-components";

// const SignUpPage = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//     // input 값이 변경될 때 실행
//     const handleChange = (event) => {
//         const { name, value } = event.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     // form 제출 시 실행
//     const handleSubmit = (event) => {
//         event.preventDefault();

//         console.log("회원가입 정보:", formData);
//     };

//     return (
//         <Container>
//             <Title>styled-component</Title>

//             <FormTitle>form</FormTitle>

//             <SignUpForm onSubmit={handleSubmit}>
//                 <FormGroup>
//                     <Label htmlFor="name">이름</Label>
//                     <Input
//                         id="name"
//                         name="name"
//                         type="text"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="이름을 입력하세요"
//                     />
//                 </FormGroup>

//                 <FormGroup>
//                     <Label htmlFor="email">이메일</Label>
//                     <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="이메일을 입력하세요"
//                     />
//                 </FormGroup>

//                 <FormGroup>
//                     <Label htmlFor="password">패스워드</Label>
//                     <Input
//                         id="password"
//                         name="password"
//                         type="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="패스워드를 입력하세요"
//                     />
//                 </FormGroup>

//                 <SubmitButton type="submit">
//                     회원가입
//                 </SubmitButton>
//             </SignUpForm>
//         </Container>
//     );
// };

// export default SignUpPage;

// // styled-components 영역

// const Container = styled.div`
//     width: 400px;
//     margin: 50px auto;
// `;

// const Title = styled.h2`
//     margin-bottom: 20px;
//     font-size: 24px;
// `;

// const FormTitle = styled.h3`
//     padding-bottom: 8px;
//     margin-bottom: 20px;
//     border-bottom: 2px dotted black;
// `;

// const SignUpForm = styled.form`
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
// `;

// const FormGroup = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
// `;

// const Label = styled.label`
//     font-size: 15px;
//     font-weight: bold;
// `;

// const Input = styled.input`
//     padding: 10px;
//     border: 1px solid #cccccc;
//     border-radius: 4px;
//     font-size: 14px;

//     &:focus {
//         outline: none;
//         border-color: #333333;
//     }
// `;

// const SubmitButton = styled.button`
//     padding: 12px;
//     border: none;
//     border-radius: 4px;
//     background-color: #333333;
//     color: white;
//     font-size: 15px;
//     cursor: pointer;

//     &:hover {
//         background-color: #555555;
//     }
// `;

///////////////////////////////////////////////////////

// 강사님 코드


import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../../api/axios';
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.1);
  width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0,123,255,0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const TextLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  margin: 10px 0 0;
  color: red;
  font-size: 14px;
  text-align: center;
`;

const SignUpPage = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    //기존값을 유지하면서 현재 입력된 필드에 대한 상태변화(업데이트)를 처리
    const keyHandler = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const moveUrl = useNavigate();

    const signUpHandler = async(e) => {
        e.preventDefault();
        console.log(`debug >>>> SignUpPage signUpHandler event`);
        // const data = {
        //     name : form.name,
        //     email : form.email,
        //     password : form.password
        // }
        const data = {...form};
        /*
        Q)
        - axios(/users) 통신을 통해서 json-server 데이터를 전달하고 저장
        - post, get, put-patch, delete 방식중 post방식을 사용
        - 가입 성공시(200) - SignInPage로 이동
        - 가입 실패 (400번대) - 현재 페이지에 에러메시지를 출력
        */

        // json-server version
        // 강사님 하신 퀴즈 코드
        await api.post('/users', data)
                .then(response => {
                    console.log(`debug >>>> axios request success`, response)
                    if(response.status === 201){
                        moveUrl('/users/signIn');
                    }
                })
                .catch(error =>{
                    console.log(`debug >>>> axios request error`, error)
                })
    }

    // 내가 한 퀴즈 코드 

    // const signUpHandler = async (e) => {
    //     e.preventDefault();

    //     console.log('debug >>>> SignUpPage signUpHandler event');

    //     // 이전 에러 메시지 초기화
    //     setErrorMessage('');

    //     // 간단한 입력값 검사
    //     if (
    //         form.name.trim() === '' ||
    //         form.email.trim() === '' ||
    //         form.password.trim() === ''
    //     ) {
    //         setErrorMessage('모든 항목을 입력해주세요.');
    //         return;
    //     }

    //     const data = {
    //         ...form
    //     };

    //     try {
    //         setIsLoading(true);

    //         // json-server의 users 데이터에 회원 정보 저장
    //         const response = await axios.post('/users', data);

    //         console.log('회원가입 성공:', response);
    //         console.log('저장된 회원 정보:', response.data);

    //         // 200번대 응답이면 로그인 페이지로 이동
    //         if (response.status >= 200 && response.status < 300) {
    //             navigate('/users/signIn');
    //         }

    //     } catch (error) {
    //         console.error('회원가입 실패:', error);

    //         // 서버에서 응답은 왔지만 400번대 또는 500번대인 경우
    //         if (error.response) {
    //             const status = error.response.status;

    //             if (status >= 400 && status < 500) {
    //                 setErrorMessage(
    //                     `회원가입 요청이 올바르지 않습니다. (${status})`
    //                 );
    //             } else {
    //                 setErrorMessage(
    //                     `서버에서 오류가 발생했습니다. (${status})`
    //                 );
    //             }

    //             // 서버가 실행되지 않았거나 연결할 수 없는 경우
    //         } else if (error.request) {
    //             setErrorMessage(
    //                 '서버에 연결할 수 없습니다. json-server를 확인해주세요.'
    //             );

    //             // 요청을 만드는 과정에서 오류가 난 경우
    //         } else {
    //             setErrorMessage('회원가입 처리 중 오류가 발생했습니다.');
    //         }

    //     } finally {
    //         setIsLoading(false);
    //     }
    // };


    return (
        <Container>
            <FormWrapper>
                <Title>회원가입</Title>
                <form onSubmit={signUpHandler}>
                    <Input type='text'
                        name='name'
                        placeholder="이름 입력하세요"
                        value={form.name}
                        onChange={keyHandler} />
                    <Input type='email'
                        name='email'
                        placeholder="이메일 입력하세요"
                        value={form.email}
                        onChange={keyHandler} />
                    <Input type='password'
                        name='password'
                        placeholder="패스워드 입력하세요"
                        value={form.password}
                        onChange={keyHandler} />
                    <Button type='submit'>가입하기</Button>
                </form>
                <TextLink to='/users/signIn'>이미회원이시면 로그인</TextLink>
            </FormWrapper>
        </Container>
    )
}

export default SignUpPage;