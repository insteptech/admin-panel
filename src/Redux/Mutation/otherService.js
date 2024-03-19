export const getOtherServiceQuery = (data) => {
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
      servicesForAdmin(
        page: { pageNumber: ${data && data.pageNumber ? data.pageNumber : 1}, perPage: 20 }
        filter:{
          mobile: ${mobile}
          gender: ${gender}
          bloodGroup: ${bloodGroup}
          Verified: ${Verified}
          status: ${status}
          
        }
        distance: ${distance}
      ){
        metadata{
          total
        }
        data{
          _id
          status
          createdAt
          updatedAt

          requestType
          helperProfile{
            gender
            fullName
            bloodGroup
            email
            avtar
          }
          requesterProfile{
            gender
            fullName
            bloodGroup
            email
            avtar
    
          }
          documents{
            url
            name
            reason
            serviceDataId
            type
            
          }
          helperLiveLocation{
            lat
            long
          }
          helper{
            Mobile
            Verified
            deviceToken
            Active
          }
          requester{
            Mobile
            Active
            Verified
            deviceToken
            
            
          }
          serviceData{
            _id
            comment
            trackingId
            serviceForOrBy
            
          }
          helperLiveLocation{
            lat
            long
          }
          requesterLiveLocation{
            lat
            long
          }
        }
      }
    }
    `
}