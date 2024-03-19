
import React, { useState } from 'react';
import { getAllUserAction, exportData, getUserByIdAction, signOut, userStatusChangeAction } from '../../Redux/action';
import { useSelector, useDispatch } from 'react-redux'
import './style.css';
import { Redirect, withRouter } from 'react-router';
import PaginationFun from '../../components/pagination';
import SearchBarForuser from '../../components/SearchBar/SearchBarForuser';
import LeftMenu from '../../components/LeftMenu/leftmenu';
import Header from '../../components/LeftMenu/header';
import { GrRefresh } from "react-icons/gr";
import SwitchExample from '../../components/Switch';
import GoogleMap from '../../components/GoogleMap';
import MapModal from '../../components/GoogleMap/MapModal';
import Verified from '../../verified.png';
import Rejected from '../../rejected.png';
import Preview from '../../preview.png';
import loaderImg from '../../loading.gif'
// import { TiDeleteOutline } from "react-icons/ti";
import { AiFillEye } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
// import { GrUpload } from "react-icons/gr"
import { BsFillFileTextFill } from "react-icons/bs";
import { ImFolderUpload } from "react-icons/im";

import moment from 'moment';
import Switch from "react-switch";
import PaymentModel from '../../components/PaymentModel/paymentModel';
import PushNotificationLogsModel from '../../components/NotificationLog/PushNotificationLogs';
import { NavLink } from "react-router-dom";
import { ExportReactCSV } from '../../components/ExportReactCSV/ExportReactCSV';

const Users = (props) => {
    const [loader, setLoader] = React.useState(false);
    // const [isActive, setIsActive] = React.useState(true);
    const [selectItem, setSelectItem] = React.useState([]);
    const [pageNumber1, setPageNumber] = React.useState();
    const [isShow, showModal] = React.useState(false)
    const [locationArray, setLocation] = React.useState([])
    const [mobileNumber, setMobileNumber] = React.useState([])
    const [mobileNumberFilterPaging, setMobileNumberFilterPaging] = React.useState([])
    const [todayUser, setTodayUser] = React.useState([])
    const [nullLocation, setNullLocation] = React.useState(false);
    // const [userWithNullLocation, setUserWithNullLocation] = React.useState();    
    const [paymentDetailModel, setPaymentDetailModel] = React.useState(false);
    const [pushNotificationLogsModel, setPushNotificationLogsModel] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const [userData, setUserData] = React.useState('');


    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)

    const Alluserdata = user && user[0] && user[0]?.data ? user[0]?.data : []
    const Metadata = user && user[0] && user[0].metadata && user[0].metadata.total ? user[0].metadata.total : null
    const Tabletitle = ["Sr", "All", "Name", "Number", "Gender", "KYC", "Profile", "Logs", "Date", "Address", "Current", "IsUserActive", "Detail", "payment & Logs"];
    const [isActive, setActive] = React.useState(false);
    const pageNumber = props.match.params.pageNumber;
    const [pageNumber2, setPageNumber2] = useState(pageNumber ? pageNumber : 1);



    React.useEffect(async () => {
        await getUsersData();
    }, []);

    React.useEffect(async () => {
        getTodayCreatedUser();
    }, [user]);

    const getTodayCreatedUser = () => {
        const totalNewUserCount = []

        users.map((item) => {
            const todayDate = moment(new Date()).format("MMM Do YY")
            const createDate = moment(item.createdAt).format('MMM Do YY')

            if (todayDate == createDate) {
                totalNewUserCount.push(item.Mobile)
            }
            else {
            }

        })
        setTodayUser(totalNewUserCount)

    }

    /**
     * @description user api call function 
     */
    const getUsersData = async () => {

        var data = {
            pageNumber: pageNumber ? pageNumber : 1,
            mobile: null,
            verified: null,
            radius: null,
            status: null,
            address: null,
            gender: null,
            BloodGroup: null,
            workDivisionId: null,
            noLocation: null
        }

        setLoader(true)
        dispatch(getAllUserAction(data))
            .then((response) => {
                console.log("responseresponseresponse", response)
                setLoader(false)
            })
            .catch((err) => {
                setLoader(false)
            })
    }


    /**
     * @description userDateil api call function
     * @param {*} id 
     */

    const users = [];
    const arr = []
    const doubleUserArr = []
    Alluserdata.forEach(tuser => {
        if (arr.indexOf(tuser._id) == -1) {
            arr.push(tuser._id)
            users.push(tuser)
        }
        else {
            doubleUserArr.push(tuser)
        }
    })
    // console.log("tusertuser", users)


    // users?.map((item) => {
    //     dispatch(getUserByIdAction(item._id)).then(() => {
    //         console.log("usersusersusersusers", item)
    //     })
    // })



    const getUserByIdFun = (id) => {
        // dispatch(getUserByIdAction(id))
        localStorage.setItem("id", id)
        // props.history.replace("/userDetail")
    }
    const openPaymentDetailModel = (item) => {
        setPaymentDetailModel(true)
        setUserData(item)
        // console.log("openPaymentDetailModel clicked")
    }

    /**
     * pagination function 
     * @param {*} data 
     */
    // const handleSearch = (data) => {
    //     data['pageNumber'] = 1;
    //     setLoader(true)
    //     dispatch(getAllUserAction(data))
    //         .then(() => {
    //             setLoader(false)
    //         }).catch(() => {
    //             setLoader(false)
    //         })
    // };

    // const pageChangeFun = (pageNumber) => {
    //     const lenght1 = Alluserdata.length < 20 ? 20 : 20
    //     setPageNumber(pageNumber * lenght1 - 20);
    //     setLoader(true)
    //     dispatch(getAllUserAction({ pageNumber: pageNumber }))
    //         .then(() => {
    //             setLoader(false)
    //         })
    //         .catch(() => {
    //             setLoader(false)
    //         })

    // }
    const pageChangeFun = (pageNumber) => {
        const lenght1 = Alluserdata?.length < 20 ? 20 : 20
        setPageNumber(pageNumber * lenght1 - 20);
        setLoader(true)
        setPageNumber2(pageNumber)
        dispatch(getAllUserAction({ pageNumber: pageNumber }))
            .then(() => {
                setLoader(false)

            })
            .catch(() => {
                setLoader(false)
            })
        setNullLocation(false)

    }

    const handleSearch = (data) => {
        setMobileNumberFilterPaging(data.mobile)
        data['pageNumber'] = 1;
        setLoader(true)
        dispatch(getAllUserAction(data))
            .then(() => {
                setLoader(false)
            })
    };
    const funLeadUser = (data) => {
        data['pageNumber'] = 1;
        setLoader(true)
        dispatch(getAllUserAction(data))
            .then(() => {
                setLoader(false)
            })
    };

    const funSubscriptionUser = (data) => {
        data['pageNumber'] = 1;
        setLoader(true)
        dispatch(getAllUserAction(data))
            .then(() => {
                setLoader(false)
            })
    }

    /**
     * @description when send notification send successfully then number cleat to state function
     * @param {*} a 
     */
    const ClaerNotificationState = (a) => {
        setMobileNumber([])
        setSelectItem([])
    }

    /**
     * select all function
     * @param {*} event 
     */
    const selectAll = (event) => {
        const selectedId = []
        const selectMoblieNumber = []
        const allData = Alluserdata

        for (let item of allData) {
            if (event.target.checked) {
                selectedId.push(item._id)
                selectMoblieNumber.push(item.Mobile)

            }
        }
        setSelectItem(selectedId)
        setMobileNumber(selectMoblieNumber)
    };

    /**
     * @description select one function 
     */
    const selectCheckbox = (e, id, mobile) => {
        if (e.target.checked) {
            setSelectItem(prev => [...prev, id])
            setMobileNumber(prev => [...prev, mobile])
        }
        else {
            setSelectItem(prev => prev.filter(item => id !== item))
            setMobileNumber(prev => prev.filter(item => mobile !== item))
        }

    }
    const logsFun = (userId) => {
        setPushNotificationLogsModel(true)
        setUserId(userId)
    }

    /**
     *@description Refresh user page function
     */
    const refreshFun = () => {
        props.history.replace("/users")
    }



    const toggleClass = () => {
        setActive(!isActive);
    };

    /**
     *@description user  status function
     */

    const allData = Alluserdata
    let activeUserId = []
    for (let item of allData) {
        if (item.Active) {
            activeUserId.push(item._id)
        }
    }
    const changeStatusFun = (data) => {
        dispatch(userStatusChangeAction(data))
    }

    /**
     *@description get live loction using lat long in map function
     * @param {*} lat 
     * @param {*} long 
     */
    const getLatLong = (lat, long) => {
        setLocation([lat, long])
        showModal(true);
    }

    const toggle = () => {
        // data['pageNumber'] = 1;
        setNullLocation(!nullLocation)

        if (!nullLocation) {
            let data = {
                noLocation: true
            };
            setLoader(true)
            dispatch(getAllUserAction(data))
                .then(() => {
                    setLoader(false)
                })
        } else {
            getUsersData()
        }
    }
    // console.log("nullLocation_nullLocation", users);
    return (
        <>
            <LeftMenu isActive={isActive} />
            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain"> <p className="m-0">Users Dashboard</p>
                    <p className="m-0 refreshBtn" onClick={() => refreshFun()}><GrRefresh /> </p>
                </div>
                <div className="col-xl-12 col-lg-12 dashboard-right-panel">

                    <div className="card mb-4 dashboard-right-panel-content">
                        <div className="card-header py-2 dashboard-users-filter-panel">
                            <SearchBarForuser handleSearch={handleSearch} funLeadUser={funLeadUser} funSubscriptionUser={funSubscriptionUser} selectAllMobileNumber={mobileNumber} selectAllId={selectItem} ClearMobileNumber={ClaerNotificationState}
                                placeholder={["phone", "address"]}
                                select="select gender"
                            />
                        </div>
                        <div className="users-result-panel">
                            <div className="totalUserCount">
                                <p> Showing <b>{Metadata}</b> Users</p>
                                <p> Today users {todayUser.length}</p>
                                <div className='d-flex' style={{ gap: "10px" }}>
                                    {!nullLocation && <p>Users with  location</p>}
                                    <Switch onChange={toggle} checked={nullLocation} offColor="#08f"
                                        // height={40}
                                        width={58}
                                        borderRadius={50}
                                        activeBoxShadow="0px 0px 1px 2px #fffc35"
                                        uncheckedHandleIcon={
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%",
                                                    fontSize: 20,
                                                }}
                                            >

                                            </div>

                                        }
                                        checkedHandleIcon={
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%",
                                                    color: "red",
                                                    fontSize: 18,
                                                    background: 'linear-gradient(45deg, rgb(0 0 0 / 0%) 40%, rgb(0 0 0) 58%, rgb(48 7 7 / 0%) 40%)'
                                                }}
                                            >
                                                📍
                                            </div>
                                        }
                                        className="react-switch"
                                        id="small-radius-switch"
                                    />
                                </div>
                                {
                                    nullLocation ?
                                        <p>User with no location:{users.length}</p>
                                        : <p style={{ visibility: 'hidden' }}>0</p>
                                }
                                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                                    <ExportReactCSV fileName={'helpyFinder'} pageNumber={pageNumber2} />
                                </div>
                            </div>



                            <div className="card-body user-result-table-wrapper">
                                {/* <div className="table-responsive portlet user-result-table"> */}
                                <div className="table-responsive-stack table-bordered" style={{ height: '100vh' }}>
                                    <table className="table">
                                        <thead className="thead ">
                                            <tr className="col">
                                                {Tabletitle.map((item, index) => {
                                                    return (
                                                        <>
                                                            {
                                                                item === "All" ? (
                                                                    <th width="70" scope="col" className='text-dark' valign="middle" key={index}><input className="mr-1" type="checkbox"
                                                                        aria-label="Checkbox for following text input" onClick={(e) => selectAll(e)} />{item}</th>
                                                                ) : (
                                                                    <th scope="col" className='text-dark' key={index}>{item}</th>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loader ? <tr className="text-center"><img style={{ width: "40%", marginRight: "100px" }} src={`${loaderImg}`} alt="Document" /></tr> :
                                                users && users?.length > 0 && users.map((item, index) => {
                                                    const docs = item?.idProof[0]?.url === "" && item?.idProof[1]?.url === "" && item?.idProof[2]?.url === "" && item?.idProof[3]?.url === "" ? "notUpload" :
                                                        item?.idProof[0]?.url !== "" || item?.idProof[1]?.url !== "" || item?.idProof[2]?.url !== "" || item?.idProof[3]?.url !== "" ? "upload" : null
                                                    const docs2 =
                                                        (item?.idProof[0]?.url !== "" && item?.idProof[0]?.status === "Rejected") ||
                                                            (item?.idProof[1]?.url !== "" && item?.idProof[1]?.status === "Rejected") ||
                                                            (item?.idProof[2]?.url !== "" && item?.idProof[0]?.status === "Rejected") ||
                                                            (item?.idProof[3]?.url !== "" && item?.idProof[3]?.status === "Rejected") ? "Rejected" : null
                                                    const lat = item && item.livelocation && item.livelocation.lat ? item.livelocation.lat : null
                                                    const long = item && item.livelocation && item.livelocation.long ? item.livelocation.long : null
                                                    return (
                                                        <tr key={index} className={lat && long ? "table-row" : "nullLocation"}
                                                        >
                                                            {/* <td >{pageNumber1 === undefined ? index + 1 : pageNumber1 + 1}</td> */}
                                                            <td>{pageNumber2 == 1 ? index + 1 : pageNumber2 * 100 + index + 1 - 100}</td>
                                                            <td ><input type="checkbox" checked={selectItem.includes(item._id)} onClick={(e) => selectCheckbox(e, item._id, item.Mobile)} onChange={() => { }} aria-label="Checkbox for following text input" /></td>
                                                            <td >{item && item.personalprofile && item.personalprofile.fullName ? item.personalprofile.fullName : null}</td>
                                                            <td onClick={() => navigator.clipboard.writeText(item.Mobile)}>{item.Mobile}</td>
                                                            <td >{item && item.personalprofile && item.personalprofile.gender ? item.personalprofile.gender : null}</td>
                                                            {/* <td >{item && item.personalprofile && item.personalprofile.bloodGroup ? item.personalprofile.bloodGroup : null}</td> */}
                                                            <td >{item.Verified ? <img className="VerifyStatus" src={Verified} /> : item?.idProof.length === 0 ? "EMPTY" : docs === "upload" && docs2 === "Rejected" ? <img className="VerifyStatus" src={Rejected} /> : docs === "upload" ? <ImFolderUpload size={25} color={'green'} title={'docs'} /> : docs === "notUpload" ? "NOT UPLOAD" : "null"} </td>
                                                            {/* <td >{item.Verified ? <img className="VerifyStatus" src={Verified} /> : <img className="VerifyStatus" src={Rejected} />} </td> */}
                                                            <td >{item && item.workDivision && item.workDivision.name ? item.workDivision.name : null}</td>
                                                            {/* <td >{item && item.personalprofile && item.personalprofile.email ? item.personalprofile.email : null}</td> */}
                                                            <td ><BsFillFileTextFill size={25} color={'green'} onClick={() => { logsFun(item._id) }} /></td>
                                                            <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                            <td >{item && item.address && item.address.presentAddress ? item.address.presentAddress : null}</td>
                                                            <td ><a onClick={() => getLatLong(lat, long)} ><button data-toggle="modal" className="btn btn-success" data-target="#exampleModal">Location</button> </a> </td>
                                                            <td ><SwitchExample activeUserId={activeUserId} userId={item._id} active={item.Active} changeStatusFun={changeStatusFun} /></td>
                                                            <td>
                                                                <NavLink
                                                                    to={`/userDetail/${item._id}/${pageNumber2}`}
                                                                    style={({ isActive }) => ({
                                                                        color: isActive ? 'red' : '#015CEB',
                                                                        // background: isActive ? 'red' : 'green',
                                                                        // height: isActive ? 20 : 50
                                                                    })}

                                                                > <AiFillEye size={30} /></NavLink>
                                                                {/* <a href={`/userDetail/${item._id}/${pageNumber2}`}
                                                                    onClick={() =>
                                                                        getUserByIdFun(item._id)}>
                                                                    <AiFillEye size={30} />
                                                                </a> */}
                                                            </td>
                                                            <td onClick={() => openPaymentDetailModel(item)}><FaRupeeSign size={25} color={'green'} title={'Payment'} /></td>
                                                        </tr>
                                                    )
                                                })}
                                        </tbody>
                                    </table>
                                    {nullLocation || mobileNumberFilterPaging.length > 0 ? null :
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="m-0" style={{ fontSize: "14px" }}> Total Page  {Math.ceil(Metadata / 20)} </p>
                                            <PaginationFun totalPage={Metadata} pageChangeFun={pageChangeFun} />
                                        </div>
                                    }


                                </div>
                                {
                                    isShow && locationArray?.length > 0 && <MapModal location={locationArray} />
                                }
                                {
                                    paymentDetailModel && <PaymentModel show={paymentDetailModel} onHide={() => setPaymentDetailModel(false)} userData={userData} />
                                }
                                {
                                    pushNotificationLogsModel && <PushNotificationLogsModel userId={userId} show={pushNotificationLogsModel} onHide={() => setPushNotificationLogsModel(false)} />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default withRouter(Users)