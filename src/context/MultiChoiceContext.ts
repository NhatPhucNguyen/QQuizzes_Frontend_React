import { Dispatch, SetStateAction, createContext } from "react";
import { IQuiz } from "../interfaces/app_interfaces";

type defaultValue = {
    quizArr:IQuiz[];
};

export const MultiChoiceContext = createContext({} as defaultValue);
