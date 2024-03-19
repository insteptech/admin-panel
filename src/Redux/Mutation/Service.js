export const ServiceQuery = () => {
  return `
    query{
        services{
          name
          _id
        }
      }
   `
};

export const getAllServiceDataQuery = (data) => {
  const mobile = data.mobile ? JSON.stringify(data.mobile) : null;
  const Verified = data && data.verified === "true" ? true : data.verified === "false" ? false : null;
  const status = data && data.status === "true" ? true : data.status === "false" ? false : null;
  const type = data.type ? JSON.stringify(data.type) : null;
  const state = data.state ? JSON.stringify(data.state) : null;
  const city = data.city ? JSON.stringify(data.city) : null;
  const lat = data.address ? JSON.stringify(data.address.lat) : null;
  const long = data.address ? JSON.stringify(data.address.long) : null;
  const distance = data.radius ? data.radius : null;



  return `
  query {
      getXlsxDataList(
        page: { pageNumber: ${data.pageNumber}, perPage: 20 }
        filter: {
          mobile: ${mobile}
          Verified: ${Verified}
          status: ${status}
          type: ${type}
          state: ${state}
          city: ${city}
          address: {lat: ${lat} long: ${long} }
        }
        distance: ${distance}
        workDivisionId: "${data.workDivisionId}"
      ) {
        metadata {
          total
        }
        data {
          _id
          name
          phone
          alternatePhone
          email
          contactPerson
          address
          verified
          type
          country
          state
          city
          zipCode
          status
          contactPersonLocation
          action
          workDivision
        }
      }
    }
    `
};

export const helpRequesrByIdQuery = () => {
  return `
  query{
    helpRequesrById(id: "6086e6d503f0330e34f5d020"){
      _id
      requesterId
      status
      createdAt
      updatedAt
      requestType
      serviceData{
        _id
        serviceForOrBy
        comment
        trackingId
      }
      documents{
        name
        reason
        status
        type 
        url
      }
      user{
        Active
        DeviceId
        deviceToken
        DeviceType 
        Mobile
        Role
        Verified
      }
      personalprofile{
        age
        avtar
        bloodGroup
        createdAt
        email
        fullName
        gender
      }
      address{
        presentAddress
        lat
        long
        createdAt
        previousAddress{
          lat
          long
          createdAt
          address
        }
      }
      workprofile{
        workDIvision
        workingArea
        workingHours
        workingDays
      }
      commentTrail{
        _id
        adminId
        createdAt
        message
        updatedAt
        userId
      }
    }
  }
  `
}

export const deleteMutation = (id) => {
  return `
  mutation{
    xslsDataDeleteById(id: "${id}"){
      message
    }
  }
  `
}

export const resourseMutation = (data) => {
  return `
 mutation{
  addResources(resourcesInputType:{
    Title:"${data.title}"
    Description:"${data.description}"
    youtubeUrl:"${data.link}"
  })
}`
}


export const resourseQuery = () => {
  return `
  query {
    getResources {
      _id
      Title
      Description
      youtubeUrl
    }
  }
 `
}

export const removeResourse = (resourseId) => {
  return `
  mutation{
    deleteResourse(resourseId:"${resourseId}")
  }
  `
}



//  export const getDoctorDataQuery= () =>{
//     return `
//     query{
//       getDoctorList{
//         _id
//         sNo
//         email
//         ngoPhoneNumber
//         ngoName
//         ngoType
//         ngoState
//         city
//         ngoCountry
//         ngoZipCode
//         ngoContactPerson
//         ngoContactPersonLocation
//         action
//         ngoAddress

//      }
//     }
//    `
//   }


