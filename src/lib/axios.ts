import { default as base } from "axios";

const axios = base.create({
  baseURL: "https://oakah0om54.execute-api.ap-southeast-1.amazonaws.com/",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

axios.interceptors.request.use(
  (config: any) => {
    if (
      !config.headers["Authorization"] &&
      localStorage.account != undefined &&
      localStorage.account[0] == "{"
    ) {
      config.headers["Authorization"] = `Bearer ${
        JSON.parse(localStorage.account).access
      }`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const prevRequest = error.config;
    if (error?.response?.status === 401 && !prevRequest.sent) {
      // prevRequest.sent = true
      // const newAccessToken = await refresh()
      // prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
      // return axiosPrivate(prevRequest)
    }
    return Promise.reject(error);
  }
);

export { axios };
