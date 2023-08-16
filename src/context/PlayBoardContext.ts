import { IQuestion, ISelection } from "../interfaces/app_interfaces";
import { createContext } from "react";

type defaultValue = {
    question: IQuestion;
    nextQuestion: (increasePoint?: boolean) => void;
    isShowAns: boolean;
};

export const PlayBoardContext = createContext({} as defaultValue);
