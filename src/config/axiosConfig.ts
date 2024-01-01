import axios, { AxiosRequestConfig } from "axios";
import { API } from "./API";
import { AxiosError } from "axios";
import { refreshToken } from "../utils/refreshToken";
export const customAxios = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${
            localStorage.getItem("accessToken") as string
        }`
    },
    timeout: 5000,
});
customAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken") as string;
    config.headers.Authorization = `Bearer ` + token;
    return config;
});
customAxios.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
        const originalReq = err.config as AxiosRequestConfig;
        if (err.response?.status === 403) {
            const isRefreshed = await refreshToken();
            if (isRefreshed) {
                const newToken = localStorage.getItem("accessToken") as string;
                if (originalReq.headers) {
                    originalReq.headers.Authorization = "Bearer " + newToken;
                }
                return customAxios(originalReq);
            }
        }
        return Promise.reject(err);
    }
);
