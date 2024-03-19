// import React from 'react'
// import { amberAlertTypeAction } from '../../Redux/'
import { AiFillEye } from "react-icons/ai";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationFun from "../../components/pagination";
import {
  amberAlertTypeAction,
  amberAlertDataByAlertIdAction,
} from "./../../Redux/action/allAmberAlerts/amberAlertTypeAction";
import SearchBarForuser from "../../components/SearchBar/SearchBarForuser";
import LeftMenu from "../../components/LeftMenu/leftmenu";
import Header from "../../components/LeftMenu/header";
import loaderImg from '../../loading.gif';
// import Preview from "../../preview.png";
// import getAmberAlertDataByAlertIdQuery from "../../../src/Redux/Mutation/amberAlert";
import { data } from 'jquery';
import { getAllOtherServiceTypeAction, getOneOtherServiceTypeAction } from '../../Redux/action/allOtherService/otherServiceTypeAction';
import UserNotify from '../../components/commanTables/UserNotiofDashboard';
import request from "request"
import moment from 'moment';
import ResponseModel from "../../components/ResponseModel/responseModel";
import { NavLink } from "react-router-dom";


const AmberAlertsType = (props) => {
  const [selectItem, setSelectItem] = React.useState([]);
  const [amberAlertName, setAmberAlertName] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [pageNumber1, setPageNumber] = React.useState();
  // const [pageNumber2, setPageNumber2] = React.useState(1);
  const [mobileNumber, setMobileNumber] = React.useState([])
  const [mobId, setMObID] = React.useState([])
  const [ambetAlertData, setAmbetAlertData] = React.useState([])
  // const [date, setDate] = React.useState([])
  const [showRequesterAddress, setshowRequesterAddress] = React.useState();
  const [getRequesterAddress, setGetRequesterAddress] = React.useState()
  const [model, setModel] = React.useState(false)
  const [amberALertDataId, setAmberALertDataId] = React.useState("")
  const pageNumber = props.match.params.pageNumber;
  const [pageNumber2, setPageNumber2] = React.useState(pageNumber ? pageNumber : 1);
  const [userNotify, setUserNotify] = React.useState(true)

  // const [documentsGroup, setDocumentsGroup] = React.useState([])


  // const setPictureData = (ambetAlertData) => {
  //     // debugger
  //     let arrayOfAllContacts = []
  //     ambetAlertData.map((item, index) => {

  //         let data = ambetAlertData[index].document?.reduce((r, e) => {
  //             let group = e.type;
  //             if (!r[group]) r[group] = { group, children: [e] };
  //             else r[group].children.push(e);
  //             return r;
  //         }, {});
  //         var contacts = Object.values(data);
  //         arrayOfAllContacts.push(contacts);
  //     })
  //     setDocumentsGroup(arrayOfAllContacts)

  // }
  // const id = "60d449dbbc2c343e1082c67f";
  const ambetAlertData1 = useSelector(
    state => state.amberAlertdata.amberAlertTypeData
  )
  const dispatch = useDispatch();
  React.useEffect(async () => {
    var data = {
      pageNumber: pageNumber ? pageNumber : 1,
    }
    // if (id) {
    setLoader(true)
    dispatch(amberAlertTypeAction(data))
      .then((dataa) => {
        // setLoader(false)
      }).catch(() => {
        // setLoader(false)
      })
    localStorage.removeItem("amberAlertId")
    localStorage.removeItem("amberPersonalInformationUserId");
  }, [props]);


  React.useEffect(() => {

    if (ambetAlertData1 && ambetAlertData1[0] && ambetAlertData1[0].data) {
      const ambetAlertDataFilter = ambetAlertData1 && ambetAlertData1[0] && ambetAlertData1[0].data ? ambetAlertData1[0].data : [];
      setAmbetAlertData(ambetAlertDataFilter)
      setLoader(false)
      // const date = ambetAlertDataFilter && ambetAlertDataFilter[0]?.createdAt
      // setDate(date);
    }

  }, [ambetAlertData1])

  // const getDate = () => {
  //   const createDate = new Date(date);
  //   const date1 = createDate.toLocaleDateString() + ' ' + createDate.toTimeString().substring
  //     (0, createDate.toTimeString().indexOf("GMT"));
  //   return date1
  // };


  // React.useEffect(() => {
  //     // debugger
  //     // if (ambetAlertData && ambetAlertData.length > 0) {
  //     setPictureData(ambetAlertData);
  //     // }

  // }, [])
  const Metadata =
    ambetAlertData1 &&
      ambetAlertData1[0] &&
      ambetAlertData1[0].metadata &&
      ambetAlertData1[0].metadata.total
      ? ambetAlertData1[0].metadata.total
      : null;

  const [isActive, setActive] = React.useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  const ClaerNotificationState = (a) => {
    setMobileNumber([])
    setSelectItem([])
    setMObID([])
  }

  const selectAll = (event) => {
    // const selectedId = [];
    // const allData = ambetAlertData;
    const selectedId = []
    const selectMoblieNumber = []
    const allData = ambetAlertData

    for (let item of allData) {
      if (event.target.checked) {
        // selectedId.push(item._id);
        selectedId.push(item.trackingId)
        selectMoblieNumber.push(item?.user?.Mobile)

      }
    }
    setSelectItem(selectedId);
    setSelectItem(selectedId)
    setMobileNumber(selectMoblieNumber)
  };

  React.useEffect(() => {
    let idarray = [];
    let mobilearray = []

    mobId?.map(item => {
      idarray.push(item.id)
      mobilearray.push(item.mobile)
    })
    setSelectItem(idarray);
    setMobileNumber(mobilearray)
  }, [mobId])
  // React.useEffect(() => {
  //   localStorage.removeItem("amberALertDataId");
  // })


  const selectCheckbox = async (e, id, mobile, _id, documentStatus, item) => {
    setAmberAlertName(item?.amberAlert?.name)
    if (e.target.checked) {
      if (documentStatus !== "Approved") {
        alert("Amber document status not approved ....")
      }
      else {
        localStorage.setItem("amberAlertId", _id)

        setSelectItem((prev) => [...prev, id]);
        setMObID((prev) => [...prev, { id, mobile }])
      }
    }
    // else {
    //   setSelectItem((prev) => prev.filter((item) => id !== item));
    // }
    else {
      localStorage.removeItem("amberAlertId")
      setMObID((prev) => prev.filter((item) => item.id != id))
      setSelectItem((prev) => prev.filter((item) => id !== item));
      // if (status !== "Approved") {
      //   alert(`you are not verified user,Your document status is ${status}`)
      // }
    }
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
  const getRequestAddressFun = async (index, item) => {
    if (item && item.requesterLocation && item.requesterLocation.lat) {
      let lat = item && item.requesterLocation && item.requesterLocation.lat;
      let long = item && item.requesterLocation && item.requesterLocation.long;
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

  const pageChangeFun = async (pageNumber) => {
    const lenght1 = ambetAlertData1?.length < 20 ? 20 : 20;
    setPageNumber(pageNumber * lenght1 - 20);
    setPageNumber2(pageNumber)
    // setLoader(true);
    await dispatch(amberAlertTypeAction({ pageNumber: pageNumber }))
      // dispatch(getAllOtherServiceTypeAction({ pageNumber: pageNumber }))
      .then(() => {
        // setLoader(false);
      })
      .catch(() => {
        // setLoader(false);
      });
  };

  const getLength = (item, key) => {
    var result = item.find((item) => item.group === key);
    var length = result?.children?.length ? result?.children?.length : 0;
    return length;
  };
  const getAmberAlertDataByAlertIdFun = (_id, userId) => {
    console.log("ffffffffffffffffffff", userId)

    dispatch(amberAlertDataByAlertIdAction(_id));
    localStorage.setItem("amberPersonalInformationUserId", userId)
    localStorage.setItem("id", userId);
    // props.history.replace("/AmberAlertstypeDetail",_id);
  };
  const openResponseModel = (amberALertDataId) => {
    setAmberALertDataId(amberALertDataId)
    setModel(true);
  }
  return (
    <React.Fragment>
      <LeftMenu isActive={isActive} />

      <div className="mainParent">
        <Header toggleClass={toggleClass} />
        <div className="headingMain">Amber Alert</div>
        <div className="container-fluid">
          <div className="row">
            <div className="w-100">
              <div className="card shadow mb-4 amberAlertType">
                <div className="card-header py-2">
                  <br></br>
                  {/* <SearchBarForuser
                    selectAllMobileNumber={mobileNumber}
                    selectAllId={selectItem}
                    ClearMobileNumber={ClaerNotificationState}
                    placeholder={["phone", "address"]}
                    select="select gender"
                  /> */}
                </div>

                <div className="card-body ">
                  <div className="table-responsive table-bordered table-hover">
                    <table className="table">
                      <thead className="thead ">
                        <tr className="col">
                          <th scope="col">No</th>
                          <th scope="col">
                            select All
                            <input
                              type="checkbox"
                              aria-label="Checkbox for following text input"
                              onClick={(e) => selectAll(e)}
                            />
                          </th>
                          <th scope="col">Tracking ID</th>
                          <th scope="col">Requester Phone Number</th>
                          <th scope="col">Requester Name</th>
                          <th scope="col">Lost Item detail</th>
                          <th scope="col">Requester Location</th>
                          <th scope="col">Request Initiated Time</th>
                          <th scope="col">FIR Copy</th>
                          <th scope="col">RC Copy</th>
                          <th scope="col">Family Photo</th>
                          <th scope="col">Proof of Ownership / Proof to show the Relationship</th>
                          <th scope="col">Lost item Photo</th>
                          <th scope="col">Vehicle Photo</th>
                          <th scope="col">User Comment</th>
                          <th scope="col">User Status </th>
                          <th scope="col">Document Status</th>
                          <th scope="col">Detail</th>
                          <th scope="col">Responses</th>
                        </tr>
                      </thead>
                      {loader ?
                        // <h1>loading.......</h1>
                        <tr ><img style={{ width: "40%", marginRight: "100px" }} src={`${loaderImg}`} alt="Document" /></tr>
                        :
                        <tbody>
                          {ambetAlertData?.map((item, index) => {
                            // console.log("itemitemitemitemitemitem", item)
                            // { item.user.Mobile === null ? "---" : item.user.Mobile }
                            return (
                              <tr className="table-row" key={index}>
                                {/* <td>
                                  {pageNumber1 === undefined
                                    ? index + 1
                                    : pageNumber1 + index + 1}
                                </td> */}
                                {/* <td>{pageNumber2 === 1 ? index + 1 : pageNumber2 * 20 + index + 1 - 20}</td> */}
                                <td>{pageNumber2 == 1 ? index + 1 : pageNumber2 * 100 + index + 1 - 100}</td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={selectItem?.includes(item.trackingId)}
                                    onClick={(e) => selectCheckbox(e, item.trackingId, item?.user?.Mobile, item._id, item.status, item)}
                                    aria-label="Checkbox for following text input"
                                    readOnly
                                  />
                                </td>
                                <td>{item.trackingId}</td>
                                <td onClick={() => navigator.clipboard.writeText(item.user === null ? "---" : item.user.Mobile)}> {item.user === null ? "---" : item.user.Mobile}</td>
                                <td>{item?.personal?.fullName}</td>
                                <td>{item.amberAlert.name}</td>
                                {/* <td>
                                  Latitude:{item.requesterLocation.lat}-
                                  Longitude:{item.requesterLocation.long}
                                </td> */}
                                <td onClick={(e) => getRequestAddressFun(index, item)}>
                                  {showRequesterAddress === index ? getRequesterAddress :
                                    <button className="btn btn-primary" style={{ width: "80%", height: "30px", fontSize: "8px" }}>get address</button>}
                                </td>
                                <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td>{getLength(item.Group, "fir")}</td>
                                <td>{getLength(item.Group, "rc")}</td>
                                <td>{getLength(item.Group, "familyPhoto")}</td>
                                <td>
                                  {getLength(item.Group, "proofOfOwnership")}
                                </td>
                                <td>{getLength(item.Group, "photo")}</td>
                                <td>{getLength(item.Group, "vehiclePhoto")}</td>

                                {/* {item && item.Group && item.Group.length > 0 ? (
                                item.Group.map((item) => {
                                  return <td>{item.children.length}</td>;
                                })
                              ) : (
                                <>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                </>
                              )} */}

                                <td>
                                  {item.comment == "undefined" ||
                                    item.comment == null
                                    ? "-"
                                    : item.comment}
                                </td>
                                <td>
                                  {item.user && item.user.Verified == "true"
                                    ? "Verified"
                                    : "Not Verified"}
                                </td>
                                <td>{item.status.toUpperCase()}</td>
                                <td>
                                  {/* <a href={`/AmberAlertstypeDetail/${item._id}/${pageNumber2}`}
                                    onClick={() =>
                                      getAmberAlertDataByAlertIdFun(item._id, item.personal.userId)}>
                                    <AiFillEye size={30} />
                                  </a> */}
                                  <NavLink
                                    to={`/AmberAlertstypeDetail/${item._id}/${pageNumber2}`}
                                    onClick={() =>
                                      getAmberAlertDataByAlertIdFun(item._id, item.personal.userId)}>
                                    <AiFillEye size={30} /></NavLink>
                                </td>
                                <td>
                                  <button onClick={() =>
                                    openResponseModel(item._id)} data-toggle="modal" data-target="#amberAlertResponses" style={{  fontSize: "8px" }} className="btn btn-primary">Responses</button>
                                  {/* <a
                                    onClick={() =>
                                      openResponseModel()}>
                                    <AiFillEye size={30}
                                      data-toggle="modal" data-target="#ModalId" />
                                    Responses
                                  </a> */}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      }
                    </table>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="m-0" style={{ fontSize: "14px" }}>
                      {" "}
                      Total item {Metadata}
                    </p>
                    <p className="m-0" style={{ fontSize: "14px" }}>
                      {" "}
                      Total Page {Metadata / 2}
                    </p>
                    <PaginationFun
                      totalPage={Metadata}
                      pageChangeFun={pageChangeFun}
                      pagenumber={pageNumber}
                      userNotify={userNotify}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        {
          model ?
            <ResponseModel amberALertDataId={amberALertDataId} />
            :
            null
        }

      </div>
      {
        localStorage.getItem("amberAlertId") ?
          <UserNotify amberAlertName={amberAlertName} />
          :
          null
      }

    </React.Fragment>
  );
};

export default AmberAlertsType;
