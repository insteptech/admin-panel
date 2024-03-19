import { amberAlertType } from "../../AiiActionType/amberAlertType";
const initialState = {
  amberAlertTypeData: [],
  allUserTypeData: [],
  responseToAmberByUsers: [],
};
const amberAlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case amberAlertType.GET_ALL_AMBER_ALERT_REQUSERT_SECCESS:
      state = { ...state, amberAlertTypeData: action.payload };
      break;
    case amberAlertType.GET_AMBER_ALERT_DATA_BY_ALERT_ID:
      state = { ...state, allUserTypeData: action.payload };
      break;
    case amberAlertType.RESPONSE_TO_AMBER_BY_USERS:
      state = { ...state, responseToAmberByUsers: action.payload }
  }
  return state;
};
export default amberAlertReducer;

// const uploadFile = (e) => {
//     e.preventDefault();
//     // loading = true;

//     let operations = {
//         query: `
//       mutation($file: Upload!) {
//         uploadFile(file: $file)
//       }
//     `,
//     };
//     const data = new FormData();
//     // data.append('operations', JSON.stringify(operations));
//     // // data.append('map', JSON.stringify(_map));
//     data.append('file', file);
//     axiosInstance.post('',)
//         .then((res) => {
//             alert("seccess");
//         }).catch((err) => {
//             alert(err);
//         })
// };
