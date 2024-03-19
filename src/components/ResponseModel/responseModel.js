import React, { Component, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { responsesToAmberByUsers } from '../../Redux/action/allAmberAlerts/amberAlertTypeAction'
import request from "request"
import moment from 'moment';
import { Accordion, Card, Button, Modal } from "react-bootstrap";
import ResponseDocsModel from './responseDocsModel'
import loaderImg from '../../loading.gif';

const ResponseModel = (props) => {
    const [showRequesterAddress, setshowRequesterAddress] = React.useState("")
    const [getRequesterAddress, setGetRequesterAddress] = React.useState("")
    const [docsModal, setDocsModal] = React.useState(false);
    const [docs, setDocs] = React.useState([]);
    const [loader, setLoader] = React.useState(true);

    const dispatch = useDispatch();
    const amberALertDataId = props.amberALertDataId

    React.useEffect(() => {
        dispatch(responsesToAmberByUsers(amberALertDataId)).then((data) => {
            setLoader(false);
        })
    }, [amberALertDataId])
    const amberAlertResponse = useSelector(state => state.amberAlertdata.responseToAmberByUsers.responsesToAmberByUsers)
    const notif = amberAlertResponse && amberAlertResponse[0] && amberAlertResponse[0].Notifications ? amberAlertResponse[0].Notifications : null
    // const document = notif && notif[0] && notif[0].documents.length > 0 ? notif[0].documents : null
    const countTotalNotification = () => {
        const notification = amberAlertResponse && amberAlertResponse[0] && amberAlertResponse[0].Notifications
            ? amberAlertResponse[0].Notifications
            : null
        return notification?.length;
    }
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
    const getrequestAddressFun = async (index, item) => {
        if (item && item.lat) {
            let lat = item && item.lat;
            let long = item && item.long;
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
        setshowRequesterAddress(item._id);
    }
    const getDocument = (doc) => {
        setDocsModal(!docsModal);
        setDocs(doc);
    }

    return (

        <>


            <div className="">

                <div className="modal fade " id="amberAlertResponses">
                    <div className="modal-dialog modal-dialog-centered customModal">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h3 className="modal-title text-white"> RESPONSES</h3>
                                <button type="button" className="btn-close bg-light" data-dismiss="modal">&times; </button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body ">
                                    <div className="table-responsive table-bordered table-hover">
                                        <table className="table">
                                            <thead className="thead ">
                                                <tr className="col">
                                                    <th scope="col">Tracking ID</th>
                                                    <th scope="col">Requester Location</th>
                                                    <th scope="col">Request Initiated Time</th>
                                                    <th scope="col">User Response Comment</th>
                                                    <th scope="col">User Status </th>
                                                    <th scope="col">Documents</th>
                                                </tr>
                                            </thead>
                                            <>
                                                {

                                                    loader ?
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '45vh', position: 'absolute', left: '40%' }}><img src={`${loaderImg}`} alt="Document" /></div>
                                                        :
                                                        <tbody>
                                                            {
                                                                amberAlertResponse?.map((item, index) => {

                                                                    return (
                                                                        <>
                                                                            {
                                                                                notif?.map((notifData, indexxx) => {
                                                                                    return (
                                                                                        <tr className="table-row" key={indexxx}>
                                                                                            <td>{item.trackingId}</td>
                                                                                            <td onClick={() => getrequestAddressFun(index, notifData)}>
                                                                                                {
                                                                                                    showRequesterAddress === notifData._id ? getRequesterAddress
                                                                                                        :
                                                                                                        <button className="btn btn-primary" style={{ width: "80%", height: "30px", fontSize: "8px" }}>Get address</button>
                                                                                                }
                                                                                            </td>
                                                                                            <td>{moment(notifData.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                                                            <td>{notifData.Comment}</td>
                                                                                            <td>{notifData.status}</td>
                                                                                            <td>
                                                                                                {
                                                                                                    notifData.documents.length > 0 ?
                                                                                                        <button className="responseModelButton"
                                                                                                            type="button" data-toggle="collapse" data-target="#collapseExample" aria-controls="collapseExample"
                                                                                                            onClick={() => { getDocument(notifData.documents) }}>Document</button>
                                                                                                        :
                                                                                                        "No document upload"
                                                                                                }
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                            }

                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                            <p>Total Response count:{countTotalNotification()}</p>

                                                        </tbody>

                                                }

                                            </>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {
                docsModal ?

                    <ResponseDocsModel getDocument={getDocument} docs={docs} />
                    :
                    null
            }
        </>
    )

}


export default ResponseModel;