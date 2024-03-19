import React from 'react'
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllCoupon, deleteCoupon } from '../../Redux/action/razorPay/paymentLog';
import { FaWhatsappSquare } from 'react-icons/fa'
import Switch from "react-switch";
import { MdMessage, MdNotificationsActive } from 'react-icons/md'
import loaderImg from '../../loading.gif';
import SwitchExample from '../../components/Switch/index'
import UserNotify from '../../components/commanTables/UserNotiofDashboard';


const AllCoupon = (props) => {
    const [coupon, setCoupon] = useState([]);
    const [loader, setLoader] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [userNotifModel, setUserNotifModel] = useState(false);
    const dispatch = useDispatch();

    const arr = [];


    useEffect(async () => {
        await dispatch(getAllCoupon()).then((response) => {
            setLoader(false)
            setCoupon(response.getAllCoupon)
        })
    }, []);

    // const funSendWhatsapp = () => {

    // }
    // const funSendMessage = () => {

    // }
    // const funSendPushNotification = () => {

    // }

    const funSendToUser = () => {
        setUserNotifModel(!userNotifModel);
    }
    const funDeleteCoupon = async (item) => {
        await dispatch(deleteCoupon(item?.id))
    }





    return (
        <>
            <div className='mt-5 m-2'>
                {
                    loader ?
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '45vh', position: 'absolute', left: '40%' }}><img src={`${loaderImg}`} alt="Document" /></div>
                        :
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sr</th>
                                    <th>Coupon Code</th>
                                    <th>coupon Period</th>
                                    <th>Send To User</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    coupon?.length > 0 ? coupon?.map((item, index) => {
                                        if (item?.isActive) {
                                            arr.push(item?._id)
                                        }
                                        return (
                                            <tr key={item?._id}>
                                                <td>{index + 1}</td>
                                                <td onClick={() => navigator.clipboard.writeText(item?.couponCode)}>{item?.couponCode}</td>
                                                <td>{item?.period}</td>
                                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                    {/* <td onClick={() => { funSendWhatsapp() }}><a style={{ color: '#015CE8' }}><FaWhatsappSquare size={30} /></a></td>
                                                    <td onClick={() => { funSendMessage() }}><a style={{ color: '#015CE8' }}><MdMessage size={30} /></a></td>
                                                    <td onClick={() => { funSendPushNotification() }}><a style={{ color: '#015CE8' }}><MdNotificationsActive size={30} /></a></td> */}
                                                    <td onClick={() => { funSendToUser() }}><a style={{ color: '#015CE8' }}>Send To User</a></td>
                                                </div>
                                                <td><SwitchExample activeUserId={arr} active={item?.isActive} userId={item?._id} changeStatusFun={funDeleteCoupon} /></td>
                                            </tr>
                                        )
                                    })
                                        :
                                        <div className='d-flex justify-content-center bg-secondary mb-3'>
                                            "No Data Found"
                                        </div>

                                }
                            </tbody>
                        </Table>
                }


            </div>
            {
                userNotifModel && <UserNotify />
            }
        </>
    )
}

export default AllCoupon