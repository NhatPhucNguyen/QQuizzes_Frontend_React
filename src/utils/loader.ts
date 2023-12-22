import { ActionFunction, Params, redirect } from "react-router-dom";
import { authenticatedCheck } from "./authenticatedCheck";
import { customAxios } from "../config/axiosConfig";
import { AxiosError } from "axios";
import {
    IPlayer,
    IQuestion,
    IQuiz,
    IResult,
} from "../interfaces/app_interfaces";
import Cookies from "js-cookie";

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
    if (role !== "public" && role !== "admin") {
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
    let player: IPlayer | undefined;
    let questions: IQuestion[] | undefined;

    if (quizId) {
        const getAllQuestions = async () => {
            const response = await customAxios.get(
                `/quizzes/${quizId}/questions`
            );
            if (response.status === 200) {
                const data = response.data as IQuestion[];
                return data;
            }
        };
        const getPlayerResult = async () => {
            const response = await customAxios.get(
                `/quizzes/${quizId}/play/result`
            );
            if (response.status === 200) {
                const data = response.data as IPlayer;
                return data;
            }
        };
        try {
            questions = await getAllQuestions();
            player = await getPlayerResult();
            return { questions, player };
        } catch (error) {
            if (error instanceof AxiosError) {
                return redirect("/dashboard");
            }
        }
    }
    return null;
};
