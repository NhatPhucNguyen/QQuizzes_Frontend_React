import { redirect } from "react-router-dom";
import { customAxios } from "../config/axiosConfig";
import { Question } from "../interfaces/app_interfaces";

export const getAllQuestionsByQuiz = async (quizId: string) => {
    try {
        const response = await customAxios.get(`/quizzes/${quizId}/questions`);
        return response.data as Question[];
    } catch (error) {
        handleError(error);
    }
};
export const addNewQuestion = () => {
    return null;
};
const handleError = (error: unknown) => {
    redirect("/error");
    console.log(error);
    throw error;
};
