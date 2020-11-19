import { BrowserRouter, Route } from 'react-router-dom';

import classes from './main.module.css';
import Login from './components/Login/Login';
import Employees from './components/ManageEmployee/Employees/Employees';
// import ManageEmployee from './components/ManageEmployee/ManageEmployee';
import CreateEdit from './components/ManageEmployee/Employees/CreateEdit/CreateEdit';
import Application from './Application'

function App() {
  return (
    <BrowserRouter>
      <div className={classes.App}>
      <Application/>
        {/* <Route path="/login" exact component={Login}/>
        <Route path="/" exact component={Login}/>
        <Route path="/manage-employees" exact component={Employees}/>
        <Route path="/create/:id" exact component={CreateEdit} />
        <Route path="/create" exact component={CreateEdit} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
