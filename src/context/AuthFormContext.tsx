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

type AuthFormValue = {
    isSwitch: boolean;
    setIsSwitch: Dispatch<SetStateAction<boolean>>;
};

const AuthFormContext = createContext<AuthFormValue | null>(null);
const AuthFormProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSwitch, setIsSwitch] = useState(false);
    const location: { state?: { isSwitch?: boolean } } = useLocation();
    useEffect(() => {
        if (location.state?.isSwitch) {
            setIsSwitch(true);
        }
    }, [location.state?.isSwitch]);
    return (
        <AuthFormContext.Provider value={{ isSwitch, setIsSwitch }}>
            {children}
        </AuthFormContext.Provider>
    );
};

export const useAuthFormContext = () => {
    const context = useContext(AuthFormContext);
    if (!context) {
        throw new Error(
            "useAuthFormContext must be used within AuthFormProvider"
        );
    }
    return context;
};
export default AuthFormProvider;
