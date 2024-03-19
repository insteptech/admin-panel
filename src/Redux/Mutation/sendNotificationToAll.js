/**
 * @description send query to action function
 * @param {*} data
 * @returns
 */
export const sendNotificationToAllMutation = (data) => {
  console.log("datadatadatadatadata", data)

  return `
   mutation{
    sendNotificationToAll(sendNotifyToAll:{
      allsendPushnotification:${data?.sendPushnotification ? data?.sendPushnotification : false}
      allresourses:${data?.resourses ? data?.resourses : false}
      allsendSMS:${data?.sendSMS ? data?.sendSMS : false}
      allsendWhatsapp:${data?.sendWhatsapp ? data?.sendWhatsapp : false}
      allmessage:"${data.addMessage ? data.addMessage : null}"
      allsms:"${data.values ? data.values : null}"
      alltemplateId:"${data.messageId ? data.messageId : null}"
    }){
      message
    }
    }
    `

  // const userQuery = data?.userQuery?.user[0].userQuery;

  // const number = data.allNumber ? data.allNumber : [];

  // let Mobile = "";
  // number.map((attachment) => {
  //   return Mobile += `"${attachment}",`;
  // });

  // const qq = `mutation {
  //     sendNotificationToAll(
  //       queryName:  ${JSON.stringify(userQuery)}
  //       templateId: "${data.messageId}"
  //       message: ""
  //     ){
  //       message
  //     }
  //   } `;

  // return qq;
};

export const getNotificationToAllListQuery = () => {
  return `
  query{
    allWhatsAppTemplates{
      _id
      name
      message
      isApproved
      __typename
    }
  }
    `;
};
