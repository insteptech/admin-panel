import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import "./css/bootstrap.min.css"
import "./css/styles.css"
import Users from "./containers/Users"
import Login from "./containers/auth/login";
import UserDetail from './components/userDetail';
import LiveReqiest from './containers/LiveRequests';
import OtherServices from './containers/AllPieCart/OtherServices';
import RequestCompleted from './containers/RequestsCompleted';
import Reports from './containers/AllPieCart/Reports';
import AmberAlerts from './containers/AllPieCart/AmberAlerts';
import AmberAlertsType from './containers/AmberAlertsType';
import AmberAlertstypeDetail from './components/AmberAlertstypeDetail';
import OtherServicesType from './containers/OtherServicesType';
import OtherServicesTypeDetail from './components/OtherServicesTypeDetail';
import ConfirmOtp from './containers/auth/ConfirmOtp';
import PrivateRoute from './components/HOC/PrivateRoute'
import SuperAdminConfiguration from './containers/SuperAdminConfiguration';
import UsersAddedByAdmin from './containers/UsersAddedByAdmin';
import GoogleMap from './components/GoogleMap';
import Resourse from './components/Resourse/resourse';
import Coupon from './containers/Coupon/coupon';
import Leads from './containers/leads & subscription/leads';
import Subscription from './containers/leads & subscription/subscription';
// import { sendNotificationToAllAction } from './Redux/action';
// import NotifictionToAllModal from './components/NotificationModal/notifyToAll';

export default function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/ConfirmOtp" component={ConfirmOtp} />
        <Route exact path="/GoogleMap" component={GoogleMap} />
        <PrivateRoute path="/home" component={Reports} />
        <PrivateRoute exact path="/users/:pageNumber" component={Users} />
        <PrivateRoute exact path="/UserAddedByAdmin" component={UsersAddedByAdmin} />
        <PrivateRoute exact path="/userDetail/:id/:pageNumber" component={UserDetail} />
        <PrivateRoute exact path="/Live_Requests/:pageNumber" component={LiveReqiest} />
        <PrivateRoute exact path="/RequestCompleted" component={RequestCompleted} />
        <PrivateRoute exact path="/OtherServices" component={OtherServices} />
        <PrivateRoute exact path="/OtherServicesType/:pageNumber" component={OtherServicesType} />
        <PrivateRoute exact path="/OtherServicesTypeDetail/:id/:pageNumber" component={OtherServicesTypeDetail} />
        <PrivateRoute exact path="/AmberAlerts" component={AmberAlerts} />
        <PrivateRoute exact path="/AmberAlertsType/:pageNumber" component={AmberAlertsType} />
        <PrivateRoute exact path="/AmberAlertstypeDetail/:id/:pageNumber" component={AmberAlertstypeDetail} />
        <PrivateRoute exact path="/SuperAdminConfiguration" component={SuperAdminConfiguration} />
        <PrivateRoute exact path="/Resourse" component={Resourse} />
        <PrivateRoute exact path="/coupon" component={Coupon} />
        <PrivateRoute exact path="/leads" component={Leads} />
        <PrivateRoute exact path="/subscription" component={Subscription} />
        {/* <PrivateRoute exact path="/Super" component={NotifictionToAllModal}/> */}
        <PrivateRoute path="**" ><Redirect to={{ pathname: "/home" }} /></PrivateRoute>
      </Switch>
    </React.Fragment>
  );
}