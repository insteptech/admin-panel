import React from 'react'
// import SearchBar from '../../components/SearchBar'
import { useSelector, useDispatch } from 'react-redux'
import PaginationFun from '../../components/pagination'
import { getAllLiveRequestAction, updateHelpRequestCancel } from '../../Redux/action'
import SearchBarForuser from '../../components/SearchBar/SearchBarForuser'
import LeftMenu from '../../components/LeftMenu/leftmenu'
import Header from '../../components/LeftMenu/header'
import request from 'request'
import { TiDeleteOutline } from "react-icons/ti";
import { Button, Modal } from 'react-bootstrap';
import loaderImg from '../../loading.gif'


// import Geocode from "react-geocode";

const LiveReqiest = (props) => {
    const [loader, setLoader] = React.useState(true);
    const [selectItem, setSelectItem] = React.useState([]);
    const [pageNumber1, setPageNumber] = React.useState();
    // const [pageNumber2, setPageNumber2] = React.useState(1);
    const [showRequesterAddress, setshowRequesterAddress] = React.useState();
    const [getRequesterAddress, setGetRequesterAddress] = React.useState()
    const [showHelperAddress, setShowHelperAddress] = React.useState()
    const [getHelperAddress, setHelperAddress] = React.useState()
    const pageNumber = props.match.params.pageNumber;
    const [pageNumber2, setPageNumber2] = React.useState(pageNumber ? pageNumber : 1);
    const dispatch = useDispatch()
    React.useEffect(() => {
        getLiveRequestData()

    }, [])


    const getLiveRequestData = async () => {
        var data = {
            pageNumber: pageNumber ? pageNumber : 1,
            mobile: null,
            verified: null,
            radius: null,
            status: null,
            address: null,
            gender: null,
            BloodGroup: null,
        }
        setLoader(true)
        dispatch(getAllLiveRequestAction(data))
            .then((data) => {
                setLoader(false)
            }).catch((err) => {
                setLoader(false)
            })
    }

    const allLiveRequestData = useSelector(state => state.liveRequest)
    const allLiveRequestData1 = allLiveRequestData && allLiveRequestData?.liveRequest[0] && allLiveRequestData?.liveRequest[0]?.data ? allLiveRequestData.liveRequest[0].data : []

    const Metadata = allLiveRequestData && allLiveRequestData?.liveRequest[0] && allLiveRequestData?.liveRequest[0]?.metadata &&
        allLiveRequestData?.liveRequest[0]?.metadata.total ? allLiveRequestData.liveRequest[0].metadata.total : []

    // const helpRequestId = allLiveRequestData?.liveRequest[0]?.data?.



    const pageChangeFun = (pageNumber) => {
        const lenght1 = allLiveRequestData1.length < 20 ? 20 : 20
        setPageNumber(pageNumber * lenght1 - 20);
        setPageNumber2(pageNumber);
        setLoader(true)
        dispatch(getAllLiveRequestAction({ pageNumber: pageNumber }))
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
        dispatch(getAllLiveRequestAction(pageNumber2))
            .then(() => {
                setLoader(false)
            })
    };

    const selectAll = (event) => {
        const selectedId = []
        const allData = allLiveRequestData1

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

    const [isOpen, setIsOpen] = React.useState(false);
    const [idStatus, setIdStatus] = React.useState();
    const showModal = (_id) => {
        const data = {
            _id,
            status: "cancelled by admin"
        }
        setIsOpen(true);
        setIdStatus(data)
    };
    const yesClick = () => {
        dispatch(updateHelpRequestCancel(idStatus))
        setIsOpen(false);
    };
    const hideModal = () => {
        setIsOpen(false);
    };


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
                <div className="headingMain"> Live Requests</div>
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
                                        <table className="table table-bordered table-striped">
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
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Provider CURRENT real time location</th>
                                                    <th scope="col">Realtime Distance</th>
                                                    <th scope="col">Cancel Request</th>
                                                </tr>
                                            </thead>
                                            {
                                                loader ? <tr className="text-center">
                                                    <img style={{ width: "40%", marginRight: "100px" }} src={`${loaderImg}`} alt="Document" />
                                                </tr>
                                                    :

                                                    <tbody>
                                                        {allLiveRequestData1 && allLiveRequestData1?.length > 0 && allLiveRequestData1?.map((item, index) => {
                                                            const date = new Date(item.createdAt);
                                                            var date1 = date.toLocaleDateString() + ' ' + date.toTimeString().substring
                                                                (0, date.toTimeString().indexOf("GMT"));
                                                            return (
                                                                <tr key={index} className="table-row">
                                                                    {/* <td>{pageNumber1 === undefined ? index + 1 : pageNumber1 + index + 1}</td> */}
                                                                    <td>{pageNumber2 === 1 ? index + 1 : pageNumber2 * 20 + index + 1 - 20}</td>
                                                                    <td >
                                                                        <input type="checkbox"
                                                                            checked={selectItem.includes(item._id)}
                                                                            onClick={(e) => selectCheckbox(e, item._id)} aria-label="Checkbox for following text input" />
                                                                    </td>
                                                                    <td>{item.requestType === "Nearby user request" ? "Nearby help" :
                                                                        item.requestType === "Saved user request" ? "Family Help" : item.requestType}</td>
                                                                    <td onClick={() => navigator.clipboard.writeText(item.requester.Mobile)}>{item.requester && item.requester.Mobile ? item.requester.Mobile : null}</td>
                                                                    <td>{item.requesterProfile && item.requesterProfile.fullName ? item.requesterProfile.fullName : null}</td>

                                                                    <td onClick={(e) => getRequestAddressFun(index, item)}>
                                                                        {showRequesterAddress === index ? getRequesterAddress :
                                                                            <button className="btn btn-primary" style={{ width: "80%", height: "30px", fontSize: "8px" }}>get requester address</button>}
                                                                    </td>
                                                                    <td>{date1 ? date1 : null}</td>
                                                                    {/* <td>{item.helper && item.helper.Mobile ? item.helper.Mobile : '--'}</td> */}
                                                                    {/* <td> {
                                                                        item.requestType === "Nearby help" || item.requestType === "Family help" ?
                                                                            item && item.helper && item.helper.Mobile ? item.helper.Mobile : "---"
                                                                            :
                                                                            "---"
                                                                    }</td> */}
                                                                    <td>{
                                                                        item?.requester?.Mobile === item?.helper?.Mobile ?
                                                                            "---"
                                                                            :
                                                                            item && item.helper && item.helper.Mobile ? item.helper.Mobile : "---"
                                                                    }</td>

                                                                    <td>{item.helperProfile && item.helperProfile.fullName ? item.helperProfile.fullName : '--'}</td>
                                                                    <td>{item.status}</td>

                                                                    {
                                                                        <td onClick={(e) => getHelperAddressFun(index, item)}>
                                                                            {showHelperAddress === index ? getHelperAddress :
                                                                                <button className="btn btn-primary" style={{ width: "80%", height: "30px", fontSize: "8px" }}>get helper address</button>}</td>
                                                                    }
                                                                    <td>{item.distance}</td>
                                                                    {
                                                                        item.status == "accepted" ?
                                                                            <td
                                                                                onClick={() => showModal(item._id)}><TiDeleteOutline size={30} />
                                                                            </td>
                                                                            :
                                                                            null
                                                                    }

                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                            }
                                        </table>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="m-0" style={{ fontSize: "14px" }}> Total item {Metadata}</p>
                                            <p className="m-0" style={{ fontSize: "14px" }}> Total Page  {Metadata / 20}</p>
                                            <PaginationFun totalPage={Metadata} pageChangeFun={pageChangeFun} pagenumber={pageNumber} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            </div >
            <Modal show={isOpen} onHide={hideModal} centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Request cancel of
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure to cancel the request</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>No</Button>
                    <Button variant="primary" onClick={() => yesClick()}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default LiveReqiest
