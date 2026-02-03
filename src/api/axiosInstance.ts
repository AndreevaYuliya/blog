import axios from "axios";

import routes from "../routes/routes";

const axiosInstance = axios.create({
  baseURL: "",
  headers: {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      window.location.replace(routes.login);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
