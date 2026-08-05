import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

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

    const signInHandler = (e, email, pswd) => {

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