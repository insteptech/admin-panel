import { liveRequestType } from "../../AiiActionType/liveRequestType";
import axiosInstance from "../../config";
import { getLiveRequestQuery } from "../../Mutation/liveRequest";

export const getAllOtherServiceAction = () => {
    try {
        return async (dispatch) => {
            axiosInstance.post('', { query: getLiveRequestQuery() })
                .then((response) => {
                    dispatch({
                        type: liveRequestType.GET_ALL_LIVE_REQUEST_SECCESS,
                        payload: response.data.data.liveRequestsAdmin
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
