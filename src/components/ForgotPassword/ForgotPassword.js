const forgorPassword = (props) => {
    return (
        props.show ? <div>
            <label>New Password</label>
            <input type="password" name="Password" onChange={props.change} />
        </div>
            : null
    );
}

export default forgorPassword;