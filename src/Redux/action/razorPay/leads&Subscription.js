import axiosInstance from "../../config";
import { leadsDetailQuery, subscriptionDetailQuery } from "../../Mutation/leads&Subscription";

export const leadsDetail = () => {
    try {
        return async () => {
            return axiosInstance.post('', { query: leadsDetailQuery() }).then((response) => {
                return response.data.data.getLeadsData;
            }).catch((error) => {
                console.log('errorerrorerror', error)
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export const subscriptionDetail = () => {
    try {
        return async () => {
            return axiosInstance.post('', { query: subscriptionDetailQuery() }).then((response) => {
                console.log("responseresponse", response)
                return response.data.data.getSubscriptionData;
            }).catch((error) => {
                console.log('errorerrorerror', error.response)
            })
        }
    } catch (error) {
        console.log(error)
    }
}