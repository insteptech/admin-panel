
import React from 'react'
import PieChart from '../../components/pieChart'
import './Report.css'
import { Tabs, Tab } from 'react-bootstrap'
import LeftMenu from '../../components/LeftMenu/leftmenu'
import Header from '../../components/LeftMenu/header'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserAction } from '../../Redux/action';
import { amberAlertTypeAction } from '../../Redux/action'
const Reports = () => {
  const [isActive, setActive] = React.useState(false);
  const [totalUser, setTotalUser] = React.useState('');
  const [totalAmber, setTotalAmberAlert] = React.useState('');
  const [activeUser, setActiveUser] = React.useState([]);
  const [verifiedUser, setVerifiedUser] = React.useState([]);
  const [lost, setLost] = React.useState([]);
  const [disaster, setDisaster] = React.useState([]);
  const [stolen, setStolen] = React.useState([]);
  const [missing, setMissing] = React.useState([]);
  const toggleClass = () => {

  };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllUser();
    fetchAllAmberAlert();
  }, []);

  const fetchAllUser = () => {
    const data = {
      // pageNumber: 1,
      perPage: false,
      pieChart: 0,
    }
    dispatch(getAllUserAction(data)).then((response) => {
      const activeUserArr = [];
      const verifiedUser = [];
      response?.data.forEach(element => {
        if (element?.Active) {
          activeUserArr.push(element?.Active)
          setActiveUser(activeUserArr)
        }
        if (element?.Verified) {
          verifiedUser.push(element?.Verified)
          setVerifiedUser(verifiedUser)
        }

      });
      setTotalUser(response?.metadata?.total)
    })
  }
  const fetchAllAmberAlert = () => {
    const data = {
      // pageNumber: 1,
      pieChart: 0,
    }
    dispatch(amberAlertTypeAction(data)).then((response) => {
      setTotalAmberAlert(response?.metadata?.total)
      const lostArr = []
      const stolenArr = []
      const disasterArr = []
      const missingArr = []
      response?.data.forEach(element => {
        if (element?.amberAlert?.name === "Lost") {
          lostArr.push(element?.amberAlert?.name)
          setLost(lostArr.length);
        }
        if (element?.amberAlert?.name === "Missing") {
          missingArr.push(element?.amberAlert?.name)
          setMissing(missingArr.length);
        }
        if (element?.amberAlert?.name === "Stolen") {
          stolenArr.push(element?.amberAlert?.name)
          setStolen(stolenArr.length);
        }
        if (element?.amberAlert?.name === "Disaster") {
          disasterArr.push(element?.amberAlert?.name)
          setDisaster(disasterArr.length);
        }

      });
    })
  }

  return (
    <React.Fragment>
      <LeftMenu isActive={isActive} />

      <div className="mainParent">
        <Header toggleClass={toggleClass} />
        <div className="headingMain"> Report Page</div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 mt-4">
              <div className="card shadow">
                <div className="contentPart">
                  <Tabs className="tab" defaultActiveKey="Device" id="uncontrolled-tab-example">
                    <Tab className="tab" eventKey="Device" title="Device">
                      <div className="container-fluid">

                        <div className="row">
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6 >USERS</h6>
                            <p>Total user : {totalUser}</p>
                            <PieChart
                              label={[`Active User ${activeUser.length}`, `Verified User ${verifiedUser.length}`]}
                              data={[`${activeUser.length}`, `${verifiedUser.length}`]}
                            />
                          </div>
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>Amber Alert</h6>
                            <p>Total Amber Alert :{totalAmber}</p>
                            <PieChart
                              label={[`Lost ${lost}`, `Missing ${missing}`, `Stolen ${stolen}`, `Disaster ${disaster}`]}
                              data={[`${lost}`, `${missing}`, `${stolen}`, `${disaster}`]}
                            />
                          </div>
                          {/* <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>Active Device (1500)</h6>
                            <PieChart
                              label={[' last 3 days', ' last 5 days', ' last 10 days',]}
                              data={[280, 300, 590]}

                            />
                          </div>
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>Removed/Uninstalled from device ()</h6>
                            <PieChart
                              label={['Android', 'iOS', 'Others',]}
                              data={[500, 800, 600]}
                            />
                          </div> */}
                        </div>
                      </div>
                    </Tab>
                    {/* <Tab eventKey="Help Requests" title="Help Requests">
                      <div className="container-fluid">

                        <div className="row">
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>Help Requested (2000)</h6>
                            <PieChart
                              label={['Help Notification Initiated', 'Users Accepted', 'User Rejected', "Job Completed", "Help Cancelled by Requester",]}
                              data={[1000, 800, 600, 300, 400]}
                            />
                          </div>
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>Help Provided (2000)</h6>
                            <PieChart
                              label={['Help Notification Received', 'Users Accepted', 'User Rejected', "Job Completed", "Help Cancelled by Requester",]}
                              data={[1000, 800, 600, 300, 400]}
                            />
                          </div>
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>User has acknowledged </h6>
                            <PieChart
                              label={['Not acknowledged', 'Acknowlwdged and shared']}
                              data={[100, 300]}

                            />
                          </div>
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>City/State</h6>
                            <PieChart
                              label={['Android', 'iOS', 'Others',]}
                              data={[500, 800, 600]}

                            />
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey=" Amber alert" title=" Amber alert">
                      <div className="container-fluid">

                        <div className="row">
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>Help Requested (2000)</h6>
                            <PieChart
                              label={['Help Notification Initiated', 'Users Accepted', 'User Rejected', "Job Completed", "Help Cancelled by Requester",]}
                              data={[1000, 800, 600, 300, 400]}

                            />
                          </div>
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>Help Provided (2000)</h6>
                            <PieChart
                              label={['Help Notification Received', 'Users Accepted', 'User Rejected', "Job Completed", "Help Cancelled by Requester",]}
                              data={[1000, 800, 600, 300, 400]}
                            />
                          </div>
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>User has acknowledged </h6>
                            <PieChart
                              label={['Not acknowledged', 'Acknowlwdged and shared']}
                              data={[100, 300]}

                            />
                          </div>
                          <div className="col-lg-4 col-sm-12 mb-5">
                            <h6>City/State</h6>
                            <PieChart
                              label={['Android', 'iOS', 'Others',]}
                              data={[500, 800, 600]}
                            />
                          </div>
                        </div>
                      </div>

                    </Tab> */}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Reports


