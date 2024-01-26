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
export const getAllPrivateQuestionsByQuiz = async (quizId: string) => {
    try {
        const response = await customAxios.get(
            `/quizzes/${quizId}/questions/private`
        );
        return response.data as Question[];
    } catch (error) {
        handleError(error);
    }
};
export const addNewQuestion = async (quizId: string, newQuestion: Question) => {
    try {
        const response = await customAxios.post(
            `/quizzes/${quizId}/questions`,
            JSON.stringify(newQuestion)
        );
        return response.data as Question;
    } catch (error) {
        handleError(error);
    }
};
export const updateQuestion = async (
    quizId: string,
    questionId: string,
    questionToUpdate: Question
) => {
    try {
        const response = await customAxios.put(
            `/quizzes/${quizId}/questions/${questionId}`,
            JSON.stringify(questionToUpdate)
        );
        return response.data as Question;
    } catch (error) {
        handleError(error);
    }
};
export const deleteQuestion = async (quizId: string, questionId: string) => {
    try {
        const response = await customAxios.delete(
            `/quizzes/${quizId}/questions/${questionId}`
        );
        return response.data as Question;
    } catch (error) {
        handleError(error);
    }
};
export const handleError = (error: unknown) => {
    console.log(error);
    throw error;
};
