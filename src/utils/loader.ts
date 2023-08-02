import { ActionFunction, Params, redirect } from "react-router-dom";
import { authenticatedCheck } from "./authenticatedCheck";
import { customAxios } from "../config/axiosConfig";
import { AxiosError } from "axios";
import { IQuiz } from "../interfaces/app_interfaces";

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

export const quizLoader: ActionFunction = async ({ params }) => {
    const { quizName } = params;
    if (quizName) {
        try {
            const response = await customAxios.get(
                `api/quiz/get/${quizName}`
            );
            if (response.status === 200) {
                return response.data as IQuiz;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return redirect("/dashboard");
            }
        }
    }
    return null;
};

export const myQuizzesLoader = async () => {
    try {
        const response = await customAxios.get(
            "/api/quiz/myquizzes/getAll"
        );
        if (response.status === 200) {
            const data = response.data as IQuiz[];
            return data;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};
