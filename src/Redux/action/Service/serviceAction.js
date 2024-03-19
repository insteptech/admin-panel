import { ServiceType } from "../../AiiActionType/serviceType"
import axiosInstance from "../../config"
import { ServiceQuery, getAllServiceDataQuery, helpRequesrByIdQuery, deleteMutation, resourseMutation, resourseQuery, removeResourse } from "../../Mutation/Service"
/**
 * @author prabhakar sarkar
 * @param {*} id 
 * @returns 
 */
export const serviceAction = () => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: ServiceQuery() })
                .then((response) => {
                    dispatch({
                        type: ServiceType.GET_ALL_SERVICE_SUCCESS,
                        payload:
                            response.data.data.services
                    })
                    return response;
                }).catch((err) => {
                    dispatch({
                        type: ServiceType.GET_ALL_SERVICE_FAILURE,
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


export const deleteXlsxDataById = (id) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: deleteMutation(id) })
                .then((response) => {

                    //   dispatch({
                    //         type: ServiceType.GET_ALL_SERVICE_SUCCESS,
                    //         payload:
                    //             response.data.data.services
                    //     })
                    return response;
                }).catch((err) => {
                    // dispatch({
                    //     type: ServiceType.GET_ALL_SERVICE_FAILURE,
                    //     payload: err.data
                    // })
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}

/**
 * @author prabhakar sarkar
 * @param {*} id 
 * @returns 
 */
export const getAllServiceDataAction = (data) => {
    try {
        return async (dispatch) => {
            axiosInstance.post('', { query: getAllServiceDataQuery(data) })
                .then((response) => {
                    dispatch({
                        type: ServiceType.GET_ALL_SERVICE_DATA_BY_SERVICE_ID_SUCCESS,
                        payload: response.data.data.getXlsxDataList
                    })
                }).catch((err) => {
                    console.log('Err::::::', err.response)
                    dispatch({
                        type: ServiceType.GET_BY_ID_ALL_SERVICE_FAILURE,
                        payload: err.data
                    })
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const helpRequesrByIdAction = (id) => {
    console.log(id);
    try {
        return async (dispatch) => {
            axiosInstance.post('', { query: helpRequesrByIdQuery(id) })
                .then((response) => {
                    dispatch({
                        type: ServiceType.GET_ONE_HELP_REQUEST_DATA_SECCESS,
                        payload:
                            response.data.data.helpRequesrById
                    })
                }).catch((err) => {
                    dispatch({
                        type: ServiceType.GET_BY_ID_ALL_SERVICE_FAILURE,
                        payload: err.data
                    })
                })
        }
    }
    catch (error) {
        console.log(error);
    }

}
export const resourseMut = (data) => {
    try {
        return async (dispatch) => {
            await axiosInstance.post('', { query: resourseMutation(data) })
                .then((response) => {
                    return response.data.data;
                }).catch((err) => {
                    console.log("error", err.response)
                    return err
                })
        }
    }
    catch (error) {
        console.log(error);
    }

}
export const resourseQuer = (data) => {
    try {
        return async (dispatch) => {
            await axiosInstance.post('', { query: resourseQuery() })
                .then((response) => {
                    dispatch({
                        type: ServiceType.ADD_RESOURSES,
                        payload: response.data.data
                    })
                    // return response
                }).catch((err) => {
                    console.log("error", err.response)
                    return err
                })
        }
    }
    catch (error) {
        console.log(error);
    }

}

export const removeRes = (resourseId) => {
    try {
        return async (dispatch) => {
            await axiosInstance.post('', { query: removeResourse(resourseId) })
                .then((response) => {
                    console.log("responseresponseresponseresponse", response)
                    dispatch({
                        type: ServiceType.REMOVE_RESOURSE,
                        payload: response
                    })
                })
                .catch((error) => {
                    console.log("errorerrorerrorerror", error.response)
                    return error;
                })
        }
    }
    catch (err) {
        console.log(err);
    }
}