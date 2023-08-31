/* eslint-disable react-refresh/only-export-components */
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
} from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

type DefaultValue = {
    isSwitch: boolean;
    setIsSwitch: Dispatch<SetStateAction<boolean>>;
};

const CustomContext = createContext<DefaultValue | null>(null);
const AuthFormContext = ({ children }: { children: React.ReactNode }) => {
    const [isSwitch, setIsSwitch] = useState(false);
    const location: { state?: { isSwitch?: boolean } } = useLocation();
    useEffect(() => {
        if (location.state?.isSwitch) {
            setIsSwitch(true);
        }
    }, [location.state?.isSwitch]);
    return (
        <CustomContext.Provider value={{ isSwitch, setIsSwitch }}>
            {children}
        </CustomContext.Provider>
    );
};

export const useAuthFormContext = () => {
    const context = useContext(CustomContext);
    if (!context) {
        throw new Error(
            "useAuthFormContext must be used within AuthFormContext"
        );
    }
    return context;
};
export default AuthFormContext;
