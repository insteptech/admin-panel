import axiosInstance from "../../config";
import {
  sendNotificationToAllMutation,
  getNotificationToAllListQuery,
} from "../../Mutation/sendNotificationToAll";
import { notificationType } from "../../AiiActionType/notificationType";
/**
 * @description notification api call function
 * @param {*} data
 * @returns
 */
export const sendNotificationToAllAction = (data) => {
  try {
    return async (dispatch) => {
      const headers = {
        "Content-Type": "application/json",
      };
      return axiosInstance
        .post("", { query: sendNotificationToAllMutation(data) }, headers)
        .then((response) => {

          return response;
        })
        .catch((err) => {
          console.log(err.response, "ErrsendNotificationToAllAction");
        });
    };
  } catch (error) {
    console.log(error);
  }
};
export const getNotificationToAllListAction = () => {
  try {
    return async (dispatch) => {
      axiosInstance
        .post("", { query: getNotificationToAllListQuery() })
        .then((response) => {
          dispatch({
            type: notificationType.NOTIFICTION_TO_ALL_TYPE_SUCCESS,
            payload: response.data.data.allWhatsAppTemplates,
          });
        });
    };
  } catch (error) { }
};
