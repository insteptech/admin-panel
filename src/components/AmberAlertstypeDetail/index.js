import React from "react";
// import LostItemPhotoDocument from "../commanTables/DocumentsSubmitted";
// import ProofOfOwnership from "../commanTables/DocumentsSubmitted";
// import FIRCopy from "../commanTables/DocumentsSubmitted";
// import UserActivity from "../commanTables/UserActivity";
import PersonalInformation from "../commanTables/UserPersonalInformation";
import { useSelector, useDispatch } from "react-redux";
import LeftMenu from "../LeftMenu/leftmenu";
import GroupDocument from "../../components/AmberAlertstypeDetail/GroupDocument";
import {
  amberAlertTypeAction,
  amberAlertDataByAlertIdAction,
} from "./../../Redux/action/allAmberAlerts/amberAlertTypeAction";
import loaderImg from '../../loading.gif';
import UserActivity from '../commanTables/UserActivity'
import UserAdminCommit from '../commanTables/UserAdminCommit'
import { getOneOtherServiceTypeAction } from '../../Redux/action/allOtherService/otherServiceTypeAction';
import { getUserByIdAction, getUserByPhoneAction } from '../../Redux/action'
import Header from '../LeftMenu/header'

const AmberAlertstypeDetail = (props) => {
  const [loader, setLoader] = React.useState(true);
  const [isActive, setActive] = React.useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };
  const allState = useSelector((state => state));
  const personalInfo = useSelector((state => state.user.userById));
  const document = useSelector(state => state.amberAlertdata.amberAlertTypeData[0] && state.amberAlertdata.amberAlertTypeData[0].data ? state.amberAlertdata.amberAlertTypeData[0].data : [])
  const chat = useSelector(state => state?.amberAlertdata?.allUserTypeData[0]);
  const helper = chat?.helper;
  const helprequest = chat?.helprequest;
  const commentTrail = chat?.commentTrail;
  const userId = chat?.userId;

  const _id = props.match.params.id;
  const pageNumber = props.match.params.pageNumber;
  const data = {
    pageNumber: pageNumber
  }
  const documentGroup = document.filter(data => data._id === _id)

  console.log("statestatestate", data)

  // React.useEffect(() => {
  //   // localStorage.setItem("id", userId);
  // }, [userId]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    // setLoader(false);
    console.log("ididididiid", userId)

    if (_id) {
      // dispatch(getOneOtherServiceTypeAction(_id))
      dispatch(amberAlertTypeAction(data));
      dispatch(amberAlertDataByAlertIdAction(_id))
      const id = localStorage.getItem("amberPersonalInformationUserId")
      dispatch(getUserByIdAction(id))
        .then(() => {
          setLoader(false);
        })
    }
  }, [props]);

  const backToAmberAlert = () => {
    props.history.replace(`/AmberAlertsType/${pageNumber}`)
  }
  const oneHelpRequestData = useSelector(state => state.amberAlertdata.allUserTypeData)

  const personalInformation = oneHelpRequestData && oneHelpRequestData[0] && oneHelpRequestData[0].personalprofile ? oneHelpRequestData[0].personalprofile : [];
  const document1 = oneHelpRequestData && oneHelpRequestData[0] && oneHelpRequestData[0].amberDataDocuments ? oneHelpRequestData[0].amberDataDocuments : [];
  console.log(oneHelpRequestData, "djhcewhuoehdjejehdjed");


  return (
    <>
      <LeftMenu />
      <div className="mainParent userDetailPage">
        <Header toggleClass={toggleClass} />
        <button onClick={() => backToAmberAlert()} style={{ fontSize: "14px" }} className="btn btn-info">Back To Amber Alert</button>
        <div className="w-100">
          <div className="col-xl-12 col-lg-12">
            <div className="card  mb-4">
              <div className="card-header py-3]">
                <h6 className="m-0 text-green font-weight-bold text-center">
                  Amber Alert's type in detail
                </h6>
              </div>
              <div className="card-body">
                <div className="table-responsive portlet">
                  <table className="table table-bordered table-striped">
                    <thead className="col">
                      <tr className="col">
                        <th scope="col">Verified User</th>
                        <th scope="col">User Status</th>
                        <th scope="col">Document Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-row">
                        <td>true</td>
                        <td>Enable</td>
                        <td>submit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {
            loader ?
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '45vh' }}><img src={`${loaderImg}`} alt="Document" /></div>
              :
              <>
                <PersonalInformation personalInformation={personalInfo} />
                <GroupDocument userIdProof={documentGroup} pageNumber={data} />
                <UserAdminCommit personalInformation={commentTrail} />
                <UserActivity helprequest={helprequest} helper={helper} />
              </>
          }
        </div>
      </div>
      {/* <UserActivity/> */}
    </>
  );
};

export default AmberAlertstypeDetail;
