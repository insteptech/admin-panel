import React from 'react'
import PersonalInformation from '../commanTables/UserPersonalInformation'
import DocumentsSubmitted from '../commanTables/DocumentsSubmitted'
import UserActivity from '../commanTables/UserActivity'
import { useSelector, useDispatch } from 'react-redux'
import "./style.css"
import LeftMenu from '../LeftMenu/leftmenu'
import Header from '../LeftMenu/header'
import { getUserByIdAction, getUserByPhoneAction, realTimeLiveLocationQuery } from '../../Redux/action'
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import verified from '../../verified.png';
import Rejected from '../../rejected.png';
import { Redirect, withRouter } from 'react-router';
import UserAdminCommit from '../commanTables/UserAdminCommit'
import loaderImg from '../../loading.gif';
import request from "request"
import moment from 'moment';

const UserDetail = (props) => {
    const [loader, setLoader] = React.useState(false);
    const [liveLocationData, setLiveLocationData] = React.useState([]);
    const [getRequesterAddress, setGetRequesterAddress] = React.useState()
    const [showRequesterAddress, setshowRequesterAddress] = React.useState();
    const dispatch = useDispatch()
    const userById = useSelector(state => state.user.userById)
    const createdAt = userById && userById[0] && userById[0].user && userById[0].user[0] && userById[0].user[0].createdAt ? userById[0].user[0].createdAt : "null"
    const document = userById && userById[0] && userById[0].idProof ? userById[0].idProof : [];
    // console.log(userById, "idProofidProofidProofidProofidProofidProofidProofidProofidProof");
    const [loder, setLoder] = React.useState(true)
    const user = userById && userById.length > 0 && userById[0] && userById[0].user;
    const Active = user && user[0] && user[0].Active
    const Verified = user && user[0] && user[0].Verified
    const Location1 = userById && userById.length > 0 && userById[0].helper && userById[0].helper;
    const Location = Location1 ? Location1 : {}
    const idProof = userById && userById[0] && userById[0].idProof ? userById[0].idProof : []

    const emergencycontact1 = userById && userById[0] && userById[0].emergencyContact ? userById[0].emergencyContact : []
    const helprequest1 = userById && userById.length > 0 && userById[0].helprequest && userById[0].helprequest;
    const helprequest = helprequest1 ? helprequest1 : []
    const helper = userById && userById[0] && userById[0].helper ? userById[0].helper : []
    const pageNumber = props.match.params.pageNumber;
    const sumitDoc = idProof && idProof.length > 0 && idProof[0] && (idProof[0].url || idProof[1].url || idProof[2].url || idProof[3].url) ? "submit" : "notSubmit"
    // console.log('sumitDoc', userById);
    const [isActive, setActive] = React.useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };

    const arr = [];


    React.useEffect(async () => {
        // const id = localStorage.getItem("id")
        const id = props?.match?.params?.id;

        if (id) {
            setLoader(true)
            dispatch(getUserByIdAction(id))
                .then(async () => { setLoader(false); })
            const data = await dispatch(realTimeLiveLocationQuery(id))
            setLiveLocationData(data?.userLiveLocationThreads)


        }


    }, [])

    const doRequest = (options) => {
        try {
            return new Promise(function (resolve, reject) {
                request(options, function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(body);
                    } else {
                        reject(error);
                    }
                });
            });
        } catch (err) {
            console.log("error in doRequest: ", err)
            throw err;
        }
    }

    const getRequestAddressFun = async (index, item) => {
        console.log("getRequestAddressFungetRequestAddressFun", item)
        if (item && item.lat) {
            let lat = item?.lat ? item.lat : 0
            let long = item?.long ? item.long : 0
            var options = {
                'method': 'GET',
                'url': `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU`,
                'headers': {
                }
            };
            let res = await doRequest(options);
            var addressResult = JSON.parse(res);
            if (addressResult && addressResult.results[0] && addressResult.results[0].formatted_address) {
                setGetRequesterAddress(addressResult.results[0].formatted_address)
            }
        }
        setshowRequesterAddress(index);

    }
    const createDate = new Date(createdAt);
    var date1 = createDate.toLocaleDateString() + ' ' + createDate.toTimeString().substring
        (0, createDate.toTimeString().indexOf("GMT"));


    const backToUserfun = () => {
        props.history.replace(`/users/${pageNumber}`)
    }

    const getUserDetailByMobileFun = (mobile) => {

        dispatch(getUserByPhoneAction(mobile))
            .then((data) => {
                if (data === null) {
                    alert("Emergency contact is not the user of helpy-finder yet")
                }
                else {

                    localStorage.setItem("id", data[0].emergencyContactUserId)
                    const id = localStorage.getItem("id")


                    if (id) {
                        const userId = data[0]?.emergencyContactUserId
                        dispatch(getUserByIdAction(id))
                            .then(() => {
                                props.history.replace(`/userDetail/${userId}/1`)
                            })

                    }
                }

            })
    }
    return (
        <>
            <LeftMenu isActive={isActive} />
            <div className="mainParent userDetailPage">
                <Header toggleClass={toggleClass} />
                <div className="headingMain">User Detail</div>
                <button onClick={() => backToUserfun()} style={{ fontSize: "14px" }} className=" btn btn-info">back to user</button>
                <div class="container-fluid">
                    <div class="row">
                        <div className="w-100">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div class="tableParent shadow">
                                        <div className="table-responsive portlet">
                                            <table className="table table-bordered table-hover">
                                                <thead className="col">
                                                    <tr className="col">
                                                        <th scope="col">KYC</th>
                                                        <th scope="col">isUserActive</th>
                                                        <th scope="col">lastUserStatus</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="table-row">
                                                        <td>{Verified === true ? <TiTick color="white" style={{
                                                            background: "blue",
                                                            borderRadius: "50%", fontSize: "30"
                                                        }} /> :
                                                            Verified === false ? <img className="VerifyStatus" src={Rejected} />
                                                                : sumitDoc === "submit" ? <TiTick color="black" style={{ background: "grey", fontSize: "30" }} />
                                                                    : <BsFillExclamationTriangleFill color="red" style={{ fontSize: "30" }} />}</td>
                                                        <td>{Active ? <img className="VerifyStatus" src={verified} /> : <img className="VerifyStatus" src={Rejected} />}</td>
                                                        <td>{date1}</td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {
                                        loader ?
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '45vh' }}><img src={`${loaderImg}`} alt="Document" /></div>
                                            :
                                            <>
                                                <div className="tableParent shadow">
                                                    <PersonalInformation personalInformation={userById} />
                                                </div>
                                                <div className="tableParent shadow">
                                                    <div className="table-responsive portlet">
                                                        <h6 className=" text-green font-weight-bold text-center"> Emergency contact</h6>
                                                        <table className="table table-border table-hover">
                                                            <thead className="col">
                                                                <tr className="col">
                                                                    <th scope="col">Phone </th>
                                                                    <th scope="col">name</th>
                                                                    <th scope="col">Relationship</th>
                                                                    <th scope="col">Address</th>
                                                                    <th scope="col">Current Distance from Primary Phone</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    emergencycontact1 && emergencycontact1.length > 0 && emergencycontact1.map((item, index) => {
                                                                        return (
                                                                            <tr className="table-row" key={index}>
                                                                                <td style={{ color: "blue" }} onClick={() => getUserDetailByMobileFun(item.phone)}>{item.phone}</td>
                                                                                {/* <td >{item.phone}</td> */}
                                                                                <td>{item.fullName}</td>
                                                                                <td>{item.relation === "null" ? <p>_ _ _</p> : item.relation}</td>
                                                                                <td>{item.address ? item.address : <p>_ _ _</p>}</td>
                                                                                <td className="text-center"><p>---</p></td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tableParent shadow">
                                                    <DocumentsSubmitted userIdProof={idProof} userId={props?.match?.params?.id} />
                                                </div>
                                                <div class="tableParent activityTable shadow">
                                                    <UserActivity Location1={Location} helprequest={helprequest} helper={helper} />
                                                </div>
                                                <div class="tableParent activityTable shadow">
                                                    <UserAdminCommit personalInformation={userById} userId={props?.match?.params?.id} />
                                                </div>
                                                <div class="tableParent shadow">
                                                    <div className="table-responsive portlet">
                                                        <h6 className=" text-green font-weight-bold text-center">Real time live location</h6>
                                                        <table className="table table-border table-hover">
                                                            <thead className="col">
                                                                <tr className="col">
                                                                    <th scope="col">Address</th>
                                                                    <th scope="col">date</th>

                                                                </tr>
                                                            </thead>
                                                            {
                                                                liveLocationData?.map((item, index) => {

                                                                    return (
                                                                        <tbody>
                                                                            <tr>
                                                                                <td onClick={(e) => getRequestAddressFun(index, item)}>
                                                                                    {showRequesterAddress === index ? getRequesterAddress :
                                                                                        <button className="btn btn-primary" style={{ width: "50%", height: "20px", fontSize: "15px" }}>get requester address</button>}
                                                                                </td>
                                                                                <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                                            </tr>

                                                                        </tbody>
                                                                    )
                                                                })
                                                            }
                                                            <tbody>
                                                                <tr>
                                                                    {/* <td>mohali</td>
                                                                    <td>5/27/21</td> */}
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(UserDetail)


