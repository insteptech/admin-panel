
import React from 'react';
import { getAllUserAction, getUserByIdAction, signOut, userStatusChangeAction } from '../../Redux/action';
import { useSelector, useDispatch } from 'react-redux'
import '../../containers/Users/style.css';
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

const UserNotify = (props) => {
    const [loader, setLoader] = React.useState(false);
    const [selectItem, setSelectItem] = React.useState([]);
    const [pageNumber1, setPageNumber] = React.useState();
    const [pageNumber2, setPageNumber2] = React.useState(1);
    const [isShow, showModal] = React.useState(false)
    const [locationArray, setLocation] = React.useState([])
    const [mobileNumber, setMobileNumber] = React.useState([])
    const [userNotify, setUserNotify] = React.useState(false)

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)

    const Alluserdata = user && user[0] && user[0]?.data ? user[0]?.data : []
    const Metadata = user && user[0] && user[0].metadata && user[0].metadata.total ? user[0].metadata.total : null
    const Tabletitle = ["Sr", "All", "Name", "Number", "Gender", "Blood", "DocStatus", "Profile", "Email", "Address", "Current", "IsUserActive", "User Status"];
    const [isActive, setActive] = React.useState(false);
    console.log("useruseruseruseruser", user)
    React.useEffect(() => {
        getUsersData()
    }, []);

    /**
     * @description user api call function 
     */
    const getUsersData = async () => {
        var data = {
            pageNumber: 1,
            mobile: null,
            verified: null,
            radius: null,
            status: null,
            address: null,
            gender: null,
            BloodGroup: null,
            workDivisionId: null
        }

        setLoader(true)
        dispatch(getAllUserAction(data))
            .then((response) => {
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
        setPageNumber2(pageNumber)
        setLoader(true)
        dispatch(getAllUserAction({ pageNumber: pageNumber }))
            .then(() => {
                setLoader(false)
            })
            .catch(() => {
                setLoader(false)
            })

    }
    const handleSearch = (data) => {
        data['pageNumber'] = 1;
        setLoader(true)
        dispatch(getAllUserAction(data))
            .then(() => {
                setLoader(false)
            })
    };

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
            // console.log(item.Mobile,"item");
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
        // console.log(e.target.checked, "e.target.checked");
        if (e.target.checked) {
            setSelectItem(prev => [...prev, id])
            setMobileNumber(prev => [...prev, mobile])
        }
        else {
            setSelectItem(prev => prev.filter(item => id !== item))
            setMobileNumber(prev => prev.filter(item => mobile !== item))
        }

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

    return (
        <>
            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain"> <p className="m-0">Users Dashboard</p>
                    <p className="m-0 refreshBtn" onClick={() => refreshFun()}><GrRefresh /> </p>
                </div>
                <div className="card mb-4">
                    <div className="card-header py-2">
                        <SearchBarForuser handleSearch={handleSearch} selectAllMobileNumber={mobileNumber} selectAllId={selectItem} ClearMobileNumber={ClaerNotificationState} v amberAlertName={props?.amberAlertName}
                            placeholder={["phone", "address"]}
                            select="select gender"
                        />
                    </div>
                    <div className="card-body ">
                        <div className="table-responsive portlet">
                            <table className="table table-bordered table-striped">
                                <thead className="thead ">
                                    <tr className="col">
                                        {Tabletitle.map((item, index) => {
                                            return (
                                                <>
                                                    {
                                                        item === "All" ? (
                                                            <th width="70" scope="col" key={index}><input className="mr-1" type="checkbox"
                                                                aria-label="Checkbox for following text input" onClick={(e) => selectAll(e)} />{item}</th>
                                                        ) : (
                                                            <th scope="col" key={index}>{item}</th>
                                                        )
                                                    }
                                                </>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loader ? <tr className="text-center"><img style={{ width: "40%", marginRight: "200px" }} src={`${loaderImg}`} alt="Document" /></tr> :
                                        Alluserdata && Alluserdata?.length > 0 && Alluserdata.map((item, index) => {
                                            const lat = item && item.livelocation && item.livelocation.lat ? item.livelocation.lat : null
                                            const long = item && item.livelocation && item.livelocation.long ? item.livelocation.long : null
                                            console.log("dkjcjhckjfvckhgwqvcjhwc", item);
                                            return (
                                                <tr className="table-row" key={index}
                                                >
                                                    <td>{pageNumber1 === undefined ? index + 1 : pageNumber1 + index + 1}</td>
                                                    <td ><input type="checkbox" checked={selectItem.includes(item._id)} onClick={(e) => selectCheckbox(e, item._id, item.Mobile)} aria-label="Checkbox for following text input" /></td>
                                                    <td >{item && item.personalprofile && item.personalprofile.fullName ? item.personalprofile.fullName : null}</td>
                                                    <td onClick={() => navigator.clipboard.writeText(item.Mobile)}>{item.Mobile}</td>
                                                    <td >{item && item.personalprofile && item.personalprofile.gender ? item.personalprofile.gender : null}</td>
                                                    <td >{item && item.personalprofile && item.personalprofile.bloodGroup ? item.personalprofile.bloodGroup : null}</td>
                                                    <td >{item.Verified ? <img className="VerifyStatus" src={Verified} /> : <img className="VerifyStatus" src={Rejected} />} </td>
                                                    <td >{item && item.workDivision && item.workDivision.name ? item.workDivision.name : null}</td>
                                                    <td >{item && item.personalprofile && item.personalprofile.email ? item.personalprofile.email : null}</td>
                                                    <td >{item && item.address && item.address.presentAddress ? item.address.presentAddress : null}</td>
                                                    <td><a onClick={() => getLatLong(lat, long)} ><button data-toggle="modal" className="btn btn-success" data-target="#exampleModal">Location</button> </a> </td>
                                                    <td><SwitchExample activeUserId={activeUserId} userId={item._id} active={item.Active} changeStatusFun={changeStatusFun} /></td>
                                                    <td>
                                                        {item && item.Verified ?
                                                            "Verified"
                                                            : "Not Verified"}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0" style={{ fontSize: "14px" }}> Total item {Metadata}</p>
                                <p className="m-0" style={{ fontSize: "14px" }}> Total Page  {Metadata / 20}</p>
                                <PaginationFun totalPage={Metadata} pageChangeFun={pageChangeFun} userNotify={userNotify} pagenumber={pageNumber2} />
                            </div>

                        </div>
                        {
                            isShow && locationArray?.length > 0 && <MapModal location={locationArray} />
                        }

                    </div>

                </div>
            </div>
        </>
    )
}
export default withRouter(UserNotify);