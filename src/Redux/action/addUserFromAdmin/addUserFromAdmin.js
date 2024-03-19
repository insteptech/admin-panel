import { addUserFromAdminType } from "../../AiiActionType/addUserFromAdminType";
import axiosInstance from "../../config";
import { addUsersFromAdminMutation } from "../../Mutation/addUserFromAdmin";


export const addUserFromAdminAction = (data) => {
    try {
        return async (dispatch) => {
            axiosInstance.post('', { query: addUsersFromAdminMutation(data) })
                .then((response) => {
                    dispatch({
                        type: addUserFromAdminType.Add_USER_SUCCESS,
                        payload:
                            response.data.data.adminLogin
                    })

                }).catch((err) => {

                })

        }
    }

    catch (error) {
        console.log(error);
    }

}