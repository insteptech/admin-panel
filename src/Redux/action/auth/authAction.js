import { loginType } from "../../AiiActionType/authType"
import axios from "../../config"
import { ConfirmOtpMutation, SendOtpMutation } from "../../Mutation/auth"

export const loginAction = (Mobile) => {
    try {
        return async (dispatch) => {
            return axios.post('', { query: SendOtpMutation(Mobile) })
                .then((response) => {
                    dispatch({
                        type: loginType.LOGIN_SUCCESS,
                        payload: response.data.data.adminLogin
                    })
                    return response;
                }).catch((err) => {
                    console.log(err, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                    return err

                })
        }
    }

    catch (error) {
        console.log(error);
    }

}

export const ConfirmOtpAction = (ConfirmOtp) => {
    try {
        return async (dispatch) => {
            return axios.post('', { query: ConfirmOtpMutation(ConfirmOtp) })
                .then((response) => {
                    const token = response.data.data.confirmOtp
                    localStorage.setItem("token", token)
                    dispatch({
                        type: loginType.CONFIRM_OTP_SUCCESS,
                        payload: token
                    })
                    return response;
                }).catch((err) => {
                    console.log(err);
                    return err;
                })
        }
    }
    catch (error) {
        console.log(error, "hello,,,,,,,,,,");
    }

}


export const signOut = () => {
    const dispatch = async (dispatch) => {
        window.localStorage.clear()
        dispatch({
            type: loginType.LOGOUT_SECCESS,
        })
    }

    return dispatch
}