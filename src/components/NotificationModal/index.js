import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationlistAction,
  sendNotificationAction,
} from "../../Redux/action";
import { Accordion, Card, Tab, Row, Col, Nav, Modal, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { BsFillCheckCircleFill, BsCircle } from "react-icons/bs";
// import { uploadFile } from 'react-s3';
// import S3FileUpload from 'react-s3';


// const S3_BUCKET = 'helpyfinder';
// const REGION = 'us-west-1';
// const ACCESS_KEY = '';
// const SECRET_ACCESS_KEY = '';
// const dirName = "uploads/";


// const config = {
//   bucketName: S3_BUCKET,
//   dirName: dirName,
//   region: REGION,
//   accessKeyId: ACCESS_KEY,
//   secretAccessKey: SECRET_ACCESS_KEY,
// }

const NotifictionModal = (props) => {


  const [mobileNumber, setMobileNumber] = React.useState('');
  const [whatsappMobileNumber, setWhatsappMobileNumber] = React.useState('');
  // const [smsMobileNumber, setSmsMobileNumber] = React.useState();
  const [addNumber, setAddNumbere] = React.useState([]);
  // const [smsAddNumber, setSmsAddNumbere] = React.useState([]);
  const [whatsappAddNumber, setWhatsappAddNumbere] = React.useState([]);
  const [showNumber, setShowNumber] = React.useState(false);
  const [addMessage, setAddMessage] = React.useState("");
  const [messageId, setMessegeId] = React.useState("");
  const [sendPushnotification, setNotifMessage] = React.useState(true);
  const [resourses, setResourses] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState([]);
  const [amberNotif, setAmberNotif] = React.useState(false);
  const [values, setValues] = React.useState(''); // sms text field values
  const [imageUpload, setImageUpload] = useState(null);
  const [files, setFiles] = useState(null);

  const dispatch = useDispatch();
  const amberDocs = props.amberAlertDocument;
  /**
   * @description get notification list
   * @param {*}
   */
  React.useEffect(() => {
    dispatch(getNotificationlistAction());
  }, [props]);

  React.useEffect(() => {
    return () => {
      setMobileNumber('')
      setAddMessage('')
      setResourses(false)
      // setNotifMessage('')
      setValues('')
      setWhatsappMobileNumber('')
      localStorage.removeItem("amberAlertId")
    }
  }, [props])

  let location = useLocation();
  // console.log("addSmsNumberFunaddSmsNumberFun", location)


  const notificationList = useSelector((state) => state.notificationList.notificationList);
  // console.log("notificationListnotificationList", notificationList)

  /**
   * @description add number function
   * @param {*} e
   * @author prabhakar
   */
  const addNumberFun = (e) => {
    e.preventDefault();
    setMobileNumber('')
    setAddNumbere([...addNumber, mobileNumber]);
    setShowNumber(true);
  };
  // const addSmsNumberFun = (e) => {
  //   e.preventDefault();
  //   setSmsAddNumbere([...smsAddNumber, smsMobileNumber]);
  //   setShowNumber(true);
  //   // console.log("addSmsNumberFunaddSmsNumberFun", smsAddNumber)
  // };
  const addWhatsappNumberFun = (e) => {
    e.preventDefault();
    setWhatsappAddNumbere([...whatsappAddNumber, whatsappMobileNumber]);
    setShowNumber(true);
    setWhatsappMobileNumber('')
    console.log("addSmsNumberFunaddSmsNumberFun", whatsappAddNumber)
  };

  const addMessageFun = (e) => {
    e.preventDefault();
  };

  /**
   * @description add nassege function
   * @param {@d} message
   */
  const Messege = (id, message) => {
    if (messageId === id) {
      setMessegeId("");
      console.log("MessegeMessegeMessege", id, messageId)
    }
    else {
      setMessegeId(id);

    }
    // setMessege(message)
  };

  /**
   * @description detete number function function
   * @param {@d} message
   */
  const deleteNumder = (e, item) => {
    e.preventDefault();
    setAddNumbere((prev) => prev.filter((number) => number !== item));
  };
  // const smsDeleteNumder = (e, item) => {
  //   e.preventDefault();
  //   setSmsAddNumbere((prev) => prev.filter((number) => number !== item));
  // };
  const whatsappDeleteNumder = (e, item) => {
    e.preventDefault();
    setWhatsappAddNumbere((prev) => prev.filter((number) => number !== item));
  };
  /**
   * @description send notification function
   * @param {@d} message
   */
  const notifictionfun = (e) => {

    let { selectAllmobileNumber } = props;
    let finalNumbers = selectAllmobileNumber.concat(addNumber);
    let finalWhatsappNumber = selectAllmobileNumber.concat(whatsappAddNumber);
    // let finalSmsNumber = selectAllmobileNumber.concat(smsAddNumber);
    let url = []
    imageUrl.map((item) => {
      url.push(item.url)
    })
    const amberalertdataId = localStorage.getItem("amberAlertId")

    if (e === "pushnotification") {
      const data = {
        allNumber: finalNumbers,
        addMessage,
        messageId,
        sendPushnotification: true,
        resourses,
      };
      sendNotificationActionFun(data);
    }
    if (e === "whatsapp") {
      const data = {
        allNumber: finalWhatsappNumber,
        messageId,
        sendPushnotification: false,
        resourses: false,
        sendWhatsapp: true,
      };
      sendNotificationActionFun(data);
    }
    if (e === "sms") {
      const data = {
        allNumber: finalWhatsappNumber,
        messageId,
        sendPushnotification: false,
        resourses: false,
        values,
        sendSMS: true
      };
      sendNotificationActionFun(data);
    }
    if (e === "amberAlert") {
      const amberalertdataId = localStorage.getItem("amberAlertId")
      const data = {
        allNumber: finalNumbers,
        addMessage: addMessage,
        amberalertdataId: amberalertdataId,
        url: url,
        messageId: messageId,
        sendAmber: true,
        amberAlertName: props?.amberAlertName,
        sendPushnotification: true
      }
      sendNotificationActionFun(data);
      console.log("datadatadatadata", data)

    }




    // dispatch(sendNotificationAction(data))
    //   .then(() => {
    //     const { ClearMobileNumber } = props;
    //     ClearMobileNumber();
    //     setShowNumber(true);
    //     setMessegeId("");
    //     setAddMessage("");
    //     setShowNumber("");
    //     setAddNumbere([]);
    //   })
    //   .catch((err) => { });
    // alert("Done, Amber-Alert send to user")
  };
  const sendNotificationActionFun = (data) => {
    const imgPush = files ? imageUpload : null

    dispatch(sendNotificationAction(data, imgPush))
      .then(() => {
        const { ClearMobileNumber } = props;
        ClearMobileNumber();
        setShowNumber(true);
        setMessegeId("");
        setAddMessage("");
        setShowNumber("");
        setAddNumbere([]);
        setResourses(false)
        setFiles(null)
        setImageUpload(null)
      })
      .catch((err) => { });
  }

  // const setNotifAndMessage = () => {
  //   setNotifMessage(!sendPushnotification)
  // }
  const setResourse = () => {
    setResourses(!resourses)
    setNotifMessage(!sendPushnotification)
  }
  const amberalertNotif = () => {
    setAmberNotif(!resourses)
  }
  const handleUpload = (e) => {
    console.log(e.target.files[0], "vvvvvvvvvvv");


    // S3FileUpload
    //   .uploadFile(e.target.files[0].name, config)
    //   .then(data => console.log("vvvvvvvvvvvvvvvvvvvvvv", data))
    //   .catch(err => console.error("errerrerrerrerr", err))

    e.preventDefault();
  };

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const imageSelect = (item, index) => {
    if (imageUrl.some((item) => item.index === index)) {
      var imageArray = imageUrl.filter((item) => item.index != index);
      setImageUrl(imageArray)
    }
    else {
      setImageUrl([...imageUrl, { index: index, url: item?.url }])
    }
  }

  const imgSubmit = (event) => {
    const selectedImage = event.target.files[0];
    setImageUpload(event.target.files[0]);
    if (selectedImage) {
      setFiles(URL.createObjectURL(selectedImage));
      // onImageSelect(setImage, selectedImage);
    }

  };

  return (
    <div className="modal fade modal-notification-main" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"  >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modalNotification" role="document" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Send Notification
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <Modal.Body className="show-grid notification-modal">
            <p style={{ fontSize: 20, fontWeight: 'bold' }}>Push notification</p>
            <Container fluid>
              <Row className="justify-content-around">
                <Col xs={12} md={4} lg={4} className="textAreaCenter">
                  <textarea id="w3review" className="col-md-10" value={addMessage} placeholder={'Push notification message to be entered to send to application user'} onChange={(e) => setAddMessage(e.target.value)} />
                </Col>
                <Col xs={6} md={4} lg={4} className="">
                  {
                    location.pathname.includes("/AmberAlertsType") ?
                      <div>
                        <button style={{ alignItems: 'center' }} className="btn btn-outline-success">
                          Sending amber alert notification
                        </button>
                        <div style={{ marginTop: 10 }}>
                          <button
                            type="button"
                            // className="abc"
                            className="btn btn-primary md-4 col-6"
                            data-dismiss="modal"
                            onClick={() => notifictionfun("amberAlert")}
                          >
                            Amber Alert
                          </button>
                        </div>
                      </div>
                      :
                      <>
                        <h5 className="mb-2" > Select CheckBox To Send Resourced Notification  </h5>
                        <div class="form-check">
                          <input class="form-check-input rcheckbox" type='checkbox' id="resourses" onClick={() => setResourse()} />
                          <label for="resourses" className={resourses ? 'form-check-label ml-2 text-primary align-self-center mb-0 font-weight-bold' : 'form-check-label ml-2 text-dark align-self-center mb-0 font-weight-bold'}>Resources</label>
                        </div>
                        <div className="justify-content-around align-items-center row">
                          <form>
                            <div className="form-group">
                              <label for="inputGroupFile01">Choose file</label>
                              <input type="file" class="form-control-file" id="inputGroupFile01" onChange={imgSubmit} />
                            </div>
                          </form>
                          {files && files.length > 0 && (

                            <img src={files} alt="preview image" style={{ height: "130px", width: "130px" }} />
                          )}
                        </div>

                        {/* <div class="file-field medium">
                                  <div class="parent-div btn btn-outline-success waves-effect float-left">
                                    <span className="d-flex">
                                      <h5 className="d-flex align-items-center justify-content-center mt-3">Choose files</h5>
                                      <i class="btn-upload fas fa-cloud-upload-alt ml-3" aria-hidden="true" ></i>
                                    </span>
                                    <input
                                      // {...input}
                                      className="w-100 h-100"
                                      onChange={(event) => { imgSubmit(event) }}
                                      type="file"
                                      name="upfile"
                                    />
                                  </div>
                                </div> */}
                        <button
                          type="button"
                          className="btn btn-primary md-4 col-6"
                          data-dismiss="modal"
                          onClick={() => notifictionfun("pushnotification")}
                        >
                          send Push Notification
                        </button>
                      </>
                  }
                </Col>
                <Col xs={6} md={4} lg={2}>
                  {
                    location.pathname === "/AmberAlertsType" ?
                      null
                      :
                      <div className="row">
                        <input
                          type="search"
                          className="form-control addNumber col-md-6"
                          value={mobileNumber}
                          placeholder="enter mobile number"
                          aria-label="Search"
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-info ml-2 col-md-5"
                          onClick={(e) => addNumberFun(e)}
                        >
                          Add Number
                        </button>
                        {!showNumber ? (
                          <textarea id="show-phone-number" className="" placeholder={'Additional number to be added with the selected numbers \n Add from above column'} />
                        ) : (
                          <>
                            <div
                              id="show-phone-number"
                              className="d-flex border px-2 my-4"
                            >
                              {addNumber.length > 0 &&
                                addNumber.map((item, index) => {
                                  return (
                                    <>
                                      <div className="d-flex shownumber mx-1">
                                        <div className="addNuber">{item}</div>
                                        <div
                                          className="delete-number"
                                          onClick={(e) => deleteNumder(e, item)}
                                        >
                                          <TiDelete />
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                            </div>
                          </>
                        )}
                      </div>
                  }
                </Col>
              </Row>
              <div className="modal-footer m-5"> </div>
              {/* Amber Alert Images */}
              {
                location.pathname.includes("/AmberAlertsType") ?
                  <Row>
                    <Col xs={6} md={4}>

                      <div style={{ overflow: 'scroll', whiteSpace: 'nowrap', width: '100%' }} >
                        {
                          amberDocs.length > 0 &&
                          amberDocs.map((item, index) => {
                            console.log(item, "notificationListnotificationList");

                            return (
                              <div onClick={() => { imageSelect(item, index) }} style={{ height: '200px', flexWrap: 'wrap', width: '250px', borderColor: 'indigo', borderWidth: '2px', border: '5px', margin: '5px', display: 'inline' }}>
                                <img src={item.url} />
                                {
                                  imageUrl?.some((item) => item.index === index) ?
                                    <BsFillCheckCircleFill color="#0056A1" /> :
                                    <BsCircle />
                                }
                              </div>
                            )
                          })
                        }
                      </div>
                    </Col>
                  </Row>
                  :
                  null
              }
              <div className="modal-footer m-5"> </div>

              <div style={{ alignItems: 'center', display: 'flex', }}>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>Whatsapp only</p>
              </div>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                  <Col xs={8} md={12}>
                    <Nav variant="pills" className="flex-row">
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="first">All Templates</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="second">Personal Profile</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="third">Professional Profile</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="fourth">NearBy help</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="fifth">Family Help</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="sixth">Doctor Help</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="seventh">Ambulance Help</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="eighth">NGO Help</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="nine">KYC Document</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="ten">Amber Alert</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="eleven">Payment</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="twelve">Location</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="thirteen">Promotional</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="fourteen">Error Notification</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link style={{ color: '#15CE' }} eventKey="fifteen">Emergency Contact</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  {/* <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col>
                <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col> */}
                </Row>
                <Row>
                  <Col xs={8} md={9}>
                    {/* <div className="notification-list col-md-9"> */}
                    <Tab.Content className="notification-list">
                      <Tab.Pane eventKey="first">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")
                            return (
                              item.isApproved ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            return (
                              item?.group?.includes("PersonalProfile") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            return (
                              item?.group?.includes('ProfessionalProfile') ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("NearByHelp") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifth">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("familyHelp") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="sixth">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("DoctorHelp") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="seventh">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("ambulanceHelp") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="eighth">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("NGOHelp") ?
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="nine">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("KYCDocument") ?
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="ten">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("AmberAlert") ?
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="eleven">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("Payment") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="twelve">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("location") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="thirteen">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("Promotional") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourteen">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("errorNotification") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifteen">
                        {notificationList &&
                          notificationList.length > 0 &&
                          notificationList.map((item, index) => {
                            // console.log(item, "notificationList_item")

                            return (
                              item?.group?.includes("emergencyContact") ?
                                // <li>hello</li>
                                <li
                                  className={
                                    messageId === item._id
                                      ? "list-group-item selected  "
                                      : "list-group-item  "
                                  }
                                >
                                  <a
                                    onClick={(e) => Messege(item._id, item.message)}
                                    href="JavaScript:void(0);"
                                    disabled={true}
                                    style={{ color: messageId == item._id ? 'red' : 'black' }}
                                  >
                                    {item.message}
                                  </a>
                                </li>
                                :
                                null
                            );
                          })}
                      </Tab.Pane>
                    </Tab.Content>
                    {/* </div> */}
                  </Col>
                  <Col sx={4} m={3}>
                    {
                      location.pathname === "/AmberAlertsType" ?
                        null
                        :
                        <div className="column p-4">
                          <div className="AmberAlertsType-class-modal row justify-content-center">
                            <input
                              type="search"
                              className="form-control addNumber col-lg-5 col-md-4 col-sm-12"
                              value={whatsappMobileNumber}
                              placeholder="enter mobile number"
                              aria-label="Search"
                              onChange={(e) => setWhatsappMobileNumber(e.target.value)}
                            />
                            <button
                              type="button"
                              className="btn btn-info ml-2 col-lg-4 col-md-4 col-sm-12"
                              onClick={(e) => addWhatsappNumberFun(e)}
                            >
                              Add Number
                            </button>
                          </div>
                          <div className="col-lg-12 col-md-6 col-sm-12 p-4 AmberAlertsType-class-modal">
                            {!showNumber ? (
                              <textarea id="show-phone-number" className="col-md-12" placeholder={'Additional number to be added with the selected numbers \n Add from above column'} />
                            ) : (
                              <>
                                <div
                                  id="show-phone-number"
                                  className="d-flex border"
                                >
                                  {whatsappAddNumber.length > 0 && whatsappAddNumber.map((item, index) => {
                                    return (
                                      <>
                                        <div className="d-flex shownumber mx-1">
                                          <div className="addNuber">{item}</div>
                                          <div className="delete-number" onClick={(e) => whatsappDeleteNumder(e, item)} >
                                            <TiDelete />
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="col-12">
                            <div class="text-center align-items-center mt-3 mb-4">
                              <button type="button" className="btn btn-primary col-md-8" data-dismiss="modal" onClick={() => notifictionfun("whatsapp")} >
                                send Whatsapp
                              </button>
                            </div>
                          </div>
                          {/* <div className="modal-footer m-5"> </div> */}
                          <div className="justify-content-center text-center"> OR</div>
                        </div>
                    }
                    {/* sms code */}

                    <div className="col-md-12 sms-sending-modal h-25">

                      {/* <div class="row bd-highlight"> */}
                      <div className="col-lg-12 col-md-12 col-sm-12 mb-2 h-50">
                        <textarea
                          className="h-100 w-100 col-lg-12 col-md-12 col-sm-12"
                          // type="search"
                          placeholder="SMS Message type here to send"
                          aria-label="Search"
                          value={values.title}
                          // disabled={values.address}
                          onChange={changeHandler}
                          name="title"
                        />
                      </div>
                      <div className="col-12 text-center mt-3 mb-4">
                        <button
                          type="button"
                          className="btn btn-primary md-4 col-md-8"
                          data-dismiss="modal"
                          onClick={() => notifictionfun("sms")}
                        >
                          send SMS
                        </button>
                      </div>
                      {/* </div> */}
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </Container>
          </Modal.Body >

        </div>
      </div>
    </div>
  );
};
export default NotifictionModal;

// sms code 

{/* <div className="col-lg-6 col-md-6 col-sm-12">
{
  location.pathname === "/AmberAlertsType" ?
    null
    :
    <div className="column">

      <input
        type="search"
        className="form-control addNumber"
        value={smsMobileNumber}
        placeholder="enter mobile number"
        aria-label="Search"
        onChange={(e) => setSmsMobileNumber(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-info ml-0 mt-2"
        onClick={(e) => addSmsNumberFun(e)}
      >
        Add Number
      </button>
      {!showNumber ? (
        <textarea id="show-phone-number" className="" placeholder={'Additional number to be added with the selected numbers \n Add from Above column'} />
      ) : (
        <>
          <div
            id="show-phone-number"
            className="d-flex border"
          >
            {smsAddNumber.length > 0 &&
              smsAddNumber.map((item, index) => {
                return (
                  <>
                    <div className="d-flex shownumber mx-1">
                      <div className="addNuber">{item}</div>
                      <div
                        className="delete-number"
                        onClick={(e) => smsDeleteNumder(e, item)}
                      >
                        <TiDelete />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </>
      )}
    </div>
}
</div> */}






{/* <Accordion> */ }

{/* <Card>
                        <Accordion.Toggle as={Card.Title} eventKey="0" style={{ color: "#007bff", fontSize: "20px" }}>
                          Approved
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="0">
                          <Card.Body >
                            {notificationList &&
                              notificationList.length > 0 &&
                              notificationList.map((item, index) => {
                                // console.log(item, "notificationList_item")
                                return (
                                  item.isApproved === true ?
                                    // <li>hello</li>
                                    <li
                                      className={
                                        messageId === item._id
                                          ? "list-group-item selected  "
                                          : "list-group-item  "
                                      }
                                    >
                                      <a
                                        onClick={(e) => Messege(item._id, item.message)}
                                        href="JavaScript:void(0);"
                                        disabled={true}
                                        style={{ color: messageId == item._id ? 'red' : 'black' }}
                                      >
                                        {item.message}
                                      </a>
                                    </li>
                                    :
                                    null
                                );
                              })}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>

                      <Card>
                        <Accordion.Toggle as={Card.Title} eventKey="1" style={{ color: "#007bff", fontSize: "20px" }}>
                          Amber Alert
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            {notificationList &&
                              notificationList.length > 0 &&
                              notificationList.map((item, index) => {
                                return (
                                  item.name.includes('amberalert') ?
                                    // <li>hello</li>
                                    <li
                                      className={
                                        messageId === item._id
                                          ? "list-group-item selected  "
                                          : "list-group-item  "
                                      }
                                    >
                                      <a
                                        onClick={(e) => Messege(item._id, item.message)}
                                        href="JavaScript:void(0);"
                                        disabled={true}
                                        style={{ color: messageId == item._id ? 'red' : 'black' }}
                                      >
                                        {item.message}
                                      </a>
                                    </li>
                                    :
                                    null
                                );
                              })}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>


                      <Card>
                        <Accordion.Toggle as={Card.Title} eventKey="2" style={{ color: "#007bff", fontSize: "20px" }}>
                          Professionalprofile
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="2">
                          <Card.Body>
                            {notificationList &&
                              notificationList.length > 0 &&
                              notificationList.map((item, index) => {
                                return (
                                  item.name.includes('professionalprofile') ?
                                    // <li>hello</li>
                                    <li
                                      className={
                                        messageId === item._id
                                          ? "list-group-item selected  "
                                          : "list-group-item  "
                                      }
                                    >
                                      <a
                                        onClick={(e) => Messege(item._id, item.message)}
                                        href="JavaScript:void(0);"
                                        disabled={true}
                                        style={{ color: messageId == item._id ? 'red' : 'black' }}
                                      >
                                        {item.message}
                                      </a>
                                    </li>
                                    :
                                    null
                                );
                              })}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>


                      <Card>
                        <Accordion.Toggle as={Card.Title} eventKey="3" style={{ color: "#007bff", fontSize: "20px" }}>
                          Location
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="3">
                          <Card.Body>
                            {notificationList &&
                              notificationList.length > 0 &&
                              notificationList.map((item, index) => {
                                // console.log(item, "notificationList_item")

                                return (
                                  item.name.includes('location') ?
                                    // <li>hello</li>
                                    <li
                                      className={
                                        messageId === item._id
                                          ? "list-group-item selected  "
                                          : "list-group-item  "
                                      }
                                    >
                                      <a
                                        onClick={(e) => Messege(item._id, item.message)}
                                        href="JavaScript:void(0);"
                                        disabled={true}
                                        style={{ color: messageId == item._id ? 'red' : 'black' }}
                                      >
                                        {item.message}
                                      </a>
                                    </li>
                                    :
                                    null
                                );
                              })}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card> */}



{/* </Accordion> */ }