import { createContext, useContext } from "react";

export type SidebarContextValue = {
  collapsed: boolean;
};

export const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
});

export const useSidebarContext = () => useContext(SidebarContext);
