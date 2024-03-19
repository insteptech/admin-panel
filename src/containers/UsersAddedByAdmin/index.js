

import React from 'react';
import { getUserByIdAction, getAllUserAddedByAdminAction, signOut, userStatusChangeAction } from '../../Redux/action';
import { useSelector, useDispatch } from 'react-redux'
// import './userAddedByadmin.scss';
import { withRouter } from 'react-router';
import PaginationFun from '../../components/pagination';
import SearchBarForuser from '../../components/SearchBar/SearchBarForuser';
import LeftMenu from '../../components/LeftMenu/leftmenu';
import Header from '../../components/LeftMenu/header';
import { GrRefresh } from "react-icons/gr";
import loaderImg from '../../loading.gif'
import Verified from '../../verified.png';
import Rejected from '../../rejected.png';
import Preview from '../../preview.png';
import SwitchExample from '../../components/Switch';
import MapModal from '../../components/GoogleMap/MapModal';

const UserAddedByAdmin = (props) => {
    const [_id, setId] = React.useState()
    const [selectItem, setSelectItem] = React.useState([]);
    const [pageNumber1, setPageNumber] = React.useState();
    const [loader, setLoader] = React.useState(true);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.UsersAddedByAdmin)
    const Alluserdata = user && user[0] && user[0].data ? user[0].data : []
    const [isShow, showModal] = React.useState(false)
    const [locationArray, setLocation] = React.useState([])
    const [mobileNumber, setMobileNumber] = React.useState([])
    React.useEffect(() => {
        getUsersData()
    }, []);
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
        }

        // setLoader(true)
        // if(Alluserdata.length>0){
        //     setLoader(false)
        // }
        dispatch(getAllUserAddedByAdminAction(data)).then((data) => {
            setLoader(false);
        }).catch((err) => {
            console.log(err, 'getAllUserAddedByAdminAction, err::')
            setLoader(false);
        })
    }

    const Metadata = user && user[0] && user[0].metadata && user[0].metadata.total ? user[0].metadata.total : null
    

    const handleSearch = (data) => {
        data['pageNumber'] = 1;
        setLoader(true)
        dispatch(getAllUserAddedByAdminAction(data)).then(() => {
            setLoader(false)
        });
    };
    const getUserByIdFunction = (id) => {
        dispatch(getUserByIdAction(id))
        localStorage.setItem("id", id)
        props.history.replace(`/userDetail/${id}/${1}`)
    }
    const pageChangeFun = (pageNumber) => {
        const lenght1 = Alluserdata.length < 20 ? 20 : 20
        setPageNumber(pageNumber * lenght1 - 20);
        setLoader(true)
        dispatch(getAllUserAddedByAdminAction({ pageNumber: pageNumber }))
            .then(() => {
                setLoader(false);
            }).catch(() => {
                setLoader(false);
            })


    }
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


    const getLatLong = (lat, long) => {
        setLocation([lat, long])
        showModal(true);
    }
    const selectAll = (event) => {
        const selectedId = []
        const selectMoblieNumber = []
        const allData = Alluserdata

        for (let item of allData) {
            if (event.target.checked) {
                selectedId.push(item._id)
                selectMoblieNumber.push(item.Mobile)

            } else {
                setMobileNumber([])
            }
        }
        setSelectItem(selectedId)
        setMobileNumber(selectMoblieNumber)

    }
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

    const Tabletitle = ["No", "Select All", "Name", "Phone Number", "Gender", "Blood Group", "DocStatus", "Profile",
        "Email", "Address", "current", "IsUserActive", "Detail",];
    const refreshFun = () => {
        // props.history.replace("/users")
    }
    const [isActive, setActive] = React.useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };



    return (
        <>
            <LeftMenu isActive={isActive} />
            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain">
                    <p className="m-0"> Users Added By Admin Dashboard</p>
                    <p className="m-0 refreshBtn" onClick={() => refreshFun()}><GrRefresh /> </p>
                </div>
                <div className="card mb-4">
                    <div className="card-header py-2">
                        <SearchBarForuser handleSearch={handleSearch} selectAllMobileNumber={mobileNumber} selectAllId={selectItem}
                            placeholder={["phone", "address"]}
                            select="select gender"
                        />
                    </div>
                    {
                        loader ? <tr className="text-center"><img src={`${loaderImg}`} alt="Document" /></tr>
                            :

                            <div className="card-body ">
                                <div className="table-responsive portlet">
                                    <table className="table table-bordered table-striped">
                                        <thead className="thead ">
                                            <tr className="col">
                                                {Tabletitle.map((item, index) => {
                                                    return (
                                                        <>
                                                            {
                                                                item === "Select All" ? (
                                                                    <th width="100" scope="col" key={index}><input className="mr-1" type="checkbox"
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
                                            {
                                                Alluserdata && Alluserdata.length > 0 && Alluserdata.map((item, index) => {
                                                    const lat = item && item.livelocation && item.livelocation.lat ? item.livelocation.lat : null
                                                    const long = item && item.livelocation && item.livelocation.long ? item.livelocation.long : null
                                                    return (
                                                        <tr className="table-row" key={index}
                                                        >
                                                            <td>{pageNumber1 === undefined ? index + 1 : pageNumber1 + index + 1}</td>
                                                            <td >
                                                                <input type="checkbox"
                                                                    checked={selectItem.includes(item._id)}
                                                                    onClick={(e) => selectCheckbox(e, item._id, item.Mobile)} aria-label="Checkbox for following text input" />
                                                            </td>
                                                            <td>{item && item.personalprofile && item.personalprofile.fullName ? item.personalprofile.fullName : null}</td>
                                                            <td onClick={() => navigator.clipboard.writeText(item.Mobile)}>{item.Mobile}</td>
                                                            <td >{item && item.personalprofile && item.personalprofile.gender ? item.personalprofile.gender : null}</td>
                                                            <td >{item && item.personalprofile && item.personalprofile.bloodGroup ? item.personalprofile.bloodGroup : null}</td>
                                                            <td >{item.Verified ? <img className="VerifyStatus" src={Verified} /> : <img className="VerifyStatus" src={Rejected} />} </td>
                                                            <td >{item && item.workDivision && item.workDivision.name ? item.workDivision.name : null}</td>
                                                            <td >{item && item.personalprofile && item.personalprofile.email ? item.personalprofile.email : null}</td>
                                                            <td >{item && item.address && item.address.presentAddress ? item.address.presentAddress : null}</td>
                                                            <td><a onClick={() => getLatLong(lat, long)} ><button data-toggle="modal" className="btn btn-success" data-target="#exampleModal">Location</button> </a> </td>
                                                            <td><SwitchExample activeUserId={activeUserId} userId={item._id} active={item.Active} changeStatusFun={changeStatusFun} /></td>
                                                            <td onClick={() => getUserByIdFunction(item._id)}><img className="VerifyStatus" src={Preview} /></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    isShow && locationArray.length > 0 && <MapModal location={locationArray} />
                                }
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="m-0" style={{ fontSize: "14px" }}> Total item {Metadata}</p>
                                    <p className="m-0" style={{ fontSize: "14px" }}> Total Page  {Metadata / 20}</p>
                                    <PaginationFun totalPage={Metadata} pageChangeFun={pageChangeFun} />
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withRouter(UserAddedByAdmin)