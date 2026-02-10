"use client";

import { useRouter } from "next/navigation";

import { GearSixIcon, SignOutIcon } from "@phosphor-icons/react";

import { Sidebar } from "./Sidebar";
import { SidebarContent } from "./SidebarContent";
import styles from "./Sidebar.module.css";
import { SidebarItem } from "./SidebarItem";
import { Avatar } from "../Avatar";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "../Menu";

export const AppSidebar = () => {
  const router = useRouter();
  const userName = "Caleb Zearing";
  const userHandle = "@czearing";

  return (
    <Sidebar>
      <SidebarContent onNavigate={(path) => router.push(path)} />
      <div className={styles.profileFooter}>
        <Menu>
          <MenuTrigger asChild>
            <SidebarItem
              icon={<Avatar name={userName} size="sm" />}
              label={userName}
              labelStacked
              className={styles.profileItem}
            >
              <span className={styles.profileName}>{userName}</span>
              <span className={styles.profileMeta}>{userHandle}</span>
            </SidebarItem>
          </MenuTrigger>
          <MenuContent side="top" align="end">
            <div className={styles.menuHeader}>
              <Avatar name={userName} size="md" />
              <div className={styles.menuHeaderText}>
                <span className={styles.menuHeaderName}>{userName}</span>
                <span className={styles.menuHeaderMeta}>{userHandle}</span>
              </div>
            </div>
            <MenuSeparator />
            <MenuItem startIcon={<GearSixIcon size={16} />}>Settings</MenuItem>
            <MenuItem startIcon={<SignOutIcon size={16} />}>
              Sign out
            </MenuItem>
          </MenuContent>
        </Menu>
      </div>
    </Sidebar>
  );
};
