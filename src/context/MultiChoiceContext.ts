import { Dispatch, SetStateAction, createContext } from "react";
import { IQuiz } from "../interfaces/app_interfaces";

type defaultValue = {
    quizData: IQuiz;
    setQuizData: Dispatch<SetStateAction<IQuiz>>;
};

export const MultiChoiceContext = createContext({} as defaultValue);
