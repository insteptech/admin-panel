export const getLiveRequestQuery = (data) => {
  const mobile = data && data.mobile ? JSON.stringify(data.mobile) : null;
  const Verified = data && data.verified === "true" ? true : data.verified === "false" ? false : null;
  const status = data && data.status === "true" ? true : data.status === "false" ? false : null;
  const gender = data && data.gender ? JSON.stringify(data.gender) : null;
  const bloodGroup = data && data.BloodGroup ? JSON.stringify(data.BloodGroup) : null;
  const lat = data && data.address ? JSON.stringify(data.address.lat) : null;
  const long = data && data.address ? JSON.stringify(data.address.long) : null;
  const distance = data && data.radius ? data.radius : null;
  const workDivisionId = data && data.workDivisionId ? JSON.stringify(data.workDivisionId) : null;

  return `
    query {
      liveRequestsForAdmin(
        page: { pageNumber: ${data.pageNumber}, perPage: 20 }
        filter: {
          address: { lat: ${lat} , long: ${long} }  
          mobile: ${mobile}
          gender: ${gender}
          bloodGroup: ${bloodGroup}
          Verified: ${Verified}
          status: ${status}
        }
        distance: ${distance}
      ) {
  
        metadata{
          total
        }
  
        data {
         
          _id
            requesterId
            helperId
            requestType
            status
            createdAt
            updatedAt
            distance
           helper {
                Mobile
                Verified
                Active
                deviceToken
              }
              helperProfile {
                fullName
                gender
                email
                bloodGroup
                avtar
              }
        requester{
                Mobile
                Active
                deviceToken
                Verified
              }
              requesterProfile{
                fullName
                gender
                bloodGroup
                email
                avtar
  
              }
              helperLiveLocation {
                lat
                long
              }
              requesterLiveLocation {
                lat
                long
              }  
  
        }
      }
    }
    `
}
export const getLiveRequestCompletQuery = (data) => {
  const mobile = data && data.mobile ? JSON.stringify(data.mobile) : null;
  const Verified = data && data.verified === "true" ? true : data.verified === "false" ? false : null;
  const status = data && data.status === "true" ? true : data.status === "false" ? false : null;
  const gender = data && data.gender ? JSON.stringify(data.gender) : null;
  const bloodGroup = data && data.BloodGroup ? JSON.stringify(data.BloodGroup) : null;
  const lat = data && data.address ? JSON.stringify(data.address.lat) : null;
  const long = data && data.address ? JSON.stringify(data.address.long) : null;
  const distance = data && data.radius ? data.radius : null;
  const workDivisionId = data && data.workDivisionId ? JSON.stringify(data.workDivisionId) : null;

  return `
      query {
        completLiveRequestsForAdmin(
          page: { pageNumber: ${data && data.pageNumber ? data.pageNumber : 1}, perPage: 20 }
          filter: {
            address: { lat: ${lat} , long: ${long} }  
            mobile: ${mobile}
            gender: ${gender}
            bloodGroup: ${bloodGroup}
            Verified: ${Verified}
            status: ${status}
          } 
          distance: ${distance}
        ) {
    
          metadata{
            total
          }
    
          data {
           
            _id
              requesterId
              helperId
              requestType
              status
              createdAt
              updatedAt
              distance
             helper {
                  Mobile
                  Verified
                  Active
                  deviceToken
                }
                helperProfile {
                  fullName
                  gender
                  email
                  bloodGroup
                  avtar
                }
          requester{
                  Mobile
                  Active
                  deviceToken
                  Verified
                }
                requesterProfile{
                  fullName
                  gender
                  bloodGroup
                  email
                  avtar
    
                }
                helperLiveLocation {
                  lat
                  long
                }
                requesterLiveLocation {
                  lat
                  long
                }  
    
          }
        }
      }
      `
}

export const updateHelpRequestCancelMutation = (data) => {
  return `mutation {
    updateHelpRequestCancel(
      status: "${data.status}"
      helpRequestId: "${data._id}"
    ) {
      _id
    }
  }`
};