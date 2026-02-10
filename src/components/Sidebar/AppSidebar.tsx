"use client";

import { useRouter } from "next/navigation";

import { Sidebar } from "./Sidebar";
import { SidebarContent } from "./SidebarContent";

export const AppSidebar = () => {
  const router = useRouter();

  return (
    <Sidebar profile={{ name: "Mia", meta: "Free" }}>
      <SidebarContent onNavigate={(path) => router.push(path)} />
    </Sidebar>
  );
};
