
export const pushNotifLogQuery = (userId) => {
  console.log("ressssssssressssssss", userId)
  return `
    query{
  notificationLogs(userId:"${userId}"){
    _id
    userId
    PushNotification
    WhatsappNotification
    SmsNotification
    PushNotificationMessage
    WhatsappMessage
    SmsNotificationMessage
    MobileNumber
    createdAt
  }
}
    `
}