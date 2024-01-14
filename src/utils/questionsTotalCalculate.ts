import { Question } from "../interfaces/app_interfaces";

export const questionsTotalCalculate = (questions: Question[]) => {
    const totalPoints = questions.reduce(
        (x, question) => x + question.point,
        0
    );
    const totalTime = questions.reduce(
        (x, question) => x + question.timeLimit,
        0
    );
    const timeConverted =
        totalTime > 60
            ? `${Math.floor(totalTime / 60)}m${totalTime % 60}s`
            : `${totalTime}s`;
    return { totalPoints, timeConverted };
};
