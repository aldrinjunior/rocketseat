import axios from 'axios';
//criar a const api para informar a base url
const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export default api;