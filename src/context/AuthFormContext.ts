import { Dispatch, SetStateAction, createContext } from "react";

type defaultValue = {
    isSwitch: boolean;
    setIsSwitch: Dispatch<SetStateAction<boolean>>;
};

export const AuthFormContext = createContext({} as defaultValue);
