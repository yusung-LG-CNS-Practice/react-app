import {useState} from "react";
import Greeting from "../../components/rendering/Greeting";
import LogoutButton from "../../components/rendering/LogoutButton";
import LoginButton from "../../components/rendering/LoginButton";


const RenderingPage = () => {
    //이 영역은 이 두가지 영역들이 꼭 필요함 (script, UI)

    //script
    const [flag, setFlag] = useState(false);

    //UI
    return(
        <div>
            <Greeting flag = {flag}></Greeting>
            {
                flag ? 
                    <LogoutButton isLogin = {setFlag}/>
                :
                    ''
                    //<LoginButton isLogin = {setFlag}/>
            }
        </div>
    );
}

export default RenderingPage;