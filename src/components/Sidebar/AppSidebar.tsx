import { Sidebar } from "./Sidebar";
import { SidebarContent } from "./SidebarContent";

export const AppSidebar = () => {
  return (
    <Sidebar profile={{ name: "Mia", meta: "Free" }}>
      <SidebarContent />
    </Sidebar>
  );
};
