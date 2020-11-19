import { Component } from 'react';
// import ColumnResizer from "react-column-resizer";
// import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';
import ReactTable from "react-table";
// import {
//     DragDropProvider,
//     TableColumnReordering,
//   } from '@devexpress/dx-react-grid-material-ui';

import axios from '../../../axios';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import Employee from '../../ManageEmployee/Employees/Employee/Employee';
import Unauthorized from '../../Unauthorized/Unauthorized';
import classes from '../../../main.module.css';
import ManageEmployee from '../ManageEmployee';
import Columns from '../../Columns/Columns';

class Employees extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            SearchUserTerm: '',
            cols: [
                { label: 'Name', checked: true },
                { label: 'UserName', checked: true },
                { label: 'Email', checked: true },
                { label: 'Address', checked: true },
                { label: 'Website', checked: true },
                { label: 'Company', checked: true }
            ],
            offset: 0,
            perPage: 5,
            currentPage: 0,
            sortDirection: 'asc'
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getData()
        });

    };

    getData() {
        axios.get('/users.json')
            .then(response => {
                debugger;
                const data = Object.keys(response.data)
                const employees = data.slice(this.state.offset, this.state.offset + Number(this.state.perPage));
                const updatedEmployees = employees.map(key => {
                    const employee = response.data[key]
                    return {
                        Key: key,
                        Name: employee.Name,
                        UserName: employee.UserName,
                        Email: employee.Email,
                        Address: employee.Address,
                        Website: employee.Website,
                        Company: employee.Company,
                    }
                });
                this.setState({ pageCount: Math.ceil(data.length / this.state.perPage), employees: updatedEmployees });

                //     const data = res.data;
                //   const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                //   const postData = slice.map(pd => <React.Fragment>
                //       <p>{pd.title}</p>
                //       <img src={pd.thumbnailUrl} alt=""/>
                //   </React.Fragment>)

                //   this.setState({
                //       pageCount: Math.ceil(data.length / this.state.perPage),

                //       postData
                //   })
            })
    }

    handleChangeCheck = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        const cols = [...this.state.cols];
        for (let i = 0; i < cols.length; i++) {
            if (cols[i].label === name) {
                cols[i].checked = value;
                break;
            }
        }
        this.setState({
            cols: cols
        });
    }

    deleteEmployeeHandler = (empIndex, empKey) => {
        //delete from database
        axios.delete('https://user-management-50e5d.firebaseio.com/users/' + empKey + '.json')

        //delete from state
        const employees = [...this.state.employees];
        employees.splice(empIndex, 1);
        this.setState({ employees: employees });
    }

    columnSortHandler = (columnName) => {
        let sortDir = this.state.sortDirection;
        const employees = [...this.state.employees];
        if (sortDir === 'asc') {
            if (columnName !== null) {
                employees.sort((a, b) => {
                    if (a[columnName] <= b[columnName]) {
                        return -1;
                    }
                    if (a[columnName] > b[columnName]) {
                        return 1;
                    }
                    return 0;
                });
            }
            this.state.sortDirection = 'desc';
        }
        if (sortDir === 'desc') {
            if (columnName !== null) {
                employees.sort((a, b) => {
                    if (a[columnName] >= b[columnName]) {
                        return -1;
                    }
                    if (a[columnName] < b[columnName]) {
                        return 1;
                    }
                    return 0;
                });
            }
            this.state.sortDirection = 'asc';
        }



        this.setState({ employees: employees });
    }

    inputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    inputChangeGetData = (event) => {
        debugger;
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        this.getData();
    }

    render() {
        const columns = [{
            Header: 'Website',
            accessor: 'Website',
        }
            , {
            Header: 'Name',
            accessor: 'Name',
        }

            , {
            Header: 'Username',
            accessor: 'Username',
        }
            , {
            Header: 'Company',
            accessor: 'Company',
        },
        {
            Header: 'Email',
            accessor: 'Email',
        },
        {
            Header: 'UserName',
            accessor: 'UserName',
        }
        ]
        const isAuthenticated = localStorage.getItem('authenticated') ? true : false;
        // const employees = [...this.state.employees];
        // const filteredEmployees = employees.filter(emp => emp.Name.toLowerCase().includes(this.state.SearchUserTerm.toLowerCase())
        //     || emp.UserName.toLowerCase().includes(this.state.SearchUserTerm.toLowerCase())
        //     || emp.Email.toLowerCase().includes(this.state.SearchUserTerm.toLowerCase())
        //     || emp.Website.toLowerCase().includes(this.state.SearchUserTerm.toLowerCase())
        //     || emp.Company.toLowerCase().includes(this.state.SearchUserTerm.toLowerCase()));
        return (
            isAuthenticated
                ? <Aux>
                    <ManageEmployee />
                    <CSVLink data={this.state.employees} filename="data.csv">Download me</CSVLink>
                    <h3 className={classes.header}>Users</h3>
                    <div>
                        <div style={{ float: 'left' }}>
                            <label>Search User : </label>
                            <input type="text" name="SearchUserTerm" onChange={(event) => this.inputChangeHandler(event)} />
                        </div>
                        <div style={{ float: 'right' }}>
                            <label>Records per page : </label>
                            <input type="number" name="perPage" onChange={(event) => this.inputChangeGetData(event)} />
                        </div>
                    </div>
                    <br />
                    <Columns cols={this.state.cols} change={this.handleChangeCheck} />
                    <br />
                    <br />
                    {/* <DragDropProvider /> */}
                    <ReactTable
                        data={this.state.employees}
                        columns={columns}
                        defaultPageSize={4}
                        showPagination={false}
                        noDataText={"No data"}
                    // defaultFilterMethod={(filter, row) =>
                    //     String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
                    />
                    {/* <table className={classes.Table}>
                        <thead>
                            <tr>
                                {
                                    this.state.cols.map(col => {
                                        return (col.checked ? <>
                                            <td className={classes.StyleHeader} onClick={() => this.columnSortHandler(col.label)}>{col.label}</td>
                                            <ColumnResizer className="columnResizer" />
                                        </> : null)
                                    })
                                } */}
                    {/* <td className={classes.StyleHeader} onClick={() => this.columnSortHandler('Name')}>Name</td>
                                <ColumnResizer className="columnResizer" />
                                <td className={classes.StyleHeader} onClick={() => this.columnSortHandler('UserName')}>UserName</td>
                                <ColumnResizer className="columnResizer" />
                                <td className={classes.StyleHeader} onClick={() => this.columnSortHandler('Email')}>Email</td>
                                <ColumnResizer className="columnResizer" />
                                <td className={classes.StyleHeader} onClick={() => this.columnSortHandler('Address')}>Address</td>
                                <ColumnResizer className="columnResizer" />
                                <td className={classes.StyleHeader} onClick={() => this.columnSortHandler('Website')}>Website</td>
                                <ColumnResizer className="columnResizer" />
                                <td className={classes.StyleHeader} onClick={() => this.columnSortHandler('Company')}>Company Name</td>
                                <ColumnResizer className="columnResizer" /> */}
                    {/* <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredEmployees.map((emp, index) => {
                                    return <Employee
                                        Name={emp.Name}
                                        UserName={emp.UserName}
                                        Email={emp.Email}
                                        Address={emp.Address}
                                        Website={emp.Website}
                                        Company={emp.Company}
                                        key={emp.Key}
                                        ID={emp.Key}
                                        cols={this.state.cols}
                                        onClickDelete={() => this.deleteEmployeeHandler(index, emp.Key)} />
                                })
                            }
                        </tbody>
                    </table> */}
                    {/* <TableColumnReordering /> */}
                    {/* <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={classes.pagination}
                        subContainerClassName={"pages " + classes.pagination}
                        activeClassName={"active"} /> */}
                </Aux>
                : <Unauthorized />
        );
    }
}

export default Employees;