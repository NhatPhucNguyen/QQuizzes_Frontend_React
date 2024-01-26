import { Question, Quiz } from "../../../interfaces/app_interfaces";

export const questionsTest: Question[] = [
    {
        _id: "string",
        questionNumber: 1,
        question: "questionTest",
        selections: [
            {
                _id: "test1",
                desc: "string",
                isTrue: true,
            },
        ],
        point: 1,
        timeLimit: 1,
    },
    {
        _id: "string2",
        questionNumber: 1,
        question: "questionTest",
        selections: [
            {
                _id: "test1",
                desc: "string",
                isTrue: true,
            },
        ],
        point: 1,
        timeLimit: 1,
    },
];
export const quizzesTest: Quiz[] = [
    {
        _id: "testId",
        numberOfPlays: 1,
        quizName: "test",
        topic: "test",
        level: "test",
        quantity: 1,
        timeLimit: 1,
        totalPoints: 1,
        updatedAt: new Date(),
    },
    {
        _id: "testId2",
        numberOfPlays: 1,
        quizName: "test",
        topic: "test",
        level: "test",
        quantity: 1,
        timeLimit: 1,
        totalPoints: 1,
        updatedAt: new Date(),
    },
];
