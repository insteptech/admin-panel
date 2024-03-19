import React, { Fragment, useState, } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import LogoImg from '../../logo.png';
import { AiFillDashboard } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { DiGitPullRequest } from "react-icons/di";
import { AiOutlineFileDone } from "react-icons/ai";
// import { GrResources } from "react-icons/ai";
import { GrResources } from "react-icons/gr";
import { AiFillAlert } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
// exapmle
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { MdSimCardAlert } from "react-icons/md";
import { FaServicestack } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { RiAdminLine, RiCoupon2Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";


import "./style.css"
// import { props } from "react-bootstrap/esm/Image";

export function LeftMenu(props) {

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const logout = () => {
        localStorage.clear("token")
    }
    return (
        < Fragment>
            <ul className={props.isActive ? 'navbar-nav  sidebar sidebar-dark accordion customSidebar' :
                'navbar-nav  sidebar sidebar-dark accordion collapsed'} id="collapseMenu">
                <li className="nav-item logo-nav">
                    <Link className="nav-link" to={`/home`}>
                        <img className="logo" src={LogoImg} />
                        <p>Helpy Finder</p>
                    </Link>
                </li>

                <li className={splitLocation[1] === "home" ? "nav-link active nav-item" : "nav-item"}>
                    <Link className="nav-link" to={`/home`} >
                        <AiFillDashboard />
                        Home
                    </Link>
                </li>
                <li className={splitLocation[1] === "users" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={"/users/1"} >
                        <FaUserAlt />
                        Users
                    </Link>
                </li>
                <li className={splitLocation[1] === "Useraddedbyadmin" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/Useraddedbyadmin`}>
                        <FaUserAlt />
                        User added by admin
                    </Link>
                </li>
                <li className={splitLocation[1] === "Live_Requests" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/Live_Requests/1`}>
                        <DiGitPullRequest />
                        Live requests
                    </Link>
                </li>
                <li className={splitLocation[1] === "RequestCompleted" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/RequestCompleted`}>
                        <AiOutlineFileDone />
                        Request completed
                    </Link>
                </li>
                <li className={splitLocation[1] === "Resourse" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/Resourse`}>
                        <GrResources style={{ color: 'red' }} />
                        Resource
                    </Link>
                </li>

                {/* <li className={splitLocation[1] === "AmberAlerts" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/AmberAlerts`}>
                        <BsFillExclamationTriangleFill color="red" />
                        Amber alerts
                    </Link>
                </li> */}

                <li className={splitLocation[1] === "AmberAlertsType" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/AmberAlertsType/1`}>
                        <MdSimCardAlert />
                        Amber alert
                    </Link>
                </li>
                <li className={splitLocation[1] === "OtherServices" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/OtherServices`}>
                        <FaServicestack />
                        <span>Other services</span>
                    </Link>
                </li>
                <li className={splitLocation[1] === "OtherServicesType" ? "nav-link active nav-item" : "nav-item"}>
                    <Link className="nav-link" to={`/OtherServicesType/1`}>
                        <RiServiceFill />
                        Other services type
                    </Link>
                </li>
                <li className={splitLocation[1] === "SuperAdminConfiguration" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/SuperAdminConfiguration`}>
                        <RiAdminLine />
                        Super admin configuration
                    </Link>
                </li>
                <li className={splitLocation[1] === "coupon" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/coupon`}>
                        <RiCoupon2Fill />
                        Coupon
                    </Link>
                </li>
                <li className={splitLocation[1] === "leads" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/leads`}>
                        <MdPayment />
                        Leads
                    </Link>
                </li>
                <li className={splitLocation[1] === "subscription" ? "nav-link active nav-item" : "nav-item"} >
                    <Link className="nav-link" to={`/subscription`}>
                        <RiCoupon2Fill />
                        Subscription
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="modal" data-target="#logoutModal" to={`/orders`} onClick={logout}  >
                        <FiLogOut />
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>

        </Fragment>
    );
};

export default withRouter(LeftMenu);
