import Login from '../Login/Login';
const logout = () => {
    localStorage.setItem('authenticated', false);
    return (<Login />);
}

export default logout;