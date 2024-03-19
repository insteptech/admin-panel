export const getAmberAlertDataByAlertIdQuery = (_id) => {
  return `
query {
  getAmberAlertDataByAlertId(alertId: "${_id}") {
    _id
    amberAlertId
    userId
    alertForOrBy
    rgNumber
    comment
    status
    notified
    trackingId
    user {
      _id
      Mobile
      Active
      Verified
      Role
      deviceToken
      DeviceId
      DeviceType
    }
    personal {
      userId
      fullName
      gender
      bloodGroup
      avtar
      email
      age
      address {
        presentAddress
        lat
        long
      }
    }
    commentTrail {
      userId
      message
      adminId
      createdAt
      updatedAt
    }
    amberDataDocuments {
      _id
      amberAlertDataId
      userId
      serviceDataId
      type
      name
      url
      status
      reason
    }
    helprequest {
      _id
      requesterId
      requesterLocation {
        lat
        long
        location
      }
      helperId
      helperLocation {
        lat
        long
        location
      }
      distance
      amberAlertDataId
      requestReceiverIds
      requestReceiverEmergencyContacts
      serviceDataId
      status
      requestType
      createdAt
      updatedAt
    }
    helper {
      _id
      requesterId
      requesterLocation {
        lat
        long
        location
      }
      helperId
      helperLocation {
        lat
        long
        location
      }
      distance
      amberAlertDataId
      requestReceiverIds
      requestReceiverEmergencyContacts
      serviceDataId
      status
      requestType
      createdAt
      updatedAt
    }
  }
}
    `;
};
// const lat = data && data.address ? JSON.stringify(data.address.lat) : null;
// const long = data && data.address ? JSON.stringify(data.address.long) : null;
// const mobile = data && data.mobile ? JSON.stringify(data.mobile) : null;
// const gender = data && data.gender ? JSON.stringify(data.gender) : null;
// const bloodGroup = data && data.BloodGroup ? JSON.stringify(data.BloodGroup) : null;
// const Verified = data && data.verified == "true" ? true : data.verified === "false" ? false : null;
// const status = data && data.status == "true" ? true : data.status === "false" ? false : null;
// const distance = data && data.radius ? data.radius : null;
// filter: {address: { lat: ${lat}  long: ${long} }  mobile: ${mobile} gender: ${gender} bloodGroup: ${bloodGroup} Verified: ${Verified} status: ${status}} distance: ${distance} }
export const getAmberAlertDetailQuery = (data) => {
  console.log("lllllllllllll", data)
  return `
  query {
    amberAlertsAdmin(
      page: { pageNumber:${data && data.pageNumber ? data.pageNumber : 1}, perPage: ${data?.pieChart === 0 ? 0 : 100} }
      filter: {}
      distance: 3
    ) {
      metadata {
        total
      }
      data {
        _id
        alertForOrBy
        rgNumber
        comment
        status
        trackingId
        createdAt
        user {
          Mobile
          DeviceId
          Active
          DeviceType
          Verified
          Role
          deviceToken
        }
        personal {
          _id
          userId
          fullName
          gender
          bloodGroup
          avtar
          email
          age
        }
        amberAlert {
          _id
          name
        }
        document {
          _id
          amberAlertDataId
          userId
          type
          name
          url
          status
          reason
        }
        requesterLocation {
          _id
          lat
          long
          latLong
        }
        Group {
          group
          children {
            _id
            amberAlertDataId
            userId
            type
            name
            url
            status
            reason
          }
        }
      }
    }
  }     
    `;
};

export const getResponsesToAmberByUsers = (id) => {
  return `
   query{
  responsesToAmberByUsers(_id:"${id}"){
    _id
    amberAlertId
    userId
    alertForOrBy
    rgNumber
    comment
    status
    notified
    trackingId
    createdAt
    Notifications{
      _id
      status
      amberAlertDataId
      userId
      lat
      long
      Comment
      createdAt
      documents{
        _id
        amberAlertReplyId
        userId
        type
        url
      }
    }
  }
}
  `;
};
