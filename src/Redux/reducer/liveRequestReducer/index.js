
import { liveRequestType,completLiveRequestType } from "../../AiiActionType/liveRequestType";
const initialState = {
   liveRequest:[],
   completLiveRequestsForAdmin:[]
}
const liveRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case liveRequestType.GET_ALL_LIVE_REQUEST_SECCESS:
            state = {
                ...state,
                liveRequest: action.payload,
              
            }
            break
            case completLiveRequestType.GET_COMPLET_ALL_LIVE_REQUEST_SECCESS:
            state = {
                ...state,
                completLiveRequestsForAdmin: action.payload,
              
            }
            break


    }
    return state

}
export default liveRequestReducer



