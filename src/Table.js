import React from "react";
import ColumnResizer from "react-column-resizer";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, useColumnOrder } from 'react-table'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)
    const currentColOrder = React.useRef();
    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle) => ({
    ...draggableStyle,
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    ...(!isDragging && { transform: "translate(0,0)" }),
    ...(isDropAnimating && { transitionDuration: "0.001s" })

    // styles we need to apply on draggables
});

function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        flatColumns,
        setColumnOrder,
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useColumnOrder
    )
    const currentColOrder = React.useRef();
    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (

                        <DragDropContext
                            onDragStart={() => {
                                currentColOrder.current = flatColumns.map(o => o.id);
                            }}
                            onDragUpdate={(dragUpdateObj, b) => {
                                // console.log("onDragUpdate", dragUpdateObj, b);

                                const colOrder = [...currentColOrder.current];
                                const sIndex = dragUpdateObj.source.index;
                                const dIndex =
                                    dragUpdateObj.destination && dragUpdateObj.destination.index;

                                if (typeof sIndex === "number" && typeof dIndex === "number") {
                                    colOrder.splice(sIndex, 1);
                                    colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
                                    setColumnOrder(colOrder);

                                    // console.log(
                                    //   "onDragUpdate",
                                    //   dragUpdateObj.destination.index,
                                    //   dragUpdateObj.source.index
                                    // );
                                    // console.log(temp);
                                }
                            }}
                        >
                            <Droppable droppableId="droppable" direction="horizontal">
                                {(droppableProvided, snapshot) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} ref={droppableProvided.innerRef} >
                                        {headerGroup.headers.map((column, index) => (
                                            <Draggable
                                                key={column.id}
                                                draggableId={column.id}
                                                index={index}
                                                isDragDisabled={column.accessor}
                                            >
                                                {(provided, snapshot) => {
                                                    // console.log(column.getHeaderProps());

                                                    // const {
                                                    //   style,
                                                    //   ...extraProps
                                                    // } = column.getHeaderProps();

                                                    // console.log(style, extraProps);

                                                    return (
                                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                            <div
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                // {...extraProps}
                                                                ref={provided.innerRef}
                                                                style={{
                                                                    ...getItemStyle(
                                                                        snapshot,
                                                                        provided.draggableProps.style
                                                                    )
                                                                    // ...style
                                                                }}
                                                            >
                                                                {column.canFilter ? column.render('Filter') : null}
                                                                {column.render("Header")}
                                                                <span>
                                                                    {column.isSorted
                                                                        ? column.isSortedDesc
                                                                            ? ' '
                                                                            : ' '
                                                                        : ''}
                                                                </span>
                                                            </div>
                                                            {/* {column.canResize && (
                                                <div
                                                    {...column.getResizerProps()}
                                                    className={`resizer ${
                                                        column.isResizing ? 'isResizing' : ''
                                                        }`}
                                                />
                                            )} */}

                                                        </th>
                                                    );
                                                }}
                                            </Draggable>
                                        ))}
                                        {/* {droppableProvided.placeholder} */}
                                    </tr>
                                )}
                            </Droppable>
                        </DragDropContext>

                    ))}
                    {/* ))} */}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (<><td {...cell.getCellProps()}>{cell.render('Cell')}</td><td></td></>)
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            {/* <div>Showing the first 20 results of {rows.length} rows</div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div> */}
        </div>
    )
}

function FilterTableComponent() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'visits',
                accessor: 'visits',
            },
            {
                Header: 'progress',
                accessor: 'progress'
            },
            {
                Header: 'status',
                accessor: 'status'
            },
            {
                Header: 'age',
                accessor: 'age'
            },
            {
                Header: 'lastName',
                accessor: 'lastName'
            },
            {
                Header: 'firstName',
                accessor: 'firstName'
            },
        ]
    )

    // let data = [];
    // Axios.get('https://user-management-50e5d.firebaseio.com/users.json')
    //     .then(response => {
    //         const employees = Object.keys(response.data)
    //         const testdata = employees.map(key => {
    //             const employee = response.data[key]
    //             return {
    //                 // Key: key,
    //                 Name: employee.Name,
    //                 UserName: employee.UserName,
    //                 Email: employee.Email,
    //                 Address: employee.Address,
    //                 Website: employee.Website,
    //                 Company: employee.Company,
    //             }
    //         });
    //         data = testdata;
    //     })
    const data = [
        {
            "firstName": "horn-od926",
            "lastName": "selection-gsykp",
            "age": 22,
            "visits": 20,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "heart-nff6w",
            "lastName": "information-nyp92",
            "age": 16,
            "visits": 98,
            "progress": 40,
            "status": "complicated"
        },
        {
            "firstName": "minute-yri12",
            "lastName": "fairies-iutct",
            "age": 7,
            "visits": 77,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "degree-jx4h0",
            "lastName": "man-u2y40",
            "age": 27,
            "visits": 54,
            "progress": 92,
            "status": "relationship"
        }
    ]

    return (
        <Table columns={columns} data={data} />
    )
}

export default FilterTableComponent;