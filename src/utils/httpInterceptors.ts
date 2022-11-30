import axios from "axios";
import { getToken } from "../auth/handleJWT";

export default function configureInterceptor() {
  axios.interceptors.request.use(
    function (config) {
      const token = getToken();
      if (token) {
        axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
        console.log(config);
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}
