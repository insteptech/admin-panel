
import Report from '../../components/pieChart/index'
import React from "react";
import LeftMenu from '../../components/LeftMenu/leftmenu'
import Header from '../../components/LeftMenu/header'

const OtherServices = () => {
  const [isActive, setActive] = React.useState(false);
  const toggleClass = () => {

    setActive(!isActive);
  };

  return (
    <React.Fragment>
      <LeftMenu isActive={isActive} />
      <div className="mainParent">
        <Header toggleClass={toggleClass} />
        <div className="headingMain">Other Services</div>
        <div className="container-fluid">
          <div className="row">
            <div className="">
              <div className="card shadow spaceBox mb-4">
                <div className="row">
                  <div className="col-lg-4 col-sm-12 mb-5">
                    <h6 style={{ marginLeft: "20%" }}>Total NGO request (120)</h6>
                    <Report
                      label={['Pending Verification', 'Verified ', 'Rejected', 'Notified', 'In Progress', 'Completed',]}
                      data={[50, 180, 160, 119, 160, 100]}

                    />
                  </div>
                  <div className="col-lg-4 col-sm-12 mb-5">
                    <h6 style={{ marginLeft: "20%" }}>Total Doctor request (120)</h6>
                    <Report
                      label={['Pending Verification', 'Verified ', 'Rejected', 'Notified', 'In Progress', 'Completed',]}
                      data={[300, 180, 160, 119, 160, 100]}
                    />
                  </div>
                  <div className="col-lg-4 col-sm-12 mb-5">
                    <h6 style={{ marginLeft: "20%" }}>Total Police Request (65)</h6>
                    <Report
                      label={['Pending Verification', 'Verified ', 'Rejected', 'Notified', 'In Progress', 'Completed',]}
                      data={[18, 28, 16, 59, 16, 30]}

                    />
                  </div>
                  <div className="col-lg-4 col-sm-12 mb-5">
                    <h6 style={{ marginLeft: "20%" }}>Total Ambulance Request (65)</h6>
                    <Report label={['Pending Verification', 'Verified ', 'Rejected', 'Notified', 'In Progress', 'Completed',]}
                      data={[10, 18, 16, 49, 100, 200]}

                    />
                  </div>
                  <div className="col-lg-4 col-sm-12 mb-5">
                    <h6 style={{ marginLeft: "20%" }}  >Total Lawyer Requests (20)</h6>
                    <Report label={['Pending Verification', 'Verified ', 'Rejected', 'Notified', 'In Progress', 'Completed',]}
                      data={[12, 18, 16, 19, 16, 10]}
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

export default OtherServices;