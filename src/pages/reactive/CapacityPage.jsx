import Button from '../../components/styled/Button';
import { useState, useEffect } from 'react'; //=> useState, useEffect는 hook 이라고 함

const CapacityPage = () => {

    //script
    console.log('debug >>>> CapacityPage load event');

    //고민?
    // 해당 변수는 양방향 실시간 소통이 이루어져야한다...어떻게?
    // let cnt = 0;
    // solution -> hook state : useState()

    const capacity = 10;

    let [cnt, setCnt] = useState(0); // => 0으로 초기화
    let [full, setFull] = useState(false);
    let [empty, setEmpty] = useState(false);

    const upCntHandler = (e) => {
        // cnt = cnt + 1;
        setCnt(cnt => cnt + 1);
        // console.log(`debug >>>> upCntHandler ${cnt}`);
    }

    const downCntHandler = (e) => {
        // cnt = cnt - 1;
        setCnt(cnt => cnt - 1);
        //console.log(`debug >>>> downCntHandler ${cnt}`);
    }

    // side effect 으로 렌더링 이후 작업이 필요한 경우?
    // useEffect() 함수를 이용해서 작업할 수 있다.
    // useEffect() 함수를 이용해서 생명주기 관리가 가능하다.

    // useEffect(() => {
    //     console.log(`debug >>>> side effect render cnt : ${cnt}`);
    // }, );

    useEffect(() => {
        console.log(`debug >>>> CapcityPage life cycle mount, unmount`);
        console.log(`debug >>>> side effect render cnt : ${cnt}`);
        setFull(cnt >= capacity);
        setEmpty(cnt <= 0);
    }, [cnt]);
    //UI
    /*
    -입장인원 (10명)
    -입장, 퇴장 버튼을 만들어서
    -입장버튼을 클릭하면 인원수가 증가되고 입장인원이 꽉차면 버튼을 비활성화
    -퇴장버튼을 클릭하면 인원수가 감소되고 인원이 0이되면 버튼을 비활성화
    -오늘은 입장 퇴장 버튼을 클릭했을때 입장 인원이랑 콘솔 로그 cnt랑 싱크 맞추기까지만
    -위에 것까지 해결함
    */
    return (
        <div>
            <p>입장인원 : {cnt} </p>
            <Button title = "입장" 
                    //onClick = {upCntHandler} => 함수 호출시 매개변수 전달이 필요 없을때
                    onClick = {(e) => upCntHandler()}
                    disabled = {full}/>
            <Button title = "퇴장" 
                    onClick = {(e) => downCntHandler()}
                    disabled = {empty}/>
        </div>

    );
}

export default CapacityPage;