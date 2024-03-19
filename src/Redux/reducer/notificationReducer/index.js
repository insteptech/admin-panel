import { notificationType } from "../../AiiActionType/notificationType"



const initialState = {
    notificationList:[]
  
}
const notificationReducer= (state = initialState, action) => {
    switch (action.type) {
      case notificationType.NOTIFICTION_TYPE_SUCCESS:
        state = {
          ...state,
          notificationList: action.payload,
        };
        break;
      case notificationType.NOTIFICTION_TO_ALL_TYPE_SUCCESS:
        state = {
          ...state,
          notificationList: action.payload,
        };
        break;
    }
    return state

}
export default notificationReducer
