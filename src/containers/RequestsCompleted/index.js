import React from 'react'
// import SearchBar from '../../components/SearchBar'
import { useSelector, useDispatch } from 'react-redux'
import LeftMenu from '../../components/LeftMenu/leftmenu'
import Header from '../../components/LeftMenu/header'
import request from 'request'
import SearchBarForuser from '../../components/SearchBar/SearchBarForuser'
import { completeRequestAction } from '../../Redux/action'
import PaginationFun from '../../components/pagination'
const RequestCompleted = () => {


    const [loader, setLoader] = React.useState(false);
    const [selectItem, setSelectItem] = React.useState([]);
    const [pageNumber1, setPageNumber] = React.useState();
    const [showRequesterAddress, setshowRequesterAddress] = React.useState();
    const [getRequesterAddress, setGetRequesterAddress] = React.useState()
    const [showHelperAddress, setShowHelperAddress] = React.useState()
    const [getHelperAddress, setHelperAddress] = React.useState()
    const dispatch = useDispatch()

    const allLiveRequestData = useSelector(state => state.liveRequest)

    const completLiveRequestsForAdmin = allLiveRequestData && allLiveRequestData?.completLiveRequestsForAdmin &&
        allLiveRequestData?.completLiveRequestsForAdmin[0] && allLiveRequestData?.completLiveRequestsForAdmin[0]?.data ? allLiveRequestData.completLiveRequestsForAdmin[0].data : []

    const Metadata1 = allLiveRequestData && allLiveRequestData.completLiveRequestsForAdmin &&
        allLiveRequestData.completLiveRequestsForAdmin[0] && allLiveRequestData.completLiveRequestsForAdmin[0].metadata && allLiveRequestData.completLiveRequestsForAdmin[0].metadata.total
        ? allLiveRequestData.completLiveRequestsForAdmin[0].metadata.total : []

    React.useEffect(() => {
        getLiveRequestData()

    }, [])

    const pageChangeFun = (pageNumber) => {
        const lenght1 = completLiveRequestsForAdmin.length < 20 ? 20 : 20
        setPageNumber(pageNumber * lenght1 - 20);
        setLoader(true)
        dispatch(completeRequestAction({ pageNumber: pageNumber }))
            .then(() => {
                setLoader(false)
            })
            .catch(() => {
                setLoader(false)
            })

    }
    const handleSearch = (data) => {
        data['pageNumber'] = 1;
        dispatch(completeRequestAction(data));
    };

    const selectAll = (event) => {
        const selectedId = []
        const allData = completLiveRequestsForAdmin

        for (let item of allData) {
            if (event.target.checked) {
                selectedId.push(item._id)
                // setMobileNumber(prev => [...prev, mobile])

            }
        }
        setSelectItem(selectedId)
    }
    const selectCheckbox = (e, id) => {

        if (e.target.checked) {
            setSelectItem(prev => [...prev, id])
        }
        else {
            setSelectItem(prev => prev.filter(item => id !== item))
            // setMobileNumber(prev => prev.filter(item => mobile !== item))
        }

    }
    const getLiveRequestData = async () => {
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
        setLoader(true)
        dispatch(completeRequestAction(data))
            .then((data) => {
                setLoader(false)
            }).catch((err) => {
                setLoader(false)
            })
    }




    const title = ["Select All", "Request Type",
        "Requester Phone Number", "Requester Name",
        "Requester location", "Request Initiated Time",
        "Provider Phone Name", "Provider Name", "Provider CURRENT real time location",
        "Realtime Distance", 'Completed session'
    ]
    const [isActive, setActive] = React.useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };




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
    const getHelperAddressFun = async (index, item) => {
        if (item && item.helperLiveLocation && item.helperLiveLocation.lat) {
            let lat = item && item.helperLiveLocation && item.helperLiveLocation.lat;
            let long = item && item.helperLiveLocation && item.helperLiveLocation.long;
            var options = {
                'method': 'GET',
                'url': `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU`,
                'headers': {
                }
            };
            let res = await doRequest(options);
            var addressResult = JSON.parse(res);
            if (addressResult && addressResult.results[0] && addressResult.results[0].formatted_address) {
                setHelperAddress(addressResult.results[0].formatted_address)
            }
        }
        setShowHelperAddress(index);

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
    return (
        <>
            <LeftMenu isActive={isActive} />

            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain"> Report Page</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="w-100">
                            <div className="card shadow mb-4">
                                <div className="card-header py-2">
                                    <SearchBarForuser handleSearch={handleSearch}
                                        placeholder={["phone", "address"]}
                                        select="select gender"
                                    />
                                </div>
                                <div className="card-body ">
                                    <div className="table-responsive portlet">
                                        <table className="table table-bordered table-hover">
                                            <thead className="thead ">
                                                <tr className="col">
                                                    <th scope="col">No</th>
                                                    <th scope="col" width="100" ><input type="checkbox" className="mr-1"
                                                        aria-label="Checkbox for following text input" onClick={(e) => selectAll(e)} /></th>
                                                    <th scope="col">Request Type</th>
                                                    <th scope="col">Requester Phone Number</th>
                                                    <th scope="col">Requester Name</th>
                                                    <th scope="col">Requester Location</th>
                                                    <th scope="col">Request Initiated Time</th>
                                                    <th scope="col">Provider Phone Number</th>
                                                    <th scope="col">Provider Name</th>
                                                    <th scope="col">Provider CURRENT real time location</th>
                                                    <th scope="col">Realtime Distance</th>
                                                    <th scope="col">status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {completLiveRequestsForAdmin && completLiveRequestsForAdmin?.length > 0 && completLiveRequestsForAdmin.map((item, index) => {
                                                    const date = new Date(item.createdAt);
                                                    var date1 = date.toLocaleDateString() + ' ' + date.toTimeString().substring
                                                        (0, date.toTimeString().indexOf("GMT"));
                                                    return (
                                                        <tr key={index} className="table-row">
                                                            <td>{pageNumber1 === undefined ? index + 1 : pageNumber1 + index + 1}</td>
                                                            <td >
                                                                <input type="checkbox"
                                                                    checked={selectItem.includes(item._id)}
                                                                    onClick={(e) => selectCheckbox(e, item._id)} aria-label="Checkbox for following text input" />
                                                            </td>

                                                            <td>{item.requestType}</td>
                                                            <td>{item.requester && item.requester.Mobile ? item.requester.Mobile : '--'}</td>
                                                            <td>{item.requesterProfile && item.requesterProfile.fullName ? item.requesterProfile.fullName : '--'}</td>
                                                            <td onClick={(e) => getRequestAddressFun(index, item)}>
                                                                {showRequesterAddress === index ? getRequesterAddress :
                                                                    <button className="btn btn-primary" style={{ width: "80%", height: "30px", fontSize: "8px" }}>get requester address</button>}
                                                            </td>
                                                            <td>{date1 ? date1 : null}</td>
                                                            <td>    {item.helper && item.helper.Mobile ? item.helper.Mobile : '--'}</td>
                                                            <td>{item.helperProfile && item?.helperProfile?.fullName ? item.helperProfile.fullName : '--'}</td>
                                                            {
                                                                <td onClick={(e) => getHelperAddressFun(index, item)}>
                                                                    {showHelperAddress === index ? getHelperAddress :
                                                                        <button className="btn btn-primary" style={{ width: "80%", height: "30px", fontSize: "8px" }}>get helper address</button>}</td>
                                                            }
                                                            <td>{item.distance}</td>
                                                            <td>{item.status}</td>
                                                        </tr>
                                                    )


                                                })}

                                            </tbody>
                                        </table>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="m-0" style={{ fontSize: "14px" }}> Total item {Metadata1}</p>
                                            <p className="m-0" style={{ fontSize: "14px" }}> Total Page  {Metadata1 / 20}</p>
                                            <PaginationFun totalPage={Metadata1} pageChangeFun={pageChangeFun} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestCompleted
