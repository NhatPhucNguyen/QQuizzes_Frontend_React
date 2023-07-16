import { customAxios } from "../config/axiosConfig";
export const refreshToken = async () => {
    try {
        const response = await customAxios.get("/auth/refreshToken");
        const { accessToken } = response.data as { accessToken: string };
        localStorage.setItem("accessToken", accessToken);
        //return true if access token is refreshed
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
