import { describe, test } from "vitest";
import {
    createQuiz,
    deleteQuiz,
    getPrivateQuizzes,
    getPublicQuizzes,
    getQuizById,
    updateQuiz,
} from "../QuizAPI";
import mocks from "./__mocks__/axiosMocks";
import { quizzesTest } from "./__mocks__/data";
beforeEach(() => {
    mocks.post.mockReset();
    mocks.get.mockReset();
    mocks.put.mockReset();
    mocks.delete.mockReset();
});
describe("Quiz API service test", () => {
    test("Get all private quizzes", async () => {
        const response = { data: quizzesTest };
        mocks.get.mockResolvedValue(response);
        const data = await getPrivateQuizzes();
        expect(mocks.get).toHaveBeenCalledTimes(1);
        expect(data).toStrictEqual(quizzesTest);
        expect(mocks.get).toHaveBeenCalledWith("/quizzes/admin");
    });
    test("Get all public quizzes", async () => {
        const response = { data: quizzesTest };
        mocks.get.mockResolvedValue(response);
        const data = await getPublicQuizzes();
        expect(data).toStrictEqual(quizzesTest);
        expect(mocks.get).toHaveBeenCalledWith("/quizzes/public?");
        await getPublicQuizzes("testQuery=test");
        expect(mocks.get).toHaveBeenCalledWith(
            "/quizzes/public?testQuery=test"
        );
        expect(mocks.get).toHaveBeenCalledTimes(2);
    });
    test("Get quiz by id", async () => {
        const response = {
            data: quizzesTest.filter((item) => item._id === "testId")[0],
        };
        mocks.get.mockResolvedValue(response);
        const data = await getQuizById("testId");
        expect(data).toStrictEqual(response.data);
        expect(mocks.get).toHaveBeenCalledWith("/quizzes/testId");
        expect(mocks.get).toHaveBeenCalledTimes(1);
    });
    test("Create a quiz", async () => {
        const newQuiz = quizzesTest[0];
        const response = {
            data: newQuiz,
        };
        mocks.post.mockResolvedValue(response);
        const data = await createQuiz(newQuiz);
        expect(data).toStrictEqual(newQuiz);
        expect(mocks.post).toHaveBeenCalledWith(
            "/quizzes",
            JSON.stringify(newQuiz)
        );
        expect(mocks.post).toHaveBeenCalledTimes(1);
    });
    test("Update a quiz", async () => {
        const updateQuizTest = quizzesTest[0];
        const response = {
            data: updateQuizTest,
        };
        mocks.put.mockResolvedValue(response);
        const data = await updateQuiz(updateQuizTest._id, updateQuizTest);
        expect(data).toStrictEqual(updateQuizTest);
        expect(mocks.put).toHaveBeenCalledWith(
            `/quizzes/${updateQuizTest._id}`,
            JSON.stringify(updateQuizTest)
        );
        expect(mocks.put).toHaveBeenCalledTimes(1);
    });
    test("Delete a quiz", async () => {
        const deleteQuizTest = quizzesTest[0];
        const response = {
            data: deleteQuizTest,
        };
        mocks.delete.mockResolvedValue(response);
        await deleteQuiz(deleteQuizTest._id);
        expect(mocks.delete).toHaveBeenCalledWith(
            `/quizzes/${deleteQuizTest._id}`
        );
        expect(mocks.delete).toHaveBeenCalledTimes(1);
    });
    test("Error handling", async () => {
        const error = new Error("Error");
        mocks.get.mockRejectedValue(error);
        mocks.post.mockRejectedValue(error);
        mocks.put.mockRejectedValue(error);
        mocks.delete.mockRejectedValue(error);
        await expect(getPrivateQuizzes()).rejects.toThrow();
        await expect(getPublicQuizzes()).rejects.toThrow();
        await expect(getQuizById("test")).rejects.toThrow();
        await expect(createQuiz(quizzesTest[0])).rejects.toThrow();
        await expect(updateQuiz("test",quizzesTest[0])).rejects.toThrow();
        await expect(deleteQuiz("test")).rejects.toThrow();
    });
});
