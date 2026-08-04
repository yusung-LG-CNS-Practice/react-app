import axios from 'axios'

const endPoint = process.env.REACT_APP_BACKEND_ENDPOINT;

export const api = axios.create({
    //baseURL : "http://localhost:3000"
    baseURL : endPoint
});

export default api;