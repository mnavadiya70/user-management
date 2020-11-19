import { Route, Link } from 'react-router-dom';

import classes from '../../../../main.module.css';

const employee = (props) => {

    return (
        <tr>
            {
                props.cols.map(column => {
                    let data = [];
                    switch (column.label) {
                        case "Name":
                            if (column.checked) {
                                data.push(<><td>{props.Name}</td>
                                    <td></td></>)
                            }
                            break;
                        case "UserName":
                            if (column.checked) {
                                data.push(<><td>{props.UserName}</td>
                                    <td></td></>)
                            }
                            break;
                        case "Email":
                            if (column.checked) {
                                data.push(<><td>{props.Email}</td>
                                    <td></td></>)
                            }
                            break;
                        case "Address":
                            if (column.checked) {
                                data.push(<><td>{props.Address}</td>
                                    <td></td></>)
                            }
                            break;
                        case "Website":
                            if (column.checked) {
                                data.push(<><td>{props.Website}</td>
                                    <td></td></>)
                            }
                            break;
                        case "Company":
                            if (column.checked) {
                                data.push(<><td>{props.Company}</td>
                                    <td></td></>)
                            }
                            break;
                        default:
                            data = data.push(<td>
                                <Link to={`/create/${props.ID}`} className={classes.ButtonEdit}>Edit</Link>
                                <button className={classes.ButtonDelete} onClick={props.onClickDelete}>Delete</button>
                            </td>);
                            break;
                    }
                    return data
                })
                // }
                // <td>{props.Name}</td>
                // <td></td>
                // <td>{props.UserName}</td>
                // <td></td>
                // <td>{props.Email}</td>
                // <td></td>
                // <td>{props.Address}</td>
                // <td></td>
                // <td>{props.Website}</td>
                // <td></td>
                // <td>{props.Company}</td>
                // <td></td>

            }
            <td>
                <Link to={`/create/${props.ID}`} className={classes.ButtonEdit}>Edit</Link>&nbsp;&nbsp;
                <button className={classes.ButtonDelete} onClick={props.onClickDelete}>Delete</button>
            </td>
        </tr>
    );
}

export default employee;