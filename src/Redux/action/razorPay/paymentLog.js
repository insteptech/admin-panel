import axiosInstance from "../../config";
import { paymentLogsQuery, addCouponMutation, getAllCouponQuery, deleteCouponMutation } from '../../Mutation/paymentLog'

export const paymentLogs = (userId) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: paymentLogsQuery(userId) }).then((response) => {
                console.log('rererererererererer', response)
                return response.data.data
            }).catch((err) => {
                console.log('errerrerrerrerrerr', err.response)
            })
        }

    } catch (error) {
        console.log(error)
    }
}
export const addCoupon = (data) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: addCouponMutation(data) }).then((response) => {
                return response;
            }).catch((error) => {
                console.log('errorrr', error.response)
            })
        }

    } catch (error) {

    }
}
export const getAllCoupon = () => {
    try {
        return async () => {
            return axiosInstance.post('', { query: getAllCouponQuery() }).then((response) => {
                // console.log("getAllCoupongetAllCoupon", response)
                return response.data.data
            })
        }

    } catch (error) {
        console.log("getAllCoupongetAllCoupon", error)
    }
}
export const deleteCoupon = (couponId) => {
    try {
        return async () => {
            return axiosInstance.post('', { query: deleteCouponMutation(couponId) }).then((response) => {
                return response.data.data
            }).catch((error) => {
                console.log("deleteCoupondeleteCoupon", error.response)
            })
        }

    } catch (error) {
        console.log("deleteCoupondeleteCoupon", error)
    }
}