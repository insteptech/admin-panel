import { completLiveRequestType, liveRequestType } from "../../AiiActionType/liveRequestType";
import axiosInstance from "../../config";
import { getLiveRequestQuery, getLiveRequestCompletQuery, updateHelpRequestCancelMutation } from "../../Mutation/liveRequest";

export const getAllLiveRequestAction = (data) => {
    try {
        return async (dispatch) => {
            return axiosInstance
                .post("", { query: getLiveRequestQuery(data) })
                .then((response) => {
                    dispatch({
                        type: liveRequestType.GET_ALL_LIVE_REQUEST_SECCESS,
                        payload: response.data.data.liveRequestsForAdmin,
                    });
                    return response;
                })
                .catch((err) => {
                    console.log(err.response, "qqqqqddddddddddddddqqqqqqqqqqqqq");
                    return err;
                });

        }
    }

    catch (error) {
        console.log(error);
    }

}



export const completeRequestAction = (data) => {
    try {
        return async (dispatch) => {
            axiosInstance.post('', { query: getLiveRequestCompletQuery(data) })
                .then((response) => {
                    dispatch({
                        type: completLiveRequestType.GET_COMPLET_ALL_LIVE_REQUEST_SECCESS,
                        payload:
                            response.data.data.completLiveRequestsForAdmin
                    })

                }).catch((err) => {
                    console.log(err, "qqqqqddddddddddddddqqqqqqqqqqqqq");
                })

        }
    }

    catch (error) {
        console.log(error);
    }

}

export const updateHelpRequestCancel = (data) => {
    return async (dispatch) => {
        return axiosInstance.post('', { query: updateHelpRequestCancelMutation(data) })
            .then((response) => {
                return response;
            }).catch((error) => {
                console.log(error.response, 'error in updateHelpRequestCancel');
            })
    }
}