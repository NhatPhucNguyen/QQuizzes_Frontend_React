/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
type DefaultValue = {
    isShowSidebar: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
};
const CustomContext = createContext<DefaultValue | null>(null);

const SidebarContext = ({ children }: { children: React.ReactNode }) => {
    const [isShowSidebar, setIsShowSidebar] = useState(false);

    //open sidebar when click burger bars
    const openSidebar = () => {
        setIsShowSidebar(true);
    };
    //close side bar when tab items clicked or arrow button icon clicked
    const closeSidebar = () => {
        setIsShowSidebar(false);
    };
    return (
        <CustomContext.Provider
            value={{ openSidebar, closeSidebar, isShowSidebar }}
        >
            {children}
        </CustomContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(CustomContext);
    if (!context) {
        throw new Error(
            "useSidebarContext must be used within SidebarContextProvider"
        );
    }
    return context;
};

export default SidebarContext;
