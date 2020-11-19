import axios from 'axios';
const instance = axios.create({
    baseURL : 'https://user-management-50e5d.firebaseio.com'
})

export default instance;