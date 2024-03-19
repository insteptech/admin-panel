import React from 'react'
import LeftMenu from '../../components/LeftMenu/leftmenu';
import Header from '../../components/LeftMenu/header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscriptionDetail } from '../../Redux/action/razorPay/leads&Subscription';
import loaderImg from '../../loading.gif'



const Leads = () => {
    const [isActive, setActive] = useState(false);
    const [loader, setLoader] = useState(false);
    const [subcriptionData, setSubscriptionData] = useState([]);
    // const [selectItem, setSelectItem] = React.useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        getSubscriptionDetail();
    }, [])
    const getSubscriptionDetail = async () => {
        setLoader(true);
        await dispatch(subscriptionDetail()).then((result) => {
            setSubscriptionData(result);
            setLoader(false);
        }).catch((err) => {
            console.log("eeeeee", err)
            setLoader(false);
        })

    }
    // const selectCheckbox = (e, item, id) => {
    //     if (e.target.checked) {
    //         setSelectItem(prev => [...prev, item?._id])
    //     }
    //     else {
    //         setSelectItem(prev => prev.filter(item => id !== item))
    //     }
    // }

    const toggleClass = () => {
        setActive(!isActive);
    };

    return (
        <>
            <LeftMenu isActive={isActive} />
            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain">
                    <p className="m-0">Subscription</p>
                </div>
                {
                    loader ?
                        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} >
                            <tr>< img src={`${loaderImg}`} alt="Document" /></tr>
                        </div>
                        :
                        <table className="table table-striped table-bordered table-sm table-responsive">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col">S.No</th>
                                    {/* <th scope="col">All</th> */}
                                    <th scope="col">Name</th>
                                    {/* <th scope="col">Email</th> */}
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Onetime Id</th>
                                    <th scope="col">Onetime</th>
                                    <th scope="col">access_oneTime_amberAlert</th>
                                    <th scope="col">Subscription</th>
                                    {/* <th scope="col">razorpay_payment_id_subscription</th> */}
                                    {/* <th scope="col">customer_id</th> */}
                                    <th scope="col">subscription_id</th>
                                    <th scope="col">Subscription_Plan_Name</th>
                                    <th scope="col">Lifetime Id</th>
                                    <th scope="col">access_monthly</th>
                                    <th scope="col">access_yearly</th>
                                    <th scope="col">access_FullServices</th>
                                    <th scope="col">Subscription_Amount</th>
                                    <th scope="col">start_date</th>
                                    <th scope="col">end_date</th>
                                    <th scope="col">couponId</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subcriptionData.length > 0 ? subcriptionData?.map((item, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    {/* <td ><input type="checkbox" checked={selectItem.includes(item._id)} onClick={(e) => selectCheckbox(e, item, item?._id)} aria-label="Checkbox for following text input" /></td> */}
                                                    <td>{item?.personalInformation?.fullName}</td>
                                                    <td>{item?.usersDetail?.Mobile}</td>
                                                    <td>{item?.razorpay_payment_id_oneTime}</td>
                                                    <td>{item?.typeOfPayment_oneTime}</td>
                                                    <td>{item?.access_oneTime_amberAlert}</td>
                                                    <td>{item?.typeOfPayment_subscription}</td>
                                                    {/* <td>{item?.razorpay_payment_id_subscription}</td> */}
                                                    <td>{item?.subscription_id}</td>
                                                    <td>{item?.Subscription_Plan_Name}</td>
                                                    <td>{item?.razorpay_payment_id_lifeTime}</td>
                                                    <td>{item?.access_monthly}</td>
                                                    <td>{item?.access_yearly}</td>
                                                    <td>{item?.access_FullServices}</td>
                                                    <td>{item?.Subscription_Amount}</td>
                                                    <td>{new Date(item?.start_date).toLocaleString()}</td>
                                                    <td>{new Date(item?.end_date).toLocaleString()}</td>
                                                    <td>{item?.couponId}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                        :
                                        <div>
                                            No Data!!!
                                        </div>
                                }
                            </tbody>
                        </table>

                }




            </div >
        </>
    )
}

export default Leads;