import { AxiosError } from "axios";
import { customAxios } from "../config/axiosConfig";
export const refreshToken = async () => {
    try {
        const response = await customAxios.get("/auth/refreshToken");
        const { accessToken } = response.data as { accessToken: string };
        localStorage.setItem("accessToken", accessToken);
        //return true if access token is refreshed
        return true;
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 422) {
                localStorage.clear();
            }
        }
        return false;
    }
};
