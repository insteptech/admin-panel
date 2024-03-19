export const getAllUserQuery = (data) => {
  console.log(data, "getAllUserQuery_data")
  const mobile = data && data.mobile ? JSON.stringify(data.mobile) : null;
  const Verified = data && data.verified === "true" ? true : data.verified === "false" ? false : null;
  const status = data && data.status === "true" ? true : data.status === "false" ? false : null;
  const gender = data && data.gender ? JSON.stringify(data.gender) : null;
  const bloodGroup = data && data.BloodGroup ? JSON.stringify(data.BloodGroup) : null;
  const lat = data && data.address ? JSON.stringify(data.address.lat) : null;
  const long = data && data.address ? JSON.stringify(data.address.long) : null;
  const distance = data && data.radius ? data.radius : null;
  const workDivisionId = data && data.workDivisionId ? JSON.stringify(data.workDivisionId) : null;
  const noLocation = data?.noLocation === true ? true : null
  const num = noLocation ? 10000 : data && data.mobile ? 10000 : 100;
  const leads = data?.leads ? data.leads : null
  const subscription = data?.subscription ? data.subscription : null
  // const mobFilter = data && data.mobile ? 10000 : 20
  return `
query {
  allUsersForAdmin(
    page: { pageNumber: ${data && data.pageNumber ? data.pageNumber : 1}, perPage: 20 }
    filter: {
      address: { lat: ${lat} , long: ${long} }
      addedByAdmin: false
      mobile: ${mobile}
      gender: ${gender}
      bloodGroup: ${bloodGroup}
      Verified: ${Verified}
      status: ${status} 
      workDivision: ${workDivisionId}
      noLocation: ${noLocation}
      leads: ${leads}
      subscription: ${subscription}
    }
    distance: ${distance}
  ) {
    metadata {
      total
    }
    data {
      _id
      Mobile
      Active
      Verified
      createdAt
      personalprofile {
        fullName
        email
        gender
        bloodGroup
        age
      }
      livelocation{
        lat
        long
      }
      address {
        presentAddress
      }
      workDivision {
        name
      }
      idProof {
        userId
        type
        url
        status
      }
       EmergencyContact {
        userId
        fullName
        relation
        phone
      }
    }
    userQuery
  }
}`
}
export const exportDataQuery = (data) => {
  console.log(data, "getAllUserQuery_datassssssssssss")
  const mobile = data && data.mobile ? JSON.stringify(data.mobile) : null;
  const Verified = data && data.verified === "true" ? true : data.verified === "false" ? false : null;
  const status = data && data.status === "true" ? true : data.status === "false" ? false : null;
  const gender = data && data.gender ? JSON.stringify(data.gender) : null;
  const bloodGroup = data && data.BloodGroup ? JSON.stringify(data.BloodGroup) : null;
  const lat = data && data.address ? JSON.stringify(data.address.lat) : null;
  const long = data && data.address ? JSON.stringify(data.address.long) : null;
  const distance = data && data.radius ? data.radius : null;
  const workDivisionId = data && data.workDivisionId ? JSON.stringify(data.workDivisionId) : null;
  const noLocation = data?.noLocation === true ? true : null
  const num = noLocation ? 10000 : data && data.mobile ? 10000 : 100;
  // const mobFilter = data && data.mobile ? 10000 : 20
  return `
query {
  adminDataExporToExcel(
    page: { pageNumber: ${data && data.pageNumber ? data.pageNumber : 1}, perPage: ${num} }
    filter: {
      address: { lat: ${lat} , long: ${long} }
      addedByAdmin: false
      mobile: ${mobile}
      gender: ${gender}
      bloodGroup: ${bloodGroup}
      Verified: ${Verified}
      status: ${status} 
      workDivision: ${workDivisionId}
      noLocation: ${noLocation}
    }
    distance: ${distance}
  ) {
    metadata {
      total
    }
    data {
      _id
      Mobile
      Active
      Verified
      createdAt
      personalprofile {
        fullName
        email
        gender
        bloodGroup
        age
      }
      livelocation{
        lat
        long
      }
      address {
        presentAddress
      }
      workDivision {
        name
      }
      idProof {
        userId
        type
        url
        status
      }
      EmergencyContact {
        userId
        fullName
        relation
        phone
      }
    }
    userQuery
  }
}`
}



export const getUserByIdQuery = (id) => {

  return `
  query{
    userProfileById(userId: "${id}") {
      fullName
      gender
      bloodGroup
      avtar
      email
      age
        personal{
      fullName
      gender
      bloodGroup
      avtar
      email
      age
    }
      user{
        Mobile
        DeviceType
        Verified
        Active   
        createdAt
      }
      location{
        lat
        long
      }
     address {
        lat
        long
        presentAddress

      }
  
    idProof{
      status
      _id
      type
      url
      reason 
    }
    helprequest{
      distance
      helperId
      requesterId
      requestType
      status
      distance
      createdAt
      helperLocation{
        lat
        long
      }
      requesterLocation{
        lat
        long
      }

    }
    
      userId
      emergencyContact{
    phone
    fullName
    relation
    address
    
    }   
    }
  }
  `
}

export const getAllUserAddedByAdminQuery = (data) => {

  // const a =data.mobile.trim()

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
    allUsersForAdmin(
      page: { pageNumber: ${data && data.pageNumber ? data.pageNumber : 1}, perPage: 20 }
      filter: {
        address: { lat: ${lat} , long: ${long} }
        addedByAdmin: true
        mobile: ${mobile}
        gender: ${gender}
        bloodGroup: ${bloodGroup}
        Verified: ${Verified}
        status: ${status}
        workDivision: ${workDivisionId}
      }
      distance: ${distance}
    ) {
      metadata {
        total
      }
      data {
        _id
        Mobile
        Active
        Verified
        personalprofile {
          fullName
          email
          gender
          bloodGroup
          age
        }

        address {
          presentAddress
        }
        workDivision {
          name
        }
      }
      userQuery
    }
  }
  `
}


export const getUserByPhoneQuery = (mobile) => {

  return `
  query{
    userProfileByPhoneNumber(mobile:"${mobile}") {
      emergencyContactUserId
    }
  }
  `
}

export const userStatusChangeMutation = (data) => {
  return ` 
  mutation{
    updateUserStatus(userId:"${data.id}" status: ${data.status}){
      _id
    }
  }
  `
}
export const getRealTimeLiveLocationQuery = (id) => {
  return `
  query{
  userLiveLocationThreads(userId:"${id}"){
    userId
    lat
    long
    createdAt
  }
}`
}