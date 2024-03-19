import axiosInstance from "../../config";
import { subscriptionDetailQuery } from "../../Mutation/subscriptionDetailsQuery";
import axios from 'axios'
import base64 from 'base-64';



const username = 'rzp_test_LspF8ynMHHX14D'; //test razorPay
const password = 'Nx7dFUR82RFJGLGPHnHeRIjW'; //test razorPay
const authHeader = 'Basic ' + base64.encode(`${username}:${password}`);
const AXIOS_INSTANCE = axios.create();
AXIOS_INSTANCE.interceptors.request.use(
    async (config) => {
        let request = config;
        console.log(config, "jfnvjknfv", request)
        request.baseURL = "https://api.razorpay.com/v1/";
        request.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTEzNTZhZDhmMmY1ZDRlYjM5YTRmMDMiLCJpYXQiOjE2Mjk0NTUxMDYsImV4cCI6MTY2MDk5MTEwNn0.qrEP6voLu-18E41bD9Cy4JM6fDukwxepr4v1IoEJa0s",
            // 'Access-Control-Allow-Origin': 'http://localhost',
            // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': authHeader,
            // 'Content-Type': 'application/x-www-form-urlencoded, charset=UTF-8;application/json'
        };
        request.url = config.url;
        return request;
    },
    (error) => console.log('res-error', error),
);

export const subscriptionDetail = (id) => {
    try {
        return async (dispatch) => {
            return axiosInstance.post('', { query: subscriptionDetailQuery(id) }).then((res) => {
                console.log("resresresres", res)
                return res.data.data;
            }).catch((err) => {
                console.log("errerrerr", err)
            })
        }

    } catch (error) {
        console.log("errorrrr", error)
    }
}
export const getDateQuery = (id) => {
    try {
        return async (dispatch) => {
            return AXIOS_INSTANCE.get(`subscriptions/${id}`).then((res) => {
                console.log("resresresres", res)
                // return res.data.data;
            }).catch((err) => {
                console.log("errerrerrssss", id)
            })
        }

    } catch (error) {
        console.log("errorrrr", error)
    }
}
