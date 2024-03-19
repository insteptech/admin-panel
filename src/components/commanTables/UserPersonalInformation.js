import React from 'react'
import moment from 'moment'
import Geocode from "react-geocode";
const PersonalInformation = (props) => {

  const [location, setLocatin] = React.useState()
  const personalData = props && props.personalInformation && props.personalInformation.length > 0 && props.personalInformation[0] || props.personalInformation;
  const personalData1 = props && props.personalInformation && props.personalInformation.length > 0 && props.personalInformation[0].user[0];

  const address = personalData1 && personalData.address && personalData.address.presentAddress ? personalData.address.presentAddress : null
  const lat = personalData1 && personalData.location && personalData.location.lat ? personalData.location.lat : null
  const long = personalData1 && personalData.location && personalData.location.long ? personalData.location.long : null
  // const fullName = personalData && personalData.fullName ? personalData.fullName : null;
  const fullName = (personalData && personalData.personal && personalData.personal.fullName) ? personalData.personal.fullName : (personalData?.personal?.length > 0 && personalData.personal[0] && personalData.personal[0].fullName) ? personalData.personal[0].fullName : null
  const Mobile = personalData && personalData1.Mobile ? personalData1.Mobile : null;
  const Active = personalData && personalData1.Active ? personalData1.Active : null;
  const DOB = personalData && personalData.personal && personalData.personal.age ? personalData.personal.age : null;
  const bloodGroup = personalData && personalData.personal && personalData.personal.bloodGroup ? personalData.personal.bloodGroup : null;
  const gender = personalData && personalData.personal && personalData.personal.gender ? personalData.personal.gender : null;
  const email = personalData && personalData.personal && personalData.personal.email ? personalData.personal.email : null;
  // const DeviceType = personalData && personalData1.DeviceType ? personalData1.DeviceType : null;
  const profileImage = personalData && personalData.personal && personalData.personal.avtar ? personalData.personal.avtar : null;
  const createdAt = personalData && personalData1.createdAt ? personalData1.createdAt : null;
  console.log("props_personalInformation", personalData);


  const installationDate = moment(createdAt).format("LLLL")

  var dateFormat = moment(DOB, 'DD-MM-YYYY').format('MM-DD-YYYY')
  const age = DOB === null ? <p style={{ textAlign: "center" }}>_ _ _</p> : moment().diff(dateFormat, 'years')

  Geocode.setApiKey("AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU");
  Geocode.fromLatLng(`${lat}`, `${long}`).then(
    (response) => {
      const address1 = response.results[0].formatted_address;
      // console.log(address1);
      setLocatin(address1)
    },
    (error) => {
      console.error(error);
    }

  );
  // Geocode.setApiKey("AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU");  
  return (
    <>
      {/* <h6 className=" text-green font-weight-bold  text-center">Personal Information</h6> */}
      <div className="col-xl-12 col-lg-12">
        <div className="card mb-4">
          <div className="card-header py-3"> <h6 className=" text-green font-weight-bold  text-center">Personal Information</h6></div>
          <div class="card-b</div>ody">
            <div className="table-responsive portlet">
              <table className="table table-bordered table-striped">
                <thead className="col">
                  <tr className="col">
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Age</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Current Address</th>
                    <th scope="col">Installation Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Profile Image</th>

                  </tr>
                </thead>
                <tbody>
                  <tr className="table-row">
                    <td>{fullName}</td>
                    <td>{Mobile}</td>
                    <td>{age}</td>
                    <td>{DOB === null ? <p style={{ textAlign: "center" }}>_ _ _</p> : DOB}</td>
                    <td>{email === null ? <p style={{ textAlign: "center" }}>_ _ _</p> : email}</td>
                    <td>{address === null ? <p style={{ textAlign: "center" }}>_ _ _</p> : address}</td>
                    <td>{location === null ? <p style={{ textAlign: "center" }}>_ _ _</p> : location}</td>
                    <td>{installationDate}</td>
                    <td>{`${Active}`}</td>
                    <td>{gender}</td>
                    <td>{bloodGroup}</td>
                    {/* <td>{DeviceType}</td> */}
                    <td style={{ height: '5%', width: '5%' }}>{<img style={{ width: "100%" }} src={`${profileImage}`} alt="no Profile Image" />}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default PersonalInformation
