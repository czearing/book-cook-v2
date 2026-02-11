import type { ReactNode } from "react";

import styles from "./AppShell.module.css";
import { AppSidebar } from "../Sidebar";

export type AppShellProps = {
  children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className={styles.shell}>
      <AppSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
