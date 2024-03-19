import axios from 'axios'
// const token = window.localStorage.getItem("token")
// const axiosInstance = axios.create({
//   baseURL: "https://dev.api.helpyfinder.com/graphql", // DEV api
//   // baseURL: "http://localhost:5000/graphql",
//   // baseURL: "https://api.helpyfinder.com/graphql", // Live api
//   headers: {
//     // Authorization: token ? `Bearer ${token}` : "",
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });




const axiosInstance = axios.create();



axiosInstance.interceptors.request.use(
  async (config) => {
    let request = config;
    request.baseURL = "http://dev.api.helpyfinder.com/graphql"; // DEV api
    // request.baseURL = "http://localhost:8000/graphql";
    // request.baseURL = "http://192.168.1.7:8000/graphql";
    // request.baseURL = "http://api.helpyfinder.com/graphql"; // Live api/
    // request.baseURL = "https://dev.helpyfinder.com/graphql"; // Dev api/
    // request.baseURL = "http://192.168.1.69:8000/graphql";




    let token = localStorage.getItem("token")
    request.headers = {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      crossorigin: true
    };
    // request.url = configureUrl(config.url);
    return request;
  },
  (error) => error,
);

export default axiosInstance;

