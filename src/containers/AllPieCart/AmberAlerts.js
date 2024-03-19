
import Report from '../../components/pieChart/index'
import React from "react";
import LeftMenu from '../../components/LeftMenu/leftmenu';
import Header from '../../components/LeftMenu/header'

const AmberAlerts = () => {
    const [isActive, setActive] = React.useState(false);
    const toggleClass = () => {
        // .log(">>>>>>>>>.")
        setActive(!isActive);
    };
    return (
        <React.Fragment>
            <LeftMenu isActive={isActive} />

            <div className="mainParent">
                <Header toggleClass={toggleClass} />
                <div className="headingMain"> Amber Alert</div>
                <div className="">
                    <div className="card shadow mb-4 spaceBox">
                        <div className="">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-4 col-sm-12 mb-5">
                                        <h6 style={{ marginLeft: "30%" }}>Total Lost request (120)</h6>
                                        <Report
                                            label={['Pending Verification', 'Verified ', 'Rejected', 'Notified', 'In Progress', 'Completed',]}
                                            data={[81, 118, 66, 119, 76, 100]}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-sm-12 mb-5">
                                        <h6 style={{ marginLeft: "35%" }}>Total Stolen Request (65)</h6>
                                        <Report
                                            label={['Pending Verification', 'Verified ', 'Rejected', 'Notified', 'In Progress', 'Completed',]}
                                            data={[100, 180, 160, 119, 160, 100]}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-sm-12 mb-5">
                                        <h6 style={{ marginLeft: "35%" }}>Total Lost Person Request (20)</h6>
                                        <Report
                                            label={['Pending Verification', 'Verified ', 'Rejected', 'Notified', 'In Progress', 'Completed',]}
                                            data={[12, 28, 16, 59, 16, 30]}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-sm-12 mb-5">
                                        <h6 style={{ marginLeft: "35%" }}>Corona (40)</h6>
                                        <Report label={['Pending Verification', 'Verified ', 'Rejected', 'Notified', 'In Progress', 'Completed',]}
                                            data={[14, 18, 16, 49, 100]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AmberAlerts;