import React from 'react'
import "./adminChat.css"
import { useDispatch } from 'react-redux'
import { getAllUserchatAction, sendMessageToUserAction } from '../../Redux/action'
import { IoMdRefreshCircle } from "react-icons/io";
const UserAdminCommit = (props) => {
    const [newMessage, setNewMessge] = React.useState()
    const [allMessage, setAllMessage] = React.useState()
    console.log("chatchat", allMessage)

    const dispatch = useDispatch()
    const personalData = props && props.personalInformation && props.personalInformation.length > 0 && props.personalInformation[0] || props.personalInformation;
    const fullName = personalData && personalData.personal?.fullName ? personalData.personal?.fullName : null;
    // const id = localStorage.getItem("id")
    const id = props?.userId


    React.useEffect(() => {
        userIds(id);
    }, [props]);

    const userIds = async (id) => {

        console.log("userIdsss", id)
        dispatch(getAllUserchatAction(id)).
            then((data) => {
                setAllMessage(data)
            })
    }

    const sendMessageFun = () => {
        const adminId = localStorage.getItem("adminId")
        // const userId = localStorage.getItem("id")
        const userId = props?.userId
        dispatch(sendMessageToUserAction(newMessage, userId, adminId))
            .then(() => {
                // const id = localStorage.getItem("id")
                const id = props?.userId
                // console.log(id);
                dispatch(getAllUserchatAction(id)).
                    then((data) => {
                        setAllMessage(data)
                        setNewMessge(" ")
                    })
            })
    }
    const lodingCommit = () => {
        // const id = localStorage.getItem("id")
        const id = props?.userId
        // console.log(id);
        dispatch(getAllUserchatAction(id)).
            then((data) => {
                setAllMessage(data)
                setNewMessge(" ")
            })
    }
    return (
        <>
            <h3 className="text-green font-weight-bold  text-center" >chat with user</h3>
            <button className="chat-loding btn" onClick={() => lodingCommit()}><IoMdRefreshCircle size={40} /></button>
            <div className="container-fluid h-100">

                <div className="row justify-content-center h-100">
                    <div className="col-md-10 col-xl-10 chat">
                        <div className="card Chat">
                            <div className="card-header msg_head">
                                <div className="d-flex bd-highlight">
                                    <div className="img_cont">
                                        <img src={personalData && personalData?.personal?.avtar ? personalData?.personal?.avtar :
                                            "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"} className="rounded-circle user_img" />
                                        <span className="online_icon"></span>
                                    </div>
                                    <div className="user_info">
                                        <span style={{ color: "black" }}>{fullName}</span>

                                    </div>
                                </div>
                            </div>
                            <div className="card-body msg_card_body">
                                {
                                    allMessage && allMessage.length && allMessage.map((item, index) => {
                                        console.log(allMessage, "allMessageallMessageallMessage");
                                        if (!item.adminId) {
                                            const date = new Date(item.createdAt);
                                            var date1 = date.toLocaleDateString() + ' ' + date.toTimeString().substring
                                                (0, date.toTimeString().indexOf("GMT"));
                                            return (
                                                <div className="d-flex justify-content-start mb-4">
                                                    <div className="img_cont_msg">
                                                        <img src={personalData && personalData?.personal?.avtar ? personalData?.personal?.avtar : "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"} className="rounded-circle user_img_msg" />
                                                    </div>
                                                    <div className="msg_cotainer">
                                                        {item.message}
                                                        <span className="msg_time_send" style={{ color: "black", paddingTop: "67px" }}>{date1}</span>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            const date = new Date(item.createdAt);
                                            var date1 = date.toLocaleDateString() + ' ' + date.toTimeString().substring
                                                (0, date.toTimeString().indexOf("GMT"));
                                            // console.log(date1);
                                            return (
                                                <div className="d-flex justify-content-end mb-4">
                                                    <div className="msg_cotainer_send">
                                                        {item.message}
                                                        <span className="msg_time_send" style={{ color: "black", paddingTop: "67px" }}>{date1}</span>
                                                    </div>
                                                    <div className="img_cont_msg">
                                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                                                    </div>
                                                </div>
                                            )
                                        }

                                    })
                                }
                            </div>
                            <div className="card-footer">
                                <div className="input-group">
                                    <div className="input-group-append">
                                        <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                    </div>
                                    <textarea value={newMessage} className="form-control type_msg" placeholder="Type your message..."
                                        onChange={(e) => setNewMessge(e.target.value)}
                                    ></textarea>
                                    <div className="input-group-append">
                                        <span onClick={() => sendMessageFun()} className="input-group-text send_btn">send</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default UserAdminCommit
