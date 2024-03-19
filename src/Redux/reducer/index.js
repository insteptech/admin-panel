import { combineReducers } from "redux";
import amberAlertReducer from "./amberAlertReducer";
import authReducer from "./authReducer";
import liveRequestReducer from "./liveRequestReducer";
import notificationReducer from "./notificationReducer";
import otherServiceType from "./otherServiceReducer";
import serviceReducer from "./servicesReducer";
import userReducer from "./userReducer";
import otherDetailServiceTypeReducer from './otherServiceTypeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  liveRequest: liveRequestReducer,
  services: serviceReducer,
  otherService: otherServiceType,
  amberAlertdata: amberAlertReducer,
  notificationList: notificationReducer,
  otherDetailService: otherDetailServiceTypeReducer

})


export default rootReducer;