/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
type SidebarValue = {
    isShowSidebar: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
};
const SidebarContext = createContext<SidebarValue | null>(null);

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
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
        <SidebarContext.Provider
            value={{ openSidebar, closeSidebar, isShowSidebar }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error(
            "useSidebarContext must be used within SidebarProvider"
        );
    }
    return context;
};

export default SidebarProvider;
