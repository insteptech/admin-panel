import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import loaderImg from '../../loading.gif'
// import { useSelector, useDispatch } from 'react-redux';
import { paymentLogs } from '../../Redux/action/razorPay/paymentLog';
import moment from 'moment';

// const dummyPaymentData = [
//     '08-022022',
//     '08-03-2022',
//     '+911234567890'
// ]
const dummyPaymentData = [{
    name: 'Mandeep',
    email: 'mandeep@gmail.com',
    mobileNumber: '+911234567890',
    startingDate: '08-02-2022',
    endingDate: '08-03-2022',
    amount: 100,
    status: 'Active',
    subscriptionName: 'HelyFinder Plan',
},
];

const PaymentModel = (props) => {
    const dispatch = useDispatch()
    const [loader, setLoader] = React.useState(false);
    const [logs, setLogs] = React.useState([]);
    const Tabletitle = ["Name", "Email", "Mobile Number", "Staring Date", "Ending Date", "Amount", 'Subscription Name', 'subscription_id', 'one_time_payment_id'];



    React.useEffect(async () => {

        const result = await dispatch(paymentLogs(props?.userData?._id));

        const arr = [];
        if (result) {
            arr.push(result.getOnetimePaymentAvail)
            setLogs(arr);
        }


    }, [props])
    console.log(logs, "ItemModalItemModalItemModal")

    // const [loader, setLoader] = React.useState(false)
    const [subScriptionData, setSubscriptionData] = React.useState()
    // const Tabletitle = ["Name", "Email", "Mobile Number", "Staring Date", "Ending Date", "Amount", "Status", 'Subscription Name', 'Subscription Id'];

    // const dispatch = useDispatch();
    const arr = []



    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation='false'
            scrollable='true'
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Payment Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <table className="table">
                        <thead className="thead ">
                            <tr className="col">
                                {Tabletitle.map((item, index) => {

                                    return (
                                        <>
                                            <th scope="col" className='text-dark' key={index}>{item}</th>
                                        </>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {

                                logs[0] === null ?
                                    'No Data Found'
                                    :

                                    logs?.map((item, index) => {
                                        const name = props?.userData?.personalprofile?.fullName ? props?.userData?.personalprofile?.fullName : 'null';
                                        const email = props?.userData?.personalprofile?.email ? props?.userData?.personalprofile?.email : 'null';
                                        const mobile = props?.userData?.Mobile ? props?.userData?.Mobile : 'null';
                                        const str = `${item?.Subscription_Amount}`;
                                        const resStr = str.substring(0, str.length - 2) + "." + str.substring(str.length - 2);
                                        // const amount =  parseInt(resStr);
                                        const startDate = item?.start_date ? moment.unix(item?.start_date).format('MMMM Do YYYY') : "-----";
                                        const endDate = item?.end_date ? moment.unix(item?.end_date).format('MMMM Do YYYY') : '-----';
                                        console.log("xdmbvjhfgbvjkfnvf.", item)

                                        return (
                                            <tr key={index} className="table-row"  >
                                                <td>{name}</td>
                                                <td>{email}</td>
                                                <td>{mobile}</td>
                                                <td>{startDate}</td>
                                                <td>{endDate}</td>
                                                <td>{resStr}</td>
                                                {/* <td style={{ color: item.status === 'Active' ? 'green' : 'red', fontSize: 15 }}>{item.status}</td> */}
                                                <td>{item?.Subscription_Plan_Name}</td>
                                                <td>{item?.subscription_id ? item?.subscription_id : 'null'}</td>
                                                <td>{item?.razorpay_payment_id_oneTime ? item?.razorpay_payment_id_oneTime : 'null'}</td>
                                            </tr>
                                        )
                                    })
                            }
                            {/* {
                                Object.keys(subScriptionData).map((item, index) => {
                                    console.log(item, "subScriptionData");
                                    // return (
                                    //     <tr key={index} className="table-row"  >
                                    //         <td>{item.Subscription_Amount}</td>
                                    //         <td style={{ color: item.status === 'Active' ? 'green' : 'red', fontSize: 15 }}>{item.access_FullServices}</td>
                                    //         <td>{item.Subscription_Plan_Name}</td>
                                    //     </tr>
                                    // )
                                })
                            } */}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button size='lg' variant='link' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    )

}

export default PaymentModel