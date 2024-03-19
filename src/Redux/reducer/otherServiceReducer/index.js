import { otherServiceTypes } from "../../AiiActionType/otherServiceType"


const initialState = {
    otherServiceTypeData: []

}
const otherServiceType = (state = initialState, action) => {
    switch (action.type) {
        case otherServiceTypes.GET_ALL_OTHER_SERVICE_REQUEST_SECCESS:
            state = {
                ...state,
                otherServiceTypeData: action.payload,
            }
            break

    }
    return state

}
export default otherServiceType
