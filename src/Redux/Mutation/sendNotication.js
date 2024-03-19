/**
 * @description send query to action function
 * @param {*} data
 * @returns
 */
export const sendNotificationMutation = (data, file) => {
  console.log(file, "sendNotificationActionFun_sendNotificationMutation", data)


  const mutation = withFile(data, file)

  return mutation;
};



const withFile = (data, file) => {
  console.log(data, "sendNotificationActionFun_withFile", file);
  if (!file) {
    file = new File(["foo"], "foo.jpg");
  }

  let relatedData = ""
  if (data && data.url && data.url.length > 0) {
    data.url.forEach(element => {
      relatedData += `${JSON.stringify(element)},`
    })
  }

  const number = data.allNumber ? data.allNumber : [];

  let Mobile = "";
  number.map((attachment) => { return Mobile += `"${attachment}",` });
  let operations = {
    query: `mutation($file:Upload){
      sendNotification(
        sendNotifType: {
          templateId:"${data.messageId ? data.messageId : null}"
          noArray:[${Mobile}]
          message:"${data.addMessage}"
          amberAlertImageUrl:[${relatedData}]
          amberalertdataId:"${data?.amberalertdataId ? data?.amberalertdataId : null}"
          sendPushnotification:${data?.sendPushnotification ? data?.sendPushnotification : false}
          resourses:${data?.resourses ? data?.resourses : false}
          sms:"${data?.values?.title ? data.values.title : ""}"
          sendSMS:${data?.sendSMS ? data.sendSMS : false}
          sendWhatsapp:${data?.sendWhatsapp ? data.sendWhatsapp : false}
          sendAmber:${data?.sendAmber ? data.sendAmber : false}
          amberAlertName:"${data?.amberAlertName ? data.amberAlertName : ""}"
        },files: $file
      ) {
        message
      }
    }
    `,
    variables: {
      file: null
    }
  };
  var map = { 0: ["variables.file"] };
  var fd = new FormData();
  fd.append("operations", JSON.stringify(operations));
  fd.append("map", JSON.stringify(map));
  fd.append("0", file);
  console.log(fd, "fdfdfd")
  return fd;
}




export const getNotificationlistQuery = () => {
  return `
    query{
      allWhatsAppTemplates{
        _id
        name
        message
        isApproved
        group
      }
    }
    `;
};


// const withOutFile = (data) => {
//   let relatedData = ""
//   if (data && data.url && data.url.length > 0) {
//     data.url.forEach(element => {
//       relatedData += `${JSON.stringify(element)},`
//     })
//   }

//   const number = data.allNumber ? data.allNumber : [];

//   let Mobile = "";
//   number.map((attachment) => { return Mobile += `"${attachment}",` });

//   const mutation = `
//   mutation {
//       sendNotification(
//         sendNotifType: {
//           templateId:"${data.messageId ? data.messageId : null}"
//           noArray:[${Mobile}]
//           message:"${data.addMessage}"
//           amberAlertImageUrl:[${relatedData}]
//           amberalertdataId:"${data?.amberalertdataId ? data?.amberalertdataId : null}"
//           sendPushnotification:${data?.sendPushnotification ? data?.sendPushnotification : false}
//           resourses:${data?.resourses ? data?.resourses : false}
//           sms:"${data?.values?.title ? data.values.title : ""}"
//           sendSMS:${data?.sendSMS ? data.sendSMS : false}
//           sendWhatsapp:${data?.sendWhatsapp ? data.sendWhatsapp : false}
//           sendAmber:${data?.sendAmber ? data.sendAmber : false}
//           coupon:${data?.coupon ? data.coupon : false}
//         }
//       ) {
//         message
//       }
//     }
//     `
//   return mutation
// }

// export const nursingDiagnosisMutation = (data, file) => {

//   let relatedData = ""
//   if (data && data.url && data.url.length > 0) {
//     data.url.forEach(element => {
//       relatedData += `${JSON.stringify(element)},`
//     })
//   }

//   const number = data.allNumber ? data.allNumber : [];

//   let Mobile = "";
//   number.map((attachment) => { return Mobile += `"${attachment}",` });

//   let operations = {
//     query: `mutation Mutation($files: Upload, $inputData: sendNotifType) {
//       sendNotification(files: $files, inputData: $inputData) {
//         message
//     }
//   }`,
//     variables: {
//       inputData: {
//         templateId: data.messageId ? data.messageId : null,
//         noArray: [Mobile],
//         message: data.addMessage,
//         pic: [relatedData],
//         amberalertdataId: data?.amberalertdataId ? data?.amberalertdataId : null,
//         sendPushnotification: data.sendPushnotification,
//         resourses: data.resourses,
//         sms: data?.values?.title ? data.values.title : "",
//         sendSMS: data?.sendSMS ? data.sendSMS : false,
//         sendWhatsapp: data?.sendWhatsapp ? data.sendWhatsapp : false
//       },
//       files: null,
//     },
//   };
//   console.log(operations, 'operationsoperations')
//   var map = { 0: ["variables.files"] };
//   var fd = new FormData();
//   fd.append("operations", JSON.stringify(operations));
//   fd.append("map", JSON.stringify(map));
//   fd.append("0", file);

//   console.log(fd, 'fdfd')
//   return fd;
// };