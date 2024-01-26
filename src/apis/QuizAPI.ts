import { customAxios } from "../config/axiosConfig";
import { Quiz } from "../interfaces/app_interfaces";

export const getPrivateQuizzes = async () => {
    try {
        const response = await customAxios.get("/quizzes/admin");
        return response.data as Quiz[];
    } catch (error) {
        handleError(error);
    }
};
export const getPublicQuizzes = async (queryParams?: string) => {
    try {
        const response = await customAxios.get(
            `/quizzes/public?${queryParams || ""}`
        );
        return response.data as Quiz[];
    } catch (error) {
        handleError(error);
    }
};
export const getQuizById = async (quizId: string) => {
    try {
        const response = await customAxios.get(`/quizzes/${quizId}`);
        return response.data as Quiz;
    } catch (error) {
        handleError(error);
    }
};
export const createQuiz = async (data: Quiz) => {
    try {
        const response = await customAxios.post(
            "/quizzes",
            JSON.stringify(data)
        );
        return response.data as Quiz;
    } catch (error) {
        handleError(error);
    }
};
export const updateQuiz = async (quizId: string, data: Quiz) => {
    try {
        const response = await customAxios.put(
            `/quizzes/${quizId}`,
            JSON.stringify(data)
        );
        return response.data as Quiz;
    } catch (error) {
        handleError(error);
    }
};
export const deleteQuiz = async (quizId: string) => {
    try {
        await customAxios.delete(`/quizzes/${quizId}`);
    } catch (error) {
        handleError(error);
    }
};
const handleError = (error: unknown) => {
    console.log(error);
    throw error;
};
