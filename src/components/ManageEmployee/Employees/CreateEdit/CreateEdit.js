import { Component } from 'react';
import axios from '../../../../axios';
import { Link } from 'react-router-dom';

import Unauthorized from '../../../Unauthorized/Unauthorized';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import Input from '../../../Input/Input';
import classes from '../../../../main.module.css';

const employee = [
    { label: 'Name' },
    { label: 'UserName' },
    { label: 'Email' },
    { label: 'Address' },
    { label: 'Website' },
    { label: 'Company' }
]

class Create extends Component {
    constructor(props) {
        super(props);

        if (this.props.match.params.id !== null) {
            axios.get('/users/' + this.props.match.params.id + '.json')
                .then(response => {
                    if (response.data !== null) {
                        this.setState({
                            Key: this.props.match.params.id,
                            Name: response.data.Name,
                            UserName: response.data.UserName,
                            Email: response.data.Email,
                            Company: response.data.Company,
                            Address: response.data.Address,
                            Website: response.data.Website,
                        });
                    }
                })
        }
    }
    state = {
        Name: '',
        UserName: '',
        Email: '',
        Address: '',
        Website: '',
        CompanyName: '',
        Key: ''
    }

    inputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    addEmployee = () => {
        const employee = {
            Name: this.state.Name,
            UserName: this.state.UserName,
            Email: this.state.Email,
            Website: this.state.Website,
            Company: this.state.Company,
            Address: this.state.Address
        }
        if (this.state.Key !== null && this.state.Key !== "" && this.state.Key !== undefined) {
            axios.put('/users/' + this.state.Key + '.json', employee)
                .then(response => {
                    // alert('User edited');
                    this.props.history.push("/manage-employees");
                })
        }
        else {
            axios.post('/users.json', employee)
                .then(response => {
                    // alert('User added');
                    this.props.history.push("/manage-employees");
                })
        }

    }

    render() {
        const isAuthenticated = localStorage.getItem('authenticated');
        return (
            isAuthenticated
                ? <Aux>
                    <h4 className={classes.header}>Add Employee Details</h4>
                    {
                        employee.map(emp => {
                            return (
                                <Input key={emp.label} label={emp.label} fieldType="input" name={emp.label} type="text" emp={emp} value={this.state[emp.label]} change={this.inputChangeHandler}/>
                                // <div key={emp.label}>
                                //     <label className={classes.displayLabel}>{emp.label}</label>
                                //     <input className={classes.displayField} type='text' name={emp.label} value={this.state[emp.label]} onChange={this.inputChangeHandler} />
                                // </div>
                            )
                        })
                    }
                    <button className={classes.ButtonSave} onClick={this.addEmployee}>Save</button>&nbsp;&nbsp;
                    <Link to="/manage-employees" style={{textDecoration: 'none'}}>
                        <button className={classes.ButtonCancel}>Cancel</button>
                    </Link>
                </Aux>
                : <Unauthorized />
        );
    }
}

export default Create;