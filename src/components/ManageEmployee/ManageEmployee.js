import {Component} from 'react';
import { Link } from 'react-router-dom';

// import Employees from '../ManageEmployee/Employees/Employees';
// import CreateEdit from '../ManageEmployee/Employees/CreateEdit/CreateEdit';
// import Aux from '../../hoc/Auxiliary/Auxiliary';
// import Unauthorized from '../Unauthorized/Unauthorized';
import classes from '../../main.module.css';
// import Login from '../Login/Login';

class ManageEmployee extends Component {
    logoutHandler = () => {
        localStorage.setItem('authenticated', false);
    }
    render() {
        return (
            <div className={classes.ManageEmp}>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/manage-employees">List of Employees</Link></li>
                            <li><Link to="/create">Add Employee</Link></li>
                        </ul>
                    </nav>

                    <Link to="/login"><button className={classes.btnLogout} onClick={this.logoutHandler}>Logout</button></Link>
                </header>
            </div>
        );
    }

}

export default ManageEmployee;