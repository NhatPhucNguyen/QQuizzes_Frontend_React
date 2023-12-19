import { ActionFunction, Params, redirect } from "react-router-dom";
import { authenticatedCheck } from "./authenticatedCheck";
import { customAxios } from "../config/axiosConfig";
import { AxiosError } from "axios";
import { IQuestion, IQuiz } from "../interfaces/app_interfaces";

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
    const { quizId } = params;
    if (quizId) {
        try {
            const response = await customAxios.get(`quizzes/${quizId}`);
            if (response.status === 200) {
                const data = response.data as IQuiz;
                return data;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return redirect("/dashboard");
            }
        }
    }
    return null;
};

export const myQuizzesLoader: ActionFunction = async ({ params }) => {
    const { role } = params as { role: string };
    if(role !== "public" && role !== "admin"){
        return redirect("/dashboard");
    }
    try {
        const response = await customAxios.get(`/quizzes/${role}`);
        if (response.status === 200) {
            const data = response.data as IQuiz[];
            return data;
        }
    } catch (error) {
        return redirect("/dashboard");
    }
    return null;
};
//load all the question belong to the quiz if user created this quiz
export const questionsLoader: ActionFunction = async ({ params }) => {
    const { quizId } = params;
    if (quizId) {
        try {
            const response = await customAxios.get(
                `/quizzes/${quizId}/questions`
            );
            if (response.status === 200) {
                const data = response.data as IQuestion[];
                return data;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return redirect("/dashboard");
            }
        }
    }
    return null;
};

export const quizPlayLoader: ActionFunction = async ({ params }) => {
    const { quizId } = params;
    if (quizId) {
        try {
            const response = await customAxios.get(`/quizzes/${quizId}/play`);
            if (response.status === 200) {
                const data = response.data as IQuestion[];
                if(data.length > 0){
                    return data;
                }
                else{
                    return redirect("/dashboard")
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return redirect("/dashboard");
            }
        }
    }
    return null;
};
