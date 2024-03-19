import axiosInstance from "../../config";
// import { chatType } from "../../AiiActionType/commitType"
import { getAlluserChatquery, sendUserMaessagequery } from "../../Mutation/getUserChart";
export const getAllUserchatAction = (id) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: getAlluserChatquery(id) })
                .then((response) => {
                    return response.data.data.messagesByUserId;
                }).catch((err) => {
                    console.log("errrrrrr", err)
                    return err
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}
export const sendMessageToUserAction = (Message, userId, adminId) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: sendUserMaessagequery(Message, userId, adminId) })
                .then((response) => {
                    return response.data.data.messagesByUserId;
                }).catch((err) => {
                    return err
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}