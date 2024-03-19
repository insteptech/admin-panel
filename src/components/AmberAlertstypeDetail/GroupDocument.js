
import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import ReactDOM from 'react-dom';
import { FcDocument } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { DocumentVerifyAction } from '../../Redux/action/DocumentVerify';
import { getUserByIdAction } from '../../Redux/action';
import {
    amberAlertTypeAction,
    amberAlertDataByAlertIdAction,
} from "./../../Redux/action/allAmberAlerts/amberAlertTypeAction";


const GroupDocument = (props) => {
    const dispatch = useDispatch();
    const [documentId, setDocumentId] = React.useState()
    const [documentImg, setDocumentImg] = React.useState()
    const [reason, setReason] = React.useState()
    const [showReject, setShowReject] = React.useState(false)
    const [data1, setdata] = React.useState(props.userIdProof);
    const [groupName, setGroupName] = React.useState();


    const document = props?.userIdProof[0]?.Group ? props.userIdProof[0].Group : []
    console.log("prooops", props);
    const amberAlertId = document && document[0] && document[0].children && document[0].children[0] && document[0].children[0].amberAlertDataId ? document[0].children[0].amberAlertDataId : []
    const pageNumber = props && props.pageNumber ? props.pageNumber : null
    const documentIdFun = (e, id, img) => {
        console.log("dvcsfvvdvs", id)
        setDocumentId(id)
        setDocumentImg(img)
        setShowReject(false)

    }
    // const pageNumber = {
    //     pageNumber: 2
    // }

    const documentReject = (e, id) => {
        e.preventDefault();
        let status = "Rejected"
        const data = {
            reason, id, status, amberAlertId
        }
        // dispatch(amberAlertTypeAction(pageNumber));
        dispatch(DocumentVerifyAction(data)).then((res) => {
            const Id = localStorage.getItem("id")
            dispatch(getUserByIdAction(Id))
            dispatch(amberAlertTypeAction(pageNumber))
                .then((data) => {
                    console.log('data user:::', id);
                })
            setdata(data)
            const { statusChange } = props;
            // statusChange ("Rejected")
        })


    }
    const openReject = () => {
        setShowReject(true)
    }

    const documentApproval = (e, id) => {
        console.log("bdhchjchcvh", id)
        e.preventDefault();
        let status = "Approved"
        let reason = null
        const data = {
            reason, id, status, amberAlertId
        }

        dispatch(DocumentVerifyAction(data)).then((res) => {
            const Id = localStorage.getItem("id")
            dispatch(getUserByIdAction(Id))
            dispatch(amberAlertTypeAction(pageNumber))
                .then((response) => {
                    console.log("respoooooo", response);
                    setdata(response && response[0] && response[0].idProof)
                })
            const { statusChange } = props;

            // statusChange ("Approved")
        })
    }

    const backToModal = () => {
        setShowReject(false)
    }


    return (
        <>
            {/* <div> */}
            {
                document?.map((item, index) => {
                    console.log("itemitemitemmmm", item)
                    return (
                        item?.group == "proofOfOwnership" ?
                            <>
                                <div class="col-xl-12 col-lg-12">
                                    <div class="card  mb-4">
                                        <div class="card-header py-3">
                                            <h6 className=" text-green font-weight-bold text-center"> Proof of Ownership / Proof to show the Relationship</h6>
                                        </div>
                                        <div class="card-body">
                                            <div className="table-responsive portlet">

                                                <table className="table table-border table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th className="col doc">Document</th>
                                                            <th className="col doc">Photo/Document</th>
                                                            <th className="col doc">Accepted</th>
                                                            <th className="col doc">Rejection Reason</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            item.children?.map((items, indx) => {
                                                                const Accepted = items.status === "inReview" ? items.status = "pending" : items.status
                                                                return (
                                                                    <>
                                                                        {console.log("itemmm", items)}
                                                                        <tr >
                                                                            <td>{items.name}</td>
                                                                            <td>
                                                                                {
                                                                                    items.url ?
                                                                                        <h1 onClick={(e) => documentIdFun(e, items._id, items.url)} type="button" data-toggle="modal" data-target="#exampleModalCenter">
                                                                                            <FcDocument />
                                                                                        </h1>
                                                                                        :
                                                                                        <p>Document not upload</p>
                                                                                }
                                                                            </td>
                                                                            {
                                                                                items.url ? <td>{Accepted}</td> : <td>- </td>
                                                                            }
                                                                            {
                                                                                Accepted === "Approved" ? <td>_ _ _</td> : <td>{items.reason}</td>
                                                                            }
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            []

                    )

                })

            }
            {
                document.map((item, index) => {
                    console.log("itemitemitemmmm", item)
                    return (
                        item.group == "rc" ?
                            <>
                                <h6 className=" text-green font-weight-bold text-center">RC Copy</h6>

                                <div className="table-responsive portlet">

                                    <table className="table table-border table-striped">
                                        <thead>
                                            <tr>
                                                <th className="col doc">Document</th>
                                                <th className="col doc">Photo/Document</th>
                                                <th className="col doc">Accepted</th>
                                                <th className="col doc">Rejection Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                item.children?.map((items, indx) => {
                                                    const Accepted = items.status === "inReview" ? items.status = "pending" : items.status
                                                    return (
                                                        <>
                                                            {console.log("itemmm", items)}
                                                            <tr>
                                                                <td>{items.name}</td>
                                                                <td>
                                                                    {
                                                                        items.url ?
                                                                            <h1 onClick={(e) => documentIdFun(e, items._id, items.url)} type="button" data-toggle="modal" data-target="#exampleModalCenter">
                                                                                <FcDocument />
                                                                            </h1>
                                                                            :
                                                                            <p>Document not upload</p>
                                                                    }
                                                                </td>
                                                                {
                                                                    items.url ? <td>{Accepted}</td> : <td>- </td>
                                                                }
                                                                {
                                                                    Accepted === "Approved" ? <td>_ _ _</td> : <td>{items.reason}</td>
                                                                }
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                            []

                    )

                })

            }
            {
                document.map((item, index) => {
                    console.log("itemitemitemmmm", item)
                    return (
                        item.group == "fir" ?
                            <>
                                <div class="col-xl-12 col-lg-12">
                                    <div class="card  mb-4">
                                        <div class="card-header py-3">
                                            <h6 className=" text-green font-weight-bold text-center"> FIR Copy</h6>
                                        </div>
                                        <div class="card-body">
                                            <div className="table-responsive portlet">
                                            </div>
                                            <table className="table table-border table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className="col doc">Document</th>
                                                        <th className="col doc">Photo/Document</th>
                                                        <th className="col doc">Accepted</th>
                                                        <th className="col doc">Rejection Reason</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        item.children?.map((items, indx) => {
                                                            const Accepted = items.status === "inReview" ? items.status = "pending" : items.status
                                                            return (
                                                                <>
                                                                    {console.log("itemmm", items)}
                                                                    <tr>
                                                                        <td>{items.name}</td>
                                                                        <td>
                                                                            {
                                                                                items.url ?
                                                                                    <h1 onClick={(e) => documentIdFun(e, items._id, items.url)} type="button" data-toggle="modal" data-target="#exampleModalCenter">
                                                                                        <FcDocument />
                                                                                    </h1>
                                                                                    :
                                                                                    <p>Document not upload</p>
                                                                            }
                                                                        </td>
                                                                        {
                                                                            items.url ? <td>{Accepted}</td> : <td>- </td>
                                                                        }
                                                                        {
                                                                            Accepted === "Approved" ? <td>_ _ _</td> : <td>{items.reason}</td>
                                                                        }
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            []

                    )
                })
            }
            {
                document.map((item, index) => {
                    console.log("itemitemitemmmm", item)
                    return (
                        item.group == "photo" ?
                            <>
                                <div class="col-xl-12 col-lg-12">
                                    <div class="card  mb</div>-4">
                                        <div class="card-header py-3">
                                            <h6 className=" text-green font-weight-bold text-center"> Lost Item Photo/Document</h6>
                                        </div>
                                        <div class="card-body">
                                            <div className="table-responsive portlet">
                                            </div>
                                        </div>
                                        <table className="table table-border table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="col doc">Document</th>
                                                    <th className="col doc">Photo/Document</th>
                                                    <th className="col doc">Accepted</th>
                                                    <th className="col doc">Rejection Reason</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.children?.map((items, indx) => {
                                                        const Accepted = items.status === "inReview" ? items.status = "pending" : items.status
                                                        return (
                                                            <>
                                                                {console.log("itemmm", items)}
                                                                <tr>
                                                                    <td>{items.name}</td>
                                                                    <td>
                                                                        {
                                                                            items.url ?
                                                                                <h1 onClick={(e) => documentIdFun(e, items._id, items.url)} type="button" data-toggle="modal" data-target="#exampleModalCenter">
                                                                                    <FcDocument />
                                                                                </h1>
                                                                                :
                                                                                <p>Document not upload</p>
                                                                        }
                                                                    </td>
                                                                    {
                                                                        items.url ? <td>{Accepted}</td> : <td>- </td>
                                                                    }
                                                                    {
                                                                        Accepted === "Approved" ? <td>_ _ _</td> : <td>{items.reason}</td>
                                                                    }
                                                                </tr>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                            :
                            []

                    )
                })
            }
            {
                document.map((item, index) => {
                    console.log("itemitemitemmmm", item)
                    return (
                        item.group == "familyPhoto" ?
                            <>
                                <div class="col-xl-12 col-lg-12">
                                    <div class="card  mb-4">
                                        <div class="card-header py-3">
                                            <h6 className=" text-green font-weight-bold text-center"> Family Photo</h6>
                                        </div>
                                        <div class="card-body">


                                            <div className="table-responsive portlet">
                                            </div>
                                            <table className="table table-border table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className="col doc">Document</th>
                                                        <th className="col doc">Photo/Document</th>
                                                        <th className="col doc">Accepted</th>
                                                        <th className="col doc">Rejection Reason</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        item.children?.map((items, indx) => {
                                                            const Accepted = items.status === "inReview" ? items.status = "pending" : items.status
                                                            return (
                                                                <>
                                                                    {console.log("itemmm", items)}
                                                                    <tr>
                                                                        <td>{items.name}</td>
                                                                        <td>
                                                                            {
                                                                                items.url ?
                                                                                    <h1 onClick={(e) => documentIdFun(e, items._id, items.url)} type="button" data-toggle="modal" data-target="#exampleModalCenter">
                                                                                        <FcDocument />
                                                                                    </h1>
                                                                                    :
                                                                                    <p>Document not upload</p>
                                                                            }
                                                                        </td>
                                                                        {
                                                                            items.url ? <td>{Accepted}</td> : <td>- </td>
                                                                        }
                                                                        {
                                                                            Accepted === "Approved" ? <td>_ _ _</td> : <td>{items.reason}</td>
                                                                        }
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            []

                    )
                })

            }
            {
                document.map((item, index) => {
                    console.log("itemitemitemmmm", item)
                    return (
                        item.group == "vehiclePhoto" ?
                            <>
                                <h6 className=" text-green font-weight-bold text-center">Vehicle Photo</h6>

                                <div className="table-responsive portlet">

                                    <table className="table table-border table-striped">
                                        <thead>
                                            <tr>
                                                <th className="col doc">Document</th>
                                                <th className="col doc">Photo/Document</th>
                                                <th className="col doc">Accepted</th>
                                                <th className="col doc">Rejection Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                item.children?.map((items, indx) => {
                                                    const Accepted = items.status === "inReview" ? items.status = "pending" : items.status
                                                    return (
                                                        <>
                                                            {console.log("itemmm", items)}
                                                            <tr>
                                                                <td>{items.name}</td>
                                                                <td>
                                                                    {
                                                                        items.url ?
                                                                            <h1 onClick={(e) => documentIdFun(e, items._id, items.url)} type="button" data-toggle="modal" data-target="#exampleModalCenter">
                                                                                <FcDocument />
                                                                            </h1>
                                                                            :
                                                                            <p>Document not upload</p>
                                                                    }
                                                                </td>
                                                                {
                                                                    items.url ? <td>{Accepted}</td> : <td>- </td>
                                                                }
                                                                {
                                                                    Accepted === "Approved" ? <td>_ _ _</td> : <td>{items.reason}</td>
                                                                }
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                            []

                    )
                })

            }


            {
                documentId ? <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">	Preview Photo/Document</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img style={{ width: "100%" }} src={`${documentImg}`} alt="Document" />
                            </div>
                            <div className="modal-footer display-block">
                                {
                                    showReject ? <>
                                        <h3>Right the Rejection reason</h3>
                                        <textarea row="6" className="w-100"
                                            value={reason}
                                            // value={showReject ? reason : null}
                                            onChange={(e) => setReason(e.target.value)}
                                        >
                                        </textarea>
                                        <button onClick={(e) => documentReject(e, documentId)} className="btn btn-primary" data-dismiss="modal">submit</button>
                                        <button className="btn btn-secondary" onClick={backToModal}>back</button>
                                    </> : <>
                                        <button type="button" className="btn btn-secondary"
                                            onClick={openReject}  >Reject</button>
                                        <button type="button" data-dismiss="modal" onClick={(e) => documentApproval(e, documentId)}
                                            className="btn btn-primary">Approval</button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div> : null
            }
            {/* </div> */}
        </>
    )

}

export default GroupDocument;