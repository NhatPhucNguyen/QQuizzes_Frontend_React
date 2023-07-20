import { customAxios } from "../config/axiosConfig";

export const authenticatedCheck = async () => {
    const accessToken = localStorage.getItem("accessToken") as string;
    try {
        if (accessToken) {
            const response = await customAxios.get("/auth", {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            if (response.status === 200) {
                return true;
            }
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
    //return false;
};
