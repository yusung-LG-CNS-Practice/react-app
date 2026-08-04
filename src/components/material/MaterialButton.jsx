import Button from '@mui/material/Button';

// npm install @@mui/material @emotion/react @emotion/styled => react 전용
const MaterialButton = (props) =>{
    return(
        <Button onClick={props.onClick}>{props.title}</Button>
    );
}

export default MaterialButton;