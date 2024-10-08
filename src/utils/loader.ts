import { AxiosError } from "axios";
import { ActionFunction, redirect } from "react-router-dom";
import { getQuizById } from "../apis/QuizAPI";
import { customAxios } from "../config/axiosConfig";
import { IPlayer, Question } from "../interfaces/app_interfaces";
import { authenticatedCheck } from "./authenticatedCheck";
import {
    getAllPrivateQuestionsByQuiz,
    getAllQuestionsByQuiz,
} from "../apis/QuestionAPI";

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
    if(!localStorage.getItem("accessToken")) return null;
    const isAuthenticated = await authenticatedCheck();
    if (isAuthenticated) {
        return redirect("/dashboard");
    }
    return null;
};

export const quizLoader: ActionFunction = async ({ params }) => {
    const { quizId } = params;
    if (quizId) {
        const quiz = await getQuizById(quizId);
        return quiz;
    }
    return null;
};
//load all the question belong to the quiz if user created this quiz
export const questionsLoader: ActionFunction = async ({ params }) => {
    const { quizId } = params;
    if (quizId) {
        const data = await getAllPrivateQuestionsByQuiz(quizId);
        return data;
    }
    return null;
};

export const quizPlayLoader: ActionFunction = async ({ params }) => {
    const { quizId } = params;
    let player: IPlayer | undefined;
    let questions: Question[] | undefined;

    if (quizId) {
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
            questions = await getAllQuestionsByQuiz(quizId);
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
