import { Dispatch, SetStateAction, createContext } from "react";
import { IQuestion, IQuiz } from "../interfaces/app_interfaces";

type defaultValue = {
    questionArr:IQuestion[];
};

export const MultiChoiceContext = createContext({} as defaultValue);
