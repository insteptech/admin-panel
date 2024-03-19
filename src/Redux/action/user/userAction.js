import {
    getAllUserQuery,
    exportDataQuery,
    getUserByIdQuery,
    getAllUserAddedByAdminQuery,
    userStatusChangeMutation,
    getUserByPhoneQuery,
    getRealTimeLiveLocationQuery,
    getEmergencyContactQuery
} from "../../Mutation/user";
import { UserType } from "../../AiiActionType/userType"
import axiosInstance from "../../config";

export const getAllUserAction = (data) => {

    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: getAllUserQuery(data) })
                .then((response) => {
                    // console.log(response, "getAllUsedfvgfbfgrQuery_data")
                    dispatch({
                        type: UserType.GET_ALL_USER_SUCCESS,
                        payload:
                            response.data.data.allUsersForAdmin,

                    })
                    return response?.data?.data?.allUsersForAdmin[0];
                }).catch((err) => {
                    console.log(err.response, "getAllUsedfvgfbfgrQuery_data")
                    dispatch({
                        type: UserType.GET_ALL_USER_FAILURE,
                        payload: err.data
                    })
                    return err;
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}
export const exportData = (data) => {

    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: exportDataQuery(data) })
                .then((response) => {
                    // console.log(response, "getAllUserQuery_data")
                    return response?.data?.data?.adminDataExporToExcel[0]?.data
                    return response;
                }).catch((err) => {
                    console.log(err.response, "getAllUserQuery_dataerrerrerrerr")
                    return err;
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}



export const getAllUserAddedByAdminAction = (data) => {


    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: getAllUserAddedByAdminQuery(data) })
                .then((response) => {

                    dispatch({
                        type: UserType.GET_ALL_USER_ADDED_BY_ADMIN_SUCCESS,
                        payload:
                            response.data.data.allUsersForAdmin,

                    })
                    return response;
                }).catch((err) => {
                    dispatch({
                        type: UserType.GET_ALL_USER_FAILURE,
                        payload: err.data
                    })
                    return err;
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}


export const getUserByIdAction = (id) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: getUserByIdQuery(id) })
                .then((response) => {
                    console.log(response, "responseresponse", id);
                    dispatch({
                        type: UserType.GET_USER_BY_ID_SUCCESS,
                        payload:
                            response.data.data.userProfileById
                    })
                    return response.data.data.userProfileById
                }).catch((err) => {
                    dispatch({
                        type: UserType.GET_USER_BY_ID_FAILURE,
                        payload: err.data
                    })
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}


export const userStatusChangeAction = (data) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: userStatusChangeMutation(data) })
                .then((response) => {
                    dispatch({
                        type: UserType.STATUS_CHANGE,
                        payload:
                            response.data.data.userProfileById
                    })
                    return response;
                }).catch((err) => {
                    // dispatch({
                    //     type: UserType.GET_USER_BY_ID_FAILURE,
                    //     payload:err.data
                    // })
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}


export const getUserByPhoneAction = (mobile) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: getUserByPhoneQuery(mobile) })
                .then((response) => {
                    return response.data.data.userProfileByPhoneNumber
                }).catch((err) => {
                    throw new Error(err)
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}
export const realTimeLiveLocationQuery = (id) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: getRealTimeLiveLocationQuery(id) }).then((response) => {
                return response.data.data;
            }).catch((err) => {
                console.log("errorerror", err.response)
                throw new Error(err)
            })
        }

    } catch (error) {
        console.log("errorerror", error)
    }
}