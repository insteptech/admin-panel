import React from 'react'
// import { FaUserCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { getUserByIdAction } from '../../Redux/action';
import { DocumentVerifyAction } from '../../Redux/action/DocumentVerify';
import "./adminChat.css"
// import documentIcone from "../../docSubmitIcone.svg"
import { FcDocument } from "react-icons/fc";
import loaderImg from '../../loading.gif';

const DocumentsSubmitted = (props) => {
    console.log("DocumentsSubmittedprops", props)


    const dispatch = useDispatch()

    const [showReject, setShowReject] = React.useState(false)
    const [reason, setReason] = React.useState()
    const [documentId, setDocumentId] = React.useState()
    const [documentImg, setDocumentImg] = React.useState()
    const [data1, setdata] = React.useState(props.userIdProof);
    const [loader, setLoader] = React.useState(false);
    const userId = props?.userId

    // console.log(documentId, "DocumentsSubmittedprops");
    // console.log(data1, "data1::");

    const documentReject = (e, id) => {
        e.preventDefault();
        let status = "Rejected"
        const data = {
            reason, id, status
        }
        setLoader(true);
        dispatch(DocumentVerifyAction(data)).then((res) => {
            // const Id = localStorage.getItem("id")
            dispatch(getUserByIdAction(userId)).then((data) => {
                // console.log('data user:::', data);
                setLoader(false);
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
        e.preventDefault();
        let status = "Approved"
        let reason = null
        const data = {
            reason, id, status
        }
        setLoader(true);
        dispatch(DocumentVerifyAction(data)).then((res) => {
            // const Id = localStorage.getItem("id")
            dispatch(getUserByIdAction(userId))
                .then((response) => {
                    setdata(response && response[0] && response[0].idProof)
                    setLoader(false);
                })
            const { statusChange } = props;
            // statusChange ("Approved")
        })
    }

    const backToModal = () => {
        setShowReject(false)
    }

    const documentIdFun = (e, id, img) => {
        console.log("documentIdFundocumentIdFun", id, img)
        setDocumentId(id)
        setDocumentImg(img)
    }
    return (
        <>
            {/* {
                props.userIdProof.map((item, index) => {
                    return (
                        <h1>jnwdjk</h1>
                    )
                })
            } */}
            <h6 className=" text-green font-weight-bold text-center">Documents Submitted</h6>
            <div className="table-responsive portlet">
                <table className="table table-border table-striped">
                    <thead className="col">
                        <tr className="col">
                            <th>Document</th>
                            <th>Photo/Document</th>
                            <th>Accepted</th>
                            <th>Rejection Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loader ?
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: "10vh" }}><img src={`${loaderImg}`} alt="Document" /></div>
                                :
                                props.userIdProof && props.userIdProof?.length > 0 ? props.userIdProof.map((item, index) => {
                                    const Accepted = item.status === "inReview" ? item.status = "pending" : item.status
                                    return (
                                        item.url ?
                                            (
                                                <tr key={index}>
                                                    <td>{item.type}</td>
                                                    <td>
                                                        {
                                                            item.url ? <h1 onClick={(e) => documentIdFun(e, item._id, item.url)} type="button" data-toggle="modal" data-target="#exampleModalCenter">
                                                                <FcDocument />
                                                            </h1>
                                                                :
                                                                <p>Document not upload</p>
                                                        }
                                                    </td>
                                                    {
                                                        item.url ? <td>{Accepted}</td> : <td>- </td>
                                                    }
                                                    {
                                                        Accepted === "Approved" ? <td>_ _ _</td> : <td>{item.reason}</td>
                                                    }
                                                </tr>
                                            )
                                            :
                                            null



                                    )
                                })
                                    :
                                    null

                            // props.data1 && data1.map((item, index) => {
                            //     const Accepted = item.status === "inReview" ? item.status = "pending" : item.status
                            //     return (
                            //         <tr key={index}>
                            //             <td>{item.type}</td>
                            //             <td>
                            //                 {
                            //                     item.url ? <h1 onClick={(e) => documentIdFun(e, item._id, item.url)} type="button" data-toggle="modal" data-target="#exampleModalCenter">

                            //                         <FcDocument />
                            //                     </h1> : <p>Document not upload</p>
                            //                 }
                            //             </td>
                            //             {
                            //                 item.url ? <td>{Accepted}</td> : <td>- </td>
                            //             }
                            //             {
                            //                 Accepted === "Approved" ? <td>_ _ _</td> : <td>{item.reason}</td>
                            //             }
                            //         </tr>
                            //     )
                            // })


                        }

                    </tbody>
                </table>
            </div>
            {
                documentId ?
                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="centerdocmodal modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content contentPart">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">	Preview Photo/Document</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                {documentImg.split('.').pop() === 'pdf' ?
                                    <div className="modal-body embed-responsive embed-responsive-4by3">
                                        <embed
                                            src={`${documentImg}`}
                                            type="application/pdf"
                                            frameBorder="0"
                                            scrolling="auto"
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    :
                                    <div className="modal-body">
                                        <img style={{ width: "100%" }} src={`${documentImg}`} alt="Document" />
                                    </div>
                                }

                                <div className="modal-footer display-block">
                                    {
                                        showReject ? <>
                                            <h3>Right the Rejection reason</h3>
                                            <textarea row="6" className="w-100"
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                            >
                                            </textarea>
                                            <button onClick={(e) => documentReject(e, documentId)} className="btn btn-primary" data-dismiss="modal">Submit</button>
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
export default DocumentsSubmitted
