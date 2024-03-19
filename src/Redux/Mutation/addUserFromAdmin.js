export const addUsersFromAdminMutation = (data) => {
  return `
    mutation {
      addUsersFromAdmin(
        args: {
          name: "${data.name}"
          email: "${data.email}"
          mobile: "${data.mobile}"
          address: "${data.address}"
          wordDivision:"${data.wordDivision}"
        }
      ) {
        _id
      }
    }`
};
