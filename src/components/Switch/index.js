import React from "react";
import Switch from "react-switch";

const SwitchExample = (props) => {
    const [statusChange, setStatusChange] = React.useState([])
    const [changeStatus, setChangeStatus] = React.useState(false)
    const handleChange = (checked) => {
        if (checked) {
            setStatusChange([...props.activeUserId, props.userId])
            props.changeStatusFun({ id: props.userId, status: checked })
        } else {
            setStatusChange(props.activeUserId.filter(item => props.userId !== item))
            props.changeStatusFun({ id: props.userId, status: checked })
        }
        setChangeStatus(true)
    }
    return (
        <label>
            <Switch onChange={handleChange}
                checked={changeStatus ? statusChange.includes(props.userId) : props.active} />
        </label>
    );
}


export default SwitchExample