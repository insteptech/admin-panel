import { UserType } from "../../AiiActionType/userType";
import axiosInstance from "../../config";
import { DocumentVerifyMutation } from "../../Mutation/DocumentVerify";

export const DocumentVerifyAction = (data) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: DocumentVerifyMutation(data) })
                .then((response) => {
                    dispatch({
                        type: UserType.GET_USER_BY_ID_SUCCESS,
                        payload:
                            response.data.data.userProfileById
                    })
                    return response;
                }).catch((err) => {
                    console.log(err, "qqqqqddddddddddddddqqqqqqqqqqqqq");
                })

        }
    }

    catch (error) {
        console.log(error);
    }

}

