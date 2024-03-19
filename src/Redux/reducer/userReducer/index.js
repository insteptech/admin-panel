
import { UserType } from "../../AiiActionType/userType"

const initialState = {
    user: [],
    userById: [],
    count: 0,
    UsersAddedByAdmin: [],
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserType.GET_ALL_USER_SUCCESS:
            state = {
                ...state,
                user: action.payload
            }
            break

        case UserType.GET_USER_BY_ID_SUCCESS:
            state = {
                ...state,
                userById: action.payload,


            }
            break
        case UserType.GET_ALL_USER_ADDED_BY_ADMIN_SUCCESS:
            state = {
                ...state,
                UsersAddedByAdmin: action.payload
            }
    }
    return state
}

export default userReducer;