import Input from '../Input/Input';
const columns = (props) => {
    return (
        <div style={{float: 'left', clear: 'left'}}>
        <span><b>Show/Hide column here</b></span>
            {
                props.cols.map(col => {
                    return (
                        <Input key={col.label} label={col.label} defaultChecked={col.checked} name={col.label} fieldType="input" type="checkbox" change={props.change}/>
                        // <div key={col.label}>
                        //     <label>{col.label}</label>
                        //     <input type="checkbox" name={col.label} defaultChecked={col.checked} onChange={props.change}/>&nbsp;&nbsp;
                        // </div>
                    )
                })
            }
        </div>
    )
}

export default columns;