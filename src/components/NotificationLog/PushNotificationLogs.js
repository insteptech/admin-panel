import React from 'react'
import { useState, useEffect } from 'react';
import { GiTruce } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { pushNotifQuery } from '../../Redux/action/NotificationLogs/pushNotificationLogs';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';

const PushNotificationLogsModel = (props) => {
    const [pushLogs, setPushLogs] = useState([])
    const [whatsappLogs, setWhatsappLogs] = useState([])
    const [smsLogs, setSmsLogs] = useState([])
    const dispatch = useDispatch();
    useEffect(async () => {
        const pushNotificationLogs = await dispatch(pushNotifQuery(props.userId))
        const pushNotifLogs = pushNotificationLogs.filter(data => data.PushNotification == true)
        const whatsappNotificationLogs = pushNotificationLogs.filter(data => data.WhatsappNotification == true)
        const smsNotificationLogs = pushNotificationLogs.filter(data => data.SmsNotification == true)
        setPushLogs(pushNotifLogs)
        setWhatsappLogs(whatsappNotificationLogs)
        setSmsLogs(smsNotificationLogs)
        console.log("pushNotificationLogspushNotificationLogs", pushNotificationLogs,)
    }, []);
    return (
        <>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation='true'
                scrollable='true'
                backdrop='static'
            // style={{ backgroundColor: 'red', height: '100%', width: '100%' }}
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title id="contained-modal-title-vcenter">
                        Push Notification
                    </Modal.Title> */}
                    <p style={{ fontWeight: 'bold', fontSize: 25 }}>Push Notification Logs</p>
                </Modal.Header>
                <Modal.Body>
                    <div className="pushNotificationlog">
                        <div class="card-b</div>ody">
                            <table className="table table-bordered table-striped">
                                <thead className="thead">
                                    <tr className="col">
                                        <th scope="col">Logs</th>
                                        <th scope="col">Additional Number</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pushLogs?.map((item) => {
                                            return (
                                                <tr className="table-row">
                                                    <td>{item?.PushNotificationMessage}</td>
                                                    <td>{item?.MobileNumber}</td>
                                                    <td>{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                </tr>
                                            )

                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: 25 }}>Whatsapp Notification Logs</p>
                    <div className="pushNotificationlog">
                        <div class="card-b</div>ody">
                            <table className="table table-bordered table-striped">
                                <thead className="thead">
                                    <tr className="col">
                                        <th scope="col">Logs</th>
                                        <th scope="col">Additional Number</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        whatsappLogs?.map((item) => {
                                            return (
                                                <tr className="table-row">
                                                    <td>{item?.WhatsappMessage}</td>
                                                    <td>{item?.MobileNumber}</td>
                                                    <td>{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                </tr>
                                            )

                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: 25 }}>SMS Notification Logs</p>
                    <div className="pushNotificationlog">
                        <div class="card-b</div>ody">
                            <table className="table table-bordered table-striped">
                                <thead className="thead">
                                    <tr className="col">
                                        <th scope="col">Logs</th>
                                        <th scope="col">Additional Number</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        smsLogs?.map((item) => {
                                            return (
                                                <tr className="table-row">
                                                    <td>{item?.SmsNotificationMessage}</td>
                                                    <td>{item?.MobileNumber}</td>
                                                    <td>{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                </tr>
                                            )

                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size='lg' variant='link' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                {/* <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Whatsapp Notification
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="notification-log">
                        <div class="card-b</div>ody">
                            <div className="table-responsive portlet">
                                <table className="table table-bordered table-striped">
                                    <thead className="col">
                                        <tr className="col">
                                            <th scope="col">Logs</th>
                                            <th scope="col">Additional Number</th>
                                            <th scope="col">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            whatsappLogs?.map((item) => {
                                                return (
                                                    <tr className="table-row">
                                                        <td>{item.PushNotificationMessage}</td>
                                                        <td>{item.MobileNumber}</td>
                                                        <td>{item.createdAt}</td>
                                                    </tr>
                                                )

                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size='lg' variant='link' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        SMS Notification
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive portlet">
                        <table className="table table-bordered table-striped">
                            <thead className="col">
                                <tr className="col">
                                    <th scope="col">Logs</th>
                                    <th scope="col">Additional Number</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    smsLogs?.map((item) => {
                                        return (
                                            <tr className="table-row">
                                                <td>{item.PushNotificationMessage}</td>
                                                <td>{item.MobileNumber}</td>
                                                <td>{item.createdAt}</td>
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size='lg' variant='link' onClick={props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal >
        </>
    )
}

export default PushNotificationLogsModel;
