import React, { useState } from 'react'
import DocumentsSubmitted from '../commanTables/DocumentsSubmitted'
import UserActivity from '../commanTables/UserActivity'
import PersonalInformation from '../commanTables/UserPersonalInformation'
import UserAdminCommit from '../commanTables/UserAdminCommit'
import { useSelector, useDispatch } from 'react-redux'
import LeftMenu from '../LeftMenu/leftmenu'
import { getAllOtherServiceTypeAction, getOneOtherServiceTypeAction } from '../../Redux/action/allOtherService/otherServiceTypeAction';
import { getUserByIdAction, getUserByPhoneAction } from '../../Redux/action'
import loaderImg from '../../loading.gif';
import verified from '../../verified.png';
import Rejected from '../../rejected.png';
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import Header from '../LeftMenu/header'

const OtherServicesTypeDetail = (props) => {

    const [isActive, setActive] = React.useState(false);
    console.log(props.match.params.id, "propspropspropsprops");
    const [loader, setLoader] = React.useState(false);
    let state = useSelector(state => state.otherDetailService.otherSingleServiceTypeData);
    let userById = useSelector(state => state.user.userById)
    const user = userById && userById.length > 0 && userById[0] && userById[0].user;
    const Active = user && user[0] && user[0].Active
    const Verified = user && user[0] && user[0].Verified
    const states = useSelector(state => state)
    const idProof = userById && userById[0] && userById[0].idProof ? userById[0].idProof : []
    const Location1 = userById && userById.length > 0 && userById[0].helper && userById[0].helper;
    const Location = Location1 ? Location1 : {}
    const helprequest1 = userById && userById.length > 0 && userById[0].helprequest && userById[0].helprequest;
    const helprequest = helprequest1 ? helprequest1 : []
    const helper = userById && userById[0] && userById[0].helper ? userById[0].helper : []
    const sumitDoc = idProof && idProof.length > 0 && idProof[0] && (idProof[0].url || idProof[1].url || idProof[2].url || idProof[3].url) ? "submit" : "notSubmit"
    const id = props && props.match && props.match.params && props.match.params.id
    const pageNumber = props.match.params.pageNumber;
    console.log("stateid::::", userById)
    const [documents, setdocuments] = React.useState()
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (id) {
            setLoader(true)
            dispatch(getOneOtherServiceTypeAction(id))
                .then((data) => {
                    setLoader(false);
                    data && data.commentTrail && data.commentTrail.length > 0 && data.commentTrail.map((item, index) => {
                        if (item.adminId !== "") {
                            var adminId = item.adminId;
                            var userId = item.userId
                            console.log("adminidadminid//////////////", item)
                            localStorage.setItem("id", userId)
                            localStorage.setItem("adminId", adminId)
                        }
                    },
                    )
                    const userId = data && data.commentTrail && data.commentTrail[0] && data.commentTrail[0].userId;
                    const adminId = data && data.commentTrail && data.commentTrail[0] && data.commentTrail[0].adminId;
                    dispatch(getUserByIdAction(userId))
                        .then(() => {
                            setLoader(false);
                        })
                })
        }
    }, [])

    const toggleClass = () => {
        setActive(!isActive);
    }

    const backToOtherServices = () => {
        props.history.replace(`/OtherServicesType/${pageNumber}`)
    }

    console.log(documents, "documentsdocuments");
    return (
        <>
            <LeftMenu />
            <div className="mainParent userDetailPage">
                <Header toggleClass={toggleClass} />
                <button onClick={() => backToOtherServices()} style={{ fontSize: "14px" }} className="btn btn-info">Back To Other services</button>
                <div className="w-100">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card  mb-4">
                            <div className="card-header py-3]">
                                <h6 className="m-0 text-green font-weight-bold text-center">Other Services type in detail</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive portlet">
                                    <table className="table table-bordered table-striped">
                                        <thead className="col">


                                            <tr className="col">
                                                <th scope="col">Verified User</th>
                                                <th scope="col">User Status</th>
                                                <th scope="col">Document Status</th>
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
                                                <td>5/10/2021</td>

                                            </tr>
                                            {/* <tr className="table-row">
                                                <td>true</td>
                                                <td>Enable</td>
                                                <td>submit</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </div>
                        {loader ?
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '45vh' }}><img src={`${loaderImg}`} alt="Document" /></div>
                            :
                            <>
                                <PersonalInformation personalInformation={userById} />
                                <DocumentsSubmitted userIdProof={state.documents} />
                                <UserAdminCommit personalInformation={state.commentTrail} />
                                <UserActivity Location1={Location} helprequest={helprequest} helper={helper} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OtherServicesTypeDetail
