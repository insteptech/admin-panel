export const otherServiceDetail = (id) => {
  // const createdAt = data && data.createdAt ? data.createdAt : null;
  // const status = data && data.status ? data.status : null;
  // const lat = data && data.requesterLiveLocation && data.requesterLiveLocation.lat ? data.requesterLiveLocation.lat : null;
  // const long = data && data.requesterLiveLocation && data.requesterLiveLocation.long ? data.requesterLiveLocation.long : null;
  // const serviceDataId = data && data.documents[0] && data.documents[0].serviceDataId ? data.documents[0].serviceDataId : null;
  // const type = data && data.documents && data.documents[0] && data.documents[0].type ? data.documents[0].type : null;
  // const name = data && data.documents && data.documents[0] && data.documents[0].name ? data.documents[0].name : null;
  // const url = data && data.documents && data.documents[0] && data.documents[0].url ? data.documents[0].url : null;
  // const reason = data && data.documents && data.documents[0] && data.documents[0].reason ? data.documents[0].reason : null;


  return `
    query {
      serviceReqDetail(serviceDataId: "${id}") {
        _id
        createdAt
        updatedAt
        helperId
        requesterId
        requestType
        serviceDataId
        status
        requesterLocation {
          lat
          long
          location
        }
        helperLocation {
          lat
          long
          location
        }
        address{
          presentAddress
          previousAddress{
            address
            lat
            long
            createdAt
          }
          lat
          long
          createdAt
        }
        requester{
          Mobile
          Verified
          Active
          deviceToken
          DeviceId
          DeviceType
          addedByAdmin
          createdAt
          updatedAt
        }
        requesterPersonal{
          age
          avtar
          bloodGroup
          createdAt
          email
          fullName
          gender
        }
        workProfile {
          workDIvision
          workingArea
          workingHours
          workingDays
          serviceName{
            name
            url
          }
        }
        commentTrail{
          _id
          adminId
          createdAt
          message
          updatedAt
          userId
        }
        documents {
          _id
          serviceDataId
          type
          name
          url
          reason
          status
        }
        activity{
          createdAt
          updatedAt
          requesterId
          requesterLocation{
            lat
            long
            location
          }
          helperLocation{
            lat
            long
            location
          }
          distance
          status
          
        }
      }
    }    
      `
}