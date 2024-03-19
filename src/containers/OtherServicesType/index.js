import React from 'react'
// import SearchBar from '../../components/SearchBar';
import { getAllOtherServiceTypeAction, getOneOtherServiceTypeAction } from '../../Redux/action/allOtherService/otherServiceTypeAction';
import { useDispatch, useSelector } from 'react-redux'
import SearchBarForuser from '../../components/SearchBar/SearchBarForuser';
import { withRouter } from 'react-router';
import { helpRequesrByIdAction } from '../../Redux/action/Service/serviceAction';
import LeftMenu from '../../components/LeftMenu/leftmenu';
import Header from '../../components/LeftMenu/header'
import PaginationFun from '../../components/pagination';
import request from 'request'
// import Preview from "../../preview.png";
import { AiFillEye } from "react-icons/ai";
import moment from 'moment';


const OtherServicesType = (props) => {
    const [showRequesterAddress, setshowRequesterAddress] = React.useState();
    const [getRequesterAddress, setGetRequesterAddress] = React.useState()

    const dispatch = useDispatch()
    const [pageNumber1, setPageNumber] = React.useState();
    const [loader, setLoader] = React.useState(true);
    const pageNumber = props.match.params.pageNumber;
    const [pageNumber2, setPageNumber2] = React.useState(pageNumber ? pageNumber : 1);
    React.useEffect(() => {
        getOtherServiceData()
    }, [])



    const getOtherServiceData = async () => {
        var data = {
            pageNumber: pageNumber ? pageNumber : 1,
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
        dispatch(getAllOtherServiceTypeAction(data))
            .then((response) => {
                setLoader(false)
            })
            .catch((err) => {
                setLoader(false)
            })
    }

    const otherService = useSelector(state => state.otherService.otherServiceTypeData)
    const st = useSelector(state => state)
    const otherServices = otherService && otherService[0] && otherService[0]?.data ? otherService[0]?.data : []
    const Metadata = otherService && otherService[0] && otherService[0]?.metadata && otherService[0]?.metadata?.total ? otherService[0]?.metadata.total : []

    const handleSearch = (data) => {
        data['pageNumber'] = 1;
        setLoader(true)
        dispatch(getAllOtherServiceTypeAction(data))
            .then(() => {
                setLoader(false)
            })
    };
    const pageChangeFun = (pageNumber) => {
        const lenght1 = otherService?.length < 20 ? 20 : 20
        setPageNumber(pageNumber * lenght1 - 20);
        setPageNumber2(pageNumber)
        setLoader(true)
        dispatch(getAllOtherServiceTypeAction({ pageNumber: pageNumber }))
            .then(() => {
                setLoader(false)
            })
            .catch(() => {
                setLoader(false)
            })

    }

    const getUserByIdFun = (id) => {
        dispatch(helpRequesrByIdAction(id))
        props.history.replace("/OtherServicesTypeDetail")
    }
    const [isActive, setActive] = React.useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };

    const [selectItem, setSelectItem] = React.useState([]);
    const selectAll = (event) => {
        const selectedId = []

        const allData = otherServices

        for (let TableDetailItem of allData) {
            if (event.target.checked) {
                selectedId.push(TableDetailItem._id)

            }
        }
        setSelectItem(selectedId)
    };

    const selectCheckbox = (e, id) => {

        if (e.target.checked) {
            setSelectItem(prev => [...prev, id])
        }
        else {
            setSelectItem(prev => prev.filter(TableDetailItem => id !== TableDetailItem))
        }

    }


    const getRequestAddressFun = async (index, item) => {
        if (item && item.requesterLiveLocation && item.requesterLiveLocation.lat) {
            let lat = item && item.requesterLiveLocation && item.requesterLiveLocation.lat;
            let long = item && item.requesterLiveLocation && item.requesterLiveLocation.long;
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
        setshowRequesterAddress(index);

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
    const getOtherServiveTypeDataByAlertIdFun = (id) => {
        // dispatch(getOneOtherServiceTypeAction(id));
        // localStorage.setItem("id:::", id._id);
        props.history.push("/OtherServicesTypeDetail", id);
    };
    return (
        <>
            <LeftMenu isActive={isActive} />
            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain">Other Service type</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="w-100">
                            <div className="card mb-4">
                                <div className="card-header py-2">
                                    <SearchBarForuser handleSearch={handleSearch}
                                        placeholder={["phone", "address"]}
                                        select="select gender"
                                    />
                                </div>



                                <div className="card-body ">
                                    <div className="table-responsive portlet">
                                        <table className="table">
                                            <thead className="thead ">
                                                <tr className="col">
                                                    <th scope="col">No</th>
                                                    <th width="100px" scope="col" ><input type="checkbox"
                                                        aria-label="Checkbox for following text input" onClick={(e) => selectAll(e)} />select All</th>
                                                    <th scope="col">Tracking ID</th>
                                                    <th scope="col">Requester Phone Number</th>
                                                    <th scope="col">Requester Name</th>

                                                    <th scope="col">Requester Location</th>
                                                    <th scope="col">Request type</th>
                                                    <th scope="col">Request Initiated Time</th>
                                                    <th scope="col">Photo Uploade by User</th>
                                                    <th scope="col">User Comment</th>
                                                    <th scope="col">User Status </th>
                                                    <th scope="col">Document Status</th>
                                                    <th scope="col">Job Status</th>
                                                    <th scope="col">Details</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loader ? <tr><td>Loading......</td></tr> :
                                                    otherServices && otherServices?.length > 0 && otherServices?.map((item, index) => {
                                                        console.log("otherServicesotherServices", item)
                                                        const date = new Date(item.createdAt);
                                                        const serviceDataId = item && item?.documents[0] && item?.documents[0]?.serviceDataId;
                                                        const _id = item[index] && item[index]?.serviceData && item[index]?.serviceData?._id
                                                        var date1 = date.toLocaleDateString() + ' ' + date.toTimeString().substring
                                                            (0, date.toTimeString().indexOf("GMT"));
                                                        return (
                                                            <tr className="table-row">
                                                                {/* <td onClick={() => getUserByIdFun(item._id)}>{pageNumber1 === undefined ? index + 1 : pageNumber1 + index + 1}</td> */}
                                                                <td>{pageNumber2 === 1 ? index + 1 : pageNumber2 * 20 + index + 1 - 20}</td>
                                                                <td >
                                                                    <input type="checkbox"
                                                                        checked={selectItem.includes(item._id)}
                                                                        onClick={(e) => selectCheckbox(e, item._id)}
                                                                        aria-label="Checkbox for following text input" />
                                                                </td>
                                                                <td>{item.serviceData && item.serviceData.trackingId ? item.serviceData.trackingId : null}</td>
                                                                <td onClick={() => navigator.clipboard.writeText(item.requester.Mobile)}>{item.requester && item.requester.Mobile ? item.requester.Mobile : null}</td>
                                                                <td>{item.requesterProfile && item.requesterProfile.fullName ? item.requesterProfile.fullName : null}</td>
                                                                <td onClick={(e) => getRequestAddressFun(index, item)}>
                                                                    {showRequesterAddress === index ? getRequesterAddress :
                                                                        <button className="btn btn-primary" style={{ width: "80%", height: "30px", fontSize: "8px" }}>get requester address</button>}
                                                                </td>
                                                                <td>{item.requestType}</td>
                                                                {/* <td>{date1 ? date1 : null}</td> */}
                                                                <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                                <td>{item.documents && item.documents.url ? item.documents.url : item.documents.length} / 4</td>
                                                                <td>{item.serviceData && item.serviceData.comment ? item.serviceData.comment : null}</td>
                                                                <td>{item.status}</td>
                                                                <td>{item.requester && `${item.requester.Verified}` ? `${item.requester.Verified}` : null}</td>
                                                                <td>{item.requester && `${item.requester.Active}` ? `${item.requester.Active}` : null}</td>
                                                                <td
                                                                // onClick={() =>
                                                                //     getOtherServiveTypeDataByAlertIdFun(serviceDataId)
                                                                // }
                                                                >
                                                                    <a href={`/OtherServicesTypeDetail/${item?.serviceData?._id}/${pageNumber2}`} >
                                                                        {/* <img className="VerifyStatus" src={Preview} /> */}
                                                                        <AiFillEye size={30} />
                                                                    </a>
                                                                </td>
                                                            </tr>

                                                        )
                                                    })}
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="m-0" style={{ fontSize: "14px" }}> Total item {Metadata}</p>
                                        <p className="m-0" style={{ fontSize: "14px" }}> Total Page  {Metadata / 20}</p>
                                        <PaginationFun totalPage={Metadata} pageChangeFun={pageChangeFun} pagenumber={pageNumber} />
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            </div >


        </>
    )
}

export default withRouter(OtherServicesType)
