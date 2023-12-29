import { AxiosError } from "axios";
import { customAxios } from "../config/axiosConfig";
import { IQuiz } from "../interfaces/app_interfaces";
import { redirect } from "react-router-dom";

export class QuizAPI {
    public static async getPrivateQuizzes() {
        try {
            const response = await customAxios.get("/quizzes/admin");
            return response.data as IQuiz[];
        } catch (error) {
            redirect("/error");
            console.log(error);
            throw error;
        }
    }
    public static async getPublicQuizzes(queryParams?: string) {
        console.log("run me");
        try {
            const response = await customAxios.get(
                `/quizzes/public?${queryParams || ""}`
            );
            return response.data as IQuiz[];
        } catch (error) {
            redirect("/error");
            console.log(error);
            throw error;
        }
    }
    public static async getQuizById(quizId: string) {
        try {
            const response = await customAxios.get(`/quizzes/${quizId}`);
            return response.data as IQuiz;
        } catch (error) {
            redirect("/error");
            console.log(error);
            throw error;
        }
    }
    public static async createQuiz(data: IQuiz) {
        try {
            const response = await customAxios.post(
                "/quizzes",
                JSON.stringify(data)
            );
            return response.data as IQuiz;
        } catch (error) {
            redirect("/error");
            console.log(error);
            throw error;
        }
    }
    public static async updateQuiz(quizId: string, data: IQuiz) {
        try {
            const response = await customAxios.put(
                `/quizzes/${quizId}`,
                JSON.stringify(data)
            );
            return response.data as IQuiz;
        } catch (error) {
            redirect("/error");
            console.log(error);
            throw error;
        }
    }
    public static async deleteQuiz(quizId: string) {
        try {
            await customAxios.delete(`/quizzes/${quizId}`);
        } catch (error) {
            redirect("/error");
            console.log(error);
            throw error;
        }
    }
}
