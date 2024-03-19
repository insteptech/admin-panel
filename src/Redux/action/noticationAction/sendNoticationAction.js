import axiosInstance from "../../config";
import { getNotificationlistQuery, sendNotificationMutation } from "../../Mutation/sendNotication";
import { notificationType } from "../../AiiActionType/notificationType"


// var Notification = sendNotificationMutation()
/**
 * @description notification api call function
 * @param {*} data 
 * @returns 
 */
export const sendNotificationAction = (data, file) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', sendNotificationMutation(data, file))
                .then((response) => {
                    // dispatch({
                    //     type: UserType.STATUS_CHANGE,
                    //     payload:
                    //     response.data.data.userProfileById
                    // })
                    return response;
                }).catch((err) => {
                    console.log(err.response, 'sendNotificationAction_error');
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


export const getNotificationlistAction = () => {
    try {
        return async (dispatch) => {
            axiosInstance.post('', { query: getNotificationlistQuery() })
                .then((response) => {
                    dispatch({
                        type: notificationType.NOTIFICTION_TYPE_SUCCESS,
                        payload: response.data.data.allWhatsAppTemplates
                    })
                })
        }

    } catch (error) {

    }
}