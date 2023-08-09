import { createContext } from "react";
type defaultValue = {
    closeSidebar: () => void;
};

export const SidebarContext = createContext({} as defaultValue);
