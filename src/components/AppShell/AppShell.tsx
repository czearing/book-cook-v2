import type { ReactNode } from "react";

import { AppSidebar } from "../Sidebar";
import styles from "./AppShell.module.css";

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
