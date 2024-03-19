import React from "react";
import Geocode from "react-geocode";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import { serviceAction } from "../../Redux/action/Service/serviceAction";
import NotifictionModal from "../NotificationModal";
import NotifictionToAllModal from "../../components/NotificationModal/notifyToAll/index";
import {
  amberAlertTypeAction,
  amberAlertDataByAlertIdAction,
} from "./../../Redux/action/allAmberAlerts/amberAlertTypeAction";

import { data } from "jquery";
import { IoMdRefreshCircle } from "react-icons/io";
// import { saveAs } from "file-saver";

/**
 * @author prabhakar sarkar
 * @param {*} props
 * @returns
 * @description search bar for user
 */

const SearchBarForuser = (props) => {
  const allUserTypeData = useSelector((state) => state.amberAlertdata.allUserTypeData);
  const document = allUserTypeData && allUserTypeData[0]?.amberDataDocuments;
  const doc = document ? document : [];

  const [isShowModal, setShowModal] = React.useState(false);
  const [isModalShow, setModalShow] = React.useState(false);
  const [value, setValue] = React.useState();
  const BloodGroupType = ["A+", "A", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const dispatch = useDispatch();
  let id = localStorage.getItem("amberAlertId");

  React.useEffect(() => {
    dispatch(serviceAction());
    let id = localStorage.getItem("amberAlertId");
    dispatch(amberAlertDataByAlertIdAction(id));
  }, [id]);

  // React.useEffect(() => {
  //   let id = localStorage.getItem("amberAlertId");
  //   dispatch(amberAlertDataByAlertIdAction(id));
  // }, [allUserTypeData]);
  const services = useSelector((state) => state.services);
  const user = useSelector((state) => state.user);

  const otherServices = services?.services?.length > 0 ? services?.services : []
  // console.log(doc, "docdocdocdocdocdoc");
  const [allValues, setAllValues] = React.useState({
    mobile: "",
    verified: "",
    radius: "",
    status: "",
    address: "",
    gender: "",
    BloodGroup: "",
    workDivisionId: "",
    // all:false
  });

  // console.log("user", props);

  /**
   *@description set all filter value in state function
   * @param {*} e
   */
  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });

    // console.log('allValues.verified', e.target.value)
  };

  /**
   * @description filter user function
   * @param {*} e
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (allValues.address) {
      Geocode.setApiKey("AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU");
      Geocode.fromAddress(allValues.address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;

          var data = {
            mobile: allValues.mobile,
            radius: allValues.radius,
            verified: allValues.verified,
            status: allValues.status,
            type: allValues.type,
            gender: allValues.gender,
            BloodGroup: allValues.BloodGroup,
            workDivisionId: allValues.workDivisionId,
            address: { lat: lat, long: lng },
          };

          props.handleSearch(data);
          // setAllValues({
          //     mobile: '',
          //     verified: '',
          //     radius: '',
          //     status: '',
          //     address: '',
          //     gender: '',
          //     BloodGroup: '',
          //     workDivisionId: ""
          // })
        },
        (error) => {
          console.error("error:::", error);
        }
      );
    } else {
      let data = {
        mobile: allValues.mobile,
        radius: allValues.radius ? allValues.radius : 0,
        verified: allValues.verified,
        status: allValues.status,
        gender: allValues.gender,
        BloodGroup: allValues.BloodGroup,
        workDivisionId: allValues.workDivisionId,
        type: allValues.type,
      };

      props.handleSearch(data);
      // setAllValues({
      //     mobile: '',
      //     verified: '',
      //     radius: '',
      //     status: '',
      //     address: '',
      //     gender: '',
      //     BloodGroup: '',
      //     workDivisionId: ""
      // })
    }
  };

  /**
   * @description Notification Open Modal function
   */
  const NotificationOpenModal = () => {
    setShowModal(true);

  };
  // const downloadFun = () => {
  //   saveAs(
  //     "https://dev.api.helpyfinder.com/graphql",
  //     "example.pdf"
  //   );
  //   console.log("downloadclick")
  // }

  const NotificationToAll = () => {
    setModalShow(true);
    // console.log(isModalShow, "isModalShow::::::::::::::");
  };
  const resetFilterFun = () => {
    setAllValues({
      mobile: '',
      verified: '',
      radius: '',
      status: '',
      address: '',
      gender: '',
      BloodGroup: '',
      workDivisionId: ""
    })
  };
  const funLeadsUser = () => {
    const data = {
      leads: true
    }
    props.funLeadUser(data);
  }

  const funSubscriptionUser = () => {
    const data = {
      subscription: true
    }
    props.funSubscriptionUser(data);
  }

  const lodingCommit = () => {
    // console.log("bxdjh")
  }

  return (
    <div className=" my-4">
      <form className="form searchForm">
        <div className="form-row w-100">
          <div className="col-md-12">
            <div className="form-row">
              <div className="col-6 col-md-3">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="search"
                    placeholder={props.placeholder[0]}
                    aria-label="Search"
                    value={allValues.mobile}
                    // disabled={allValues.address}
                    onChange={changeHandler}
                    name="mobile"
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control "
                    value={allValues.gender}
                    onChange={changeHandler}
                    name="gender"
                  >
                    <option>Select gender</option>
                    <option value={"male"}>male</option>
                    <option value={"female"}>female</option>
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="form-group">
                  <input
                    className="form-control"
                    // disabled={allValues.address}
                    type="search"
                    value={allValues.address}
                    placeholder={props.placeholder[1]}
                    aria-label="Search"
                    onChange={changeHandler}
                    name="address"
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    value={allValues.BloodGroup}
                    onChange={changeHandler}
                    name="BloodGroup"
                  >
                    <option>BloodGroup</option>
                    {BloodGroupType.map((blood, index) => {
                      return (
                        <option key={index} value={blood.value}>
                          {blood}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="form-group">
                  <select
                    className="form-control"
                    value={allValues.verified}
                    onChange={changeHandler}
                    name="verified"
                  >
                    <option>docStatus</option>
                    <option value={true}>accept</option>
                    <option value={false}>Rejected</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    className="form-control "
                    type="search"
                    placeholder="Radius"
                    aria-label="Search"
                    disabled={
                      allValues.mobile || allValues.address ? false : true
                    }
                    value={allValues.radius}
                    onChange={changeHandler}
                    name="radius"
                  />
                  {allValues.mobile && !allValues.radius && (
                    <p style={{ color: 'red' }}>Please enter a radius.</p>
                  )}
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="form-group">
                  <select
                    className="form-control"
                    value={allValues.status}
                    onChange={changeHandler}
                    name="status"
                  >
                    <option>isUserActive</option>
                    <option value={true}>Enabled</option>
                    <option value={false}>desabled</option>
                  </select>
                </div>
                <div className="form-group">
                  <select
                    className="form-control "
                    value={allValues.workDivisionId}
                    onChange={changeHandler}
                    name="workDivisionId"
                  >
                    <option>Working Division</option>
                    {
                      otherServices.map((item, index) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="  col-lg-9 offset-lg-1 col-sm-12 mt-1">
            <div className="row">
              {/* <div className="col-md-2">
                <div className="form-group">
                  <button type="button" className="form-control btn btn-info" onClick={() => downloadFun()}>
                    Download In Excel
                  </button>
                </div>
              </div> */}
              <div className="col-md-3">
                <div className="form-group">
                  <button
                    type="button"
                    className="form-control btn btn-info"
                    onClick={() => NotificationOpenModal()}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Send Notification{" "}
                  </button>
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group">
                  <button
                    className="btn btn-success "
                    type="submit"
                    disabled={!allValues.radius}
                    onClick={(e) => handleSearch(e)}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <button
                    type="button"
                    className="form-control btn btn-info"
                    onClick={() => NotificationToAll()}
                    data-toggle="modal"
                    data-target="#ampleModalCentered"
                  >
                    Notification to all
                  </button>
                </div>
              </div>
              {/* <div className="col-md-3"> */}
              <div className="form-group">
                <button
                  type="button"
                  className="form-control btn btn-info"
                  onClick={() => resetFilterFun()}
                  data-toggle="modal"
                // data-target="#ampleModalCentered"
                >
                  Reset Filter
                </button>
                {/* <button className="form-control btn btn-info" onClick={() => lodingCommit()}><IoMdRefreshCircle size={40} /></button> */}
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <button
                    type="button"
                    className="form-control btn btn-info"
                    onClick={() => funLeadsUser()}
                  >
                    Leads User
                  </button>
                  {/* <button className="form-control btn btn-info" onClick={() => lodingCommit()}><IoMdRefreshCircle size={40} /></button> */}
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <button
                    type="button"
                    className="form-control btn btn-info"
                    onClick={() => funSubscriptionUser()}
                  >
                    Subscription User
                  </button>
                  {/* <button className="form-control btn btn-info" onClick={() => lodingCommit()}><IoMdRefreshCircle size={40} /></button> */}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </form>
      {
        isShowModal ? <NotifictionModal selectAllmobileNumber={props.selectAllMobileNumber}
          selectAllId={props.selectAllId} ClearMobileNumber={props.ClearMobileNumber} amberAlertDocument={doc} amberAlertName={props?.amberAlertName} /> : null

      }
      {isModalShow ? (
        <NotifictionToAllModal
          userQuery={user}
          selectAllmobileNumber={props.selectAllMobileNumber}
          selectAllId={props.selectAllId}
          ClearMobileNumber={props.ClearMobileNumber}
          amberAlertName={props?.amberAlertName}
        />
      ) : null}
    </div>
  );
};

export default SearchBarForuser;
