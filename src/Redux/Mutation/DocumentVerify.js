export const DocumentVerifyMutation = (data) => {
  const status = data.status ? data.status : ""
  return `
    mutation {
      updateDocument(
        request: { docId: "${data.id}", status:"${status}" reason: "${data.reason ? data.reason : null}" amberAlertDataId:"${data.amberAlertId}"}
      ) {
        _id
      }
    }
    `
} 