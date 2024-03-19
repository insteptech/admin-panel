// import { liveRequestType } from "../../AiiActionType/liveRequestType";
import { otherServiceTypes } from "../../AiiActionType/otherServiceType";
import axiosInstance from "../../config";
// import { getLiveRequestQuery } from "../../Mutation/liveRequest";
import { getOtherServiceQuery } from "../../Mutation/otherService";
import { otherServiceDetail } from "../../Mutation/otherServiceDetail";


export const getAllOtherServiceTypeAction = (data) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: getOtherServiceQuery(data) })
                .then((response) => {

                    dispatch({
                        type: otherServiceTypes.GET_ALL_OTHER_SERVICE_REQUEST_SECCESS,
                        payload: response?.data.data.servicesForAdmin
                    })
                    return response
                }).catch((err) => {
                    console.log(err, "qqqqqddddddddddddddqqqqqqqqqqqqq");
                })

        }
    }

    catch (error) {
        console.log(error);
    }

}

export const getOneOtherServiceTypeAction = (id) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: otherServiceDetail(id) })
                .then((response) => {
                    dispatch({
                        type: otherServiceTypes.GET_ALL_OTHER_SERVICE_REQUEST_DETAIL,
                        payload: response.data.data.serviceReqDetail[0]
                    })
                    return response.data.data.serviceReqDetail[0]
                }).catch((err) => {
                    console.log(err.response, "qqqqgghghghqqqqqqqqq");
                })

        }
    }

    catch (error) {
        console.log(error);
    }

}
