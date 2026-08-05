import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const EventPage = () => {
    /*
    변수?
    - scope : 전역,지역 
    - state
    상태관리가 안되는 변수 사용한 경우
    const data = {
        id : 'yusung', password: '1234'
    }
    let id = data.id;
    let password = data.password;

    - state가 안되면 script와 ui가 싱크가 안맞는다. 즉, 양방향 통신이 안된다.
    - 상태 관리를 위해선 state를 사용해야 한다.
    
    상태관리가 되는 경우
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    setId(data.id), setPassword(data.password);
    */

    // 사용자의 입력값과 스크립트의 변수를 동기화를 위한 상태관리
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState(''); //이 두개는 전역 scope이다.

    const emailHandler = (e) => {
        setEmail(e.target.value);
        //console.log(`debug >>>> emailHandler email : `, email);
    }

    const pswdHandler = (e) => {
        setPswd(e.target.value);
        //console.log(`debug >>>> emailHandler email : `, pswd);
    }

    // transition을 위한 HOOK
    const moveUrl = useNavigate();

    const signInHandler = async(e, email, pswd) => {
        e.preventDefault(); // => 버블링을 막는 함수

        await api.get(`/users?email=${email}&pwsd=${pswd}`)
        .then(response => {
            console.log(`debug >>>> response : `, response);

            // react status를 사용하지 않는 경우 아래처럼 해도 됨
            const ary = response.data;
            if(ary.length > 0){
                const user = ary[0];
                localStorage.setItem('userName', user.name);
                moveUrl('/success');
            }else{
                moveUrl('/error'); // /success나 error 컴포넌트로 이동 html 아님
            }
            // if(response.status === 200){
            //     // status가 200번대일때 인증된 사용자 정보 관리
            //     // sessionStorage, localStorage
            //     // 인증 - 신원확인, 인가 - 특정 url에 접근 할 수 있는 권한
            //     // 인증이 되면 token이 발행 => Json Web Token(JWT) - token(header)
            //     // response.headers.get('Authorization');
            //     // localStorage.setItem('token', 'token-xxxxxxxxx');
            //     // react component transition
            // }
            // else{

            // }
        })
        .catch(err => {
            console.log(`debug >>>> error : `, err);
        })

    }

    useEffect(() => {
        console.log(`debug >>>> emailHandler email : `, email);
        console.log(`debug >>>> emailHandler password : `, pswd);
    })

    return (
        <div className='container'>
            <div class="mb-3 mt-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => emailHandler(e)} />
            </div>
            <div class="mb-3">
                <label for="pwd" class="form-label">Password:</label>
                <input type="password"
                    class="form-control"
                    id="pwd"
                    placeholder="Enter password"
                    name="pswd"
                    value={pswd}
                    onChange={(e) => pswdHandler(e)} />
            </div>
            <div class="form-check mb-3">
                <label class="form-check-label">
                    <input class="form-check-input"
                        type="checkbox"
                        name="remember" /> Remember me
                </label>
            </div>
            <Button variant='primary'
                    onClick={(e) => signInHandler(e, email, pswd)}>SignIn</Button>
        </div>
    );
}

export default EventPage;