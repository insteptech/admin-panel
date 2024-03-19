import axiosInstance from "../../config";
import { pushNotifLogQuery } from "../../Mutation/pushNotification";

export const pushNotifQuery = (userId) => {
    try {
        return async () => {
            return axiosInstance.post('', { query: pushNotifLogQuery(userId) })
                .then((res) => {
                    console.log("ressssssss", res)
                    return res.data.data.notificationLogs
                })
                .catch((err) => {
                    console.log("errerrerrerr", err.response)
                })
        }
    } catch (error) {
        console.log(error)

    }

}