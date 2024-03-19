import { otherServiceTypes } from "../../AiiActionType/otherServiceType"


const initialState = {
    otherSingleServiceTypeData: []

}
const otherDetailServiceType = (state = initialState, action) => {
    switch (action.type) {
        case otherServiceTypes.GET_ALL_OTHER_SERVICE_REQUEST_DETAIL:
            state = {
                ...state,
                otherSingleServiceTypeData: action.payload,
            }
            break

    }
    return state

}
export default otherDetailServiceType
