import classes from '../../main.module.css';
const input = (props) => {
    let inputEle = null;
    switch (props.fieldType) {
        case 'input':
            inputEle = <input maxlength={props.maxlength} className={classes.displayField} defaultChecked={props.defaultChecked} name={props.name} type={props.type} value={props.value} onChange={props.change}/>
            break;
        case 'td':
            inputEle = <td{...props} ></td>
            break;
        default:
            inputEle = <input {...props} />
            break;
    }
    return (
        <div>
            <label className={classes.displayLabel}>{props.label}</label>
            {inputEle}
        </div>
    );
}
export default input;