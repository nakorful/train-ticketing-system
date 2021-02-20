import axios from "axios"
import {getToken} from "./localService";
const base_url = 'http://localhost:9090';

axios.defaults.baseURL = base_url

export const attemptLogin = (data) => {
   return axios.post("/api/v1/auth/signin", data)
}

export const register = (data) => {
   return axios({
      method:"POST",
      url :`/api/v1/user/register`,
      data:data
   })
};
