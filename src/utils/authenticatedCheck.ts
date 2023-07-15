import axios from "axios";
import { API } from "../config/API";
export const authenticatedCheck = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        if (accessToken) {
            const response = await axios.get(API + "/auth", {
                withCredentials: true,
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
    } catch (error) {
        return false;
    }
    return false;
};
