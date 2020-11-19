import { Component } from 'react';

import Input from '../Input/Input';
import classes from '../../main.module.css';
// import ManageEmployee from '../ManageEmployee/ManageEmployee';
// import Employees from '../ManageEmployee/Employees/Employees';
// import Aux from '../../hoc/Auxiliary/Auxiliary';

class Login extends Component {
    state = {
        UserName: '',
        Password: '',
        isLoggedIn: false,
        show: false,
    };


    OnInputHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    showForgotPassword = () => {
        this.setState({
            show: true
        });
    }

    loginHandler = () => {
        if (this.state.UserName === '' || this.state.Password === '') {
            alert("Please enter username or password");
        }
        else if (this.state.UserName !== 'mansi' || this.state.Password !== 'tatva123@') {
            alert("Invalid username or passwprd");
        }
        else {
            localStorage.setItem('authentiated', true);
            this.props.history.push("/manage-employees");
        }
    }

    passwordChangeHandler = () => {
        const newPass = this.state.Password;
        if (newPass.length !== 8) {
            alert('New password must be at least 8 characters long');
        }
        else {
            this.props.history.push("/manage-employees");
        }
    }

    render() {
        return (
            <div style={{ float: 'left' }}>

                {/* <div>
                    <label>UserName</label>
                    <input type="text" name="UserName" onChange={this.OnInputHandler} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="Password" onChange={this.OnInputHandler} />
                </div> */}


                {
                    this.state.show ?
                        <>
                            <Input label="New Password" name="Password" maxlength="8" fieldType="input" type="password" change={this.OnInputHandler} />
                            <button onClick={this.passwordChangeHandler}>Change password</button>
                        </>
                        : <><h4>User login form</h4>
                            <Input label="UserName" name="UserName" fieldType="input" type="text" change={this.OnInputHandler} />
                            <Input label="Password" name="Password" fieldType="input" type="password" change={this.OnInputHandler} />
                            <button className={classes.btnLogin} onClick={this.loginHandler}>Login</button>
                            <button onClick={this.showForgotPassword}>Forgot Password?</button></>
                }

            </div>
        );
    }
}

export default Login;