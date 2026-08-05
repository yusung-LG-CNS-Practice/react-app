// path variable 형태의 데이터를 얻어올 때
import { useParams } from "react-router-dom"

const ViewPage = () => {
    const {id} = useParams(); // <Route path = "/read/:id" element = {<ViewPage/>}></Route> => 동일한 이름(id)으로 구조분해 형식으로 받아야됨
    console.log(`debug >>>> ViewPage userParams id : ${id}`);
}

export default ViewPage;