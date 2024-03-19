import { ServiceType } from "../../AiiActionType/serviceType"

const initialState = {
    services: [],
    AllServiceDataByServiceId: [],
    oneHelpRequestData: [],
    addResourses: [],
    deleteResourse: []

}


const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ServiceType.GET_ALL_SERVICE_SUCCESS:
            state = {
                ...state,
                services: action.payload
            }
            break

        case ServiceType.GET_ALL_SERVICE_DATA_BY_SERVICE_ID_SUCCESS:
            state = {
                ...state,
                AllServiceDataByServiceId: action.payload
            }
            break

        case ServiceType.GET_ONE_HELP_REQUEST_DATA_SECCESS:
            state = {
                ...state,
                oneHelpRequestData: action.payload
            }
        case ServiceType.ADD_RESOURSES:
            state = {
                ...state,
                addResourses: action.payload
            }
        case ServiceType.REMOVE_RESOURSE:
            state = {
                ...state,
                deleteResourse: action.payload
            }

    }
    return state
}

export default serviceReducer;