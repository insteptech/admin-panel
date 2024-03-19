import { amberAlertType } from "../../AiiActionType/amberAlertType";
import axiosInstance from "../../config";
import { getAmberAlertDetailQuery, getAmberAlertDataByAlertIdQuery, getResponsesToAmberByUsers } from "../../Mutation/amberAlert";

export const amberAlertTypeAction = (data) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: getAmberAlertDetailQuery(data) })
                .then((response) => {
                    dispatch({
                        type: amberAlertType.GET_ALL_AMBER_ALERT_REQUSERT_SECCESS,
                        payload: response.data.data.amberAlertsAdmin
                    })
                    return response.data.data.amberAlertsAdmin[0]
                }).catch((err) => {
                    console.log(err.response, "amberAlertTypeActionerrrrrrrrrrrrr");
                })

        }
    }

    catch (error) {
        console.log(error);
    }

}
export const amberAlertDataByAlertIdAction = (id) => {
    try {
        return async (dispatch) => {
            axiosInstance.post('', { query: getAmberAlertDataByAlertIdQuery(id) })
                .then((response) => {
                    dispatch({
                        type: amberAlertType.GET_AMBER_ALERT_DATA_BY_ALERT_ID,
                        payload: response.data.data.getAmberAlertDataByAlertId
                    })

                }).catch((err) => {
                    console.log(err.response, "getAmberAlertDataByAlertIdQuery:::::::");
                })

        }
    }

    catch (error) {
        console.log(error);
    }

}

export const responsesToAmberByUsers = (data) => {
    try {
        return async (dispatch) => {
            axiosInstance.post('', { query: getResponsesToAmberByUsers(data) })
                .then((response) => {
                    dispatch({
                        type: amberAlertType.RESPONSE_TO_AMBER_BY_USERS,
                        payload: response.data.data,
                    })
                }).catch((error) => {
                    console.log("errrrrr____", error.response)
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}