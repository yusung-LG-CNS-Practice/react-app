import GuestGreeting    from "./GuestGreeting";
import UserGreeting     from "./UserGreeting";

const Greeting = (props) => {
    {
        return props.flag ? <UserGreeting/> : <GuestGreeting/> // 컴포넌트에서 컴포넌트로 반환하기 가능
    }
}

export default Greeting