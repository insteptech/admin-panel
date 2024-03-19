import { loginType } from "../../AiiActionType/authType"
const initialState = {
    userId: "",
    token:null,
    authenticate: false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginType.LOGIN_SUCCESS:
            state = {   
                ...state,
                userId: action.payload,
            }
            break
        case loginType.LOGIN_FAILURE:
            state = {
                ...state,
                ...action.payload
            }
            break
            case loginType.CONFIRM_OTP_SUCCESS:
                state={
                    ...state,
                    token:action.payload,
                    authenticate: true,
                }
                
    }
    return state

}
export default authReducer



