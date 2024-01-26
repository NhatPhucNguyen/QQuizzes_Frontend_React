import { Question } from "../../../interfaces/app_interfaces";

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
export const newQuestionTest:Question = {
    _id: "testId",
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
};
