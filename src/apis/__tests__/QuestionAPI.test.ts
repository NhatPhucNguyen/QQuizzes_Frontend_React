import { beforeEach, describe, expect, test } from "vitest";
import mocks from "./__mocks__/axiosMocks";
import { questionsTest } from "./__mocks__/data";
import {
    addNewQuestion,
    deleteQuestion,
    getAllPrivateQuestionsByQuiz,
    getAllQuestionsByQuiz,
    updateQuestion,
} from "../QuestionAPI";

beforeEach(() => {
    mocks.post.mockReset();
    mocks.get.mockReset();
    mocks.put.mockReset();
    mocks.delete.mockReset();
});
afterEach(() => {
    vi.resetModules();
});
describe("Questions API testing", () => {
    const quizId = "testId";
    const newQuestionTest = questionsTest[0];
    describe("Get all question test", () => {
        const testData = questionsTest;
        test("Get all public questions", async () => {
            mocks.get.mockResolvedValue({ data: testData });
            const data = await getAllQuestionsByQuiz(quizId);
            expect(mocks.get).toHaveBeenCalledTimes(1);
            expect(data).toStrictEqual(testData);
            expect(mocks.get).toBeCalledWith(`/quizzes/${quizId}/questions`);
        });
        test("Get all private questions", async () => {
            mocks.get.mockResolvedValue({ data: testData });
            const data = await getAllPrivateQuestionsByQuiz(quizId);
            expect(mocks.get).toHaveBeenCalledTimes(1);
            expect(data).toStrictEqual(testData);
            expect(mocks.get).toBeCalledWith(
                `/quizzes/${quizId}/questions/private`
            );
        });
    });
    test("Add new question test", async () => {
        mocks.post.mockResolvedValue({ data: newQuestionTest });
        const data = await addNewQuestion(quizId, newQuestionTest);
        expect(mocks.post).toHaveBeenCalledTimes(1);
        expect(data).toStrictEqual(newQuestionTest);
        expect(mocks.post).toBeCalledWith(
            `/quizzes/${quizId}/questions`,
            JSON.stringify(newQuestionTest)
        );
    });
    test("Update question test", async () => {
        const updateQuestionTest = { ...newQuestionTest };
        mocks.put.mockResolvedValue({ data: updateQuestionTest });
        const data = await updateQuestion(quizId, "testId", updateQuestionTest);
        expect(mocks.put).toHaveBeenCalledTimes(1);
        expect(data).toStrictEqual(updateQuestionTest);
        expect(mocks.put).toBeCalledWith(
            `/quizzes/${quizId}/questions/testId`,
            JSON.stringify(updateQuestionTest)
        );
    });
    test("Delete question test", async () => {
        const deletedQuestion = { ...newQuestionTest };
        mocks.delete.mockResolvedValue({ data: deletedQuestion });
        const data = await deleteQuestion(
            quizId,
            deletedQuestion._id as string
        );
        expect(mocks.delete).toHaveBeenCalledTimes(1);
        expect(data).toStrictEqual(deletedQuestion);
        expect(mocks.delete).toBeCalledWith(
            `/quizzes/${quizId}/questions/${deletedQuestion._id as string}`
        );
    });
    test("Error handling", async () => {
        const error = new Error("error");
        mocks.get.mockRejectedValue(error);
        mocks.post.mockRejectedValue(error);
        mocks.put.mockRejectedValue(error);
        mocks.delete.mockRejectedValue(error);
        await expect(getAllQuestionsByQuiz("testid")).rejects.toThrow();
        await expect(getAllPrivateQuestionsByQuiz("testid")).rejects.toThrow();
        await expect(addNewQuestion(quizId, newQuestionTest)).rejects.toThrow();
        await expect(
            updateQuestion(quizId, "testId", newQuestionTest)
        ).rejects.toThrow();
        await expect(deleteQuestion(quizId, "testId")).rejects.toThrow();
    });
});
