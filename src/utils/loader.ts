import { ActionFunction, Params, redirect } from "react-router-dom";
import { authenticatedCheck } from "./authenticatedCheck";
import { customAxios } from "../config/axiosConfig";
import { AxiosError } from "axios";
import { ICollection } from "../interfaces/app_interfaces";

export const requireAuth = async () => {
    const isAuthenticated = await authenticatedCheck();
    if (!isAuthenticated) {
        return redirect("/auth");
    }
    return null;
};
export const authFormAccess = async () => {
    const isAuthenticated = await authenticatedCheck();
    if (isAuthenticated) {
        return redirect("/dashboard");
    }
    return null;
};
export const navLoader = async () => {
    const isAuthenticated = await authenticatedCheck();
    if (isAuthenticated) {
        return redirect("/dashboard");
    }
    return null;
};


export const collectionLoader: ActionFunction = async ({ params }) => {
    const { collectionName } = params;
    if (collectionName) {
        try {
            const response = await customAxios.get(
                `api/collection/get/${collectionName}`
            );
            if (response.status === 200) {
                return response.data as ICollection;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return redirect("/dashboard");
            }
        }
    }
};

export const myCollectionsLoader = async () => {
    try {
        const response = await customAxios.get("/api/collection/myCollection/getAll");
        if (response.status === 200) {
            const data = response.data as ICollection[];
            return data;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};
