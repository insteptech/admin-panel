
export const getAlluserChatquery = (id) => {
  return `
   query{
    messagesByUserId(userId: "${id}"){
        _id
      userId
      message
      adminId
      createdAt
      updatedAt
    }
  }
   `
}

export const sendUserMaessagequery = (Message, userId, adminId) => {
  return `
    mutation {
      sendMessageToUser(
        contactUsType: {
          userId: "${userId}"
          adminId: "${adminId}"
          message: "${Message}"
        }
      ) {
        _id
      }
    }
    `
}
