"use client";

import { GearSixIcon, SignOutIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

import { useAuthSession } from "@/clientToServer/hooks/useAuthSession";
import { useAuthSignOut } from "@/clientToServer/hooks/useAuthSignOut";
import { getAuthUserProfile } from "@/clientToServer/utils/authUserProfile";
import { Sidebar } from "./Sidebar";
import styles from "./Sidebar.module.css";
import { SidebarContent } from "./SidebarContent";
import { SidebarItem } from "./SidebarItem";
import { Avatar } from "../Avatar";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "../Menu";

export const AppSidebar = () => {
  const router = useRouter();
  const { user } = useAuthSession();
  const authProfile = getAuthUserProfile(user);
  const { mutateAsync: signOut, isPending: isSigningOut } = useAuthSignOut();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarContent onNavigate={(path) => router.push(path)} />
      <div className={styles.profileFooter}>
        {authProfile && (
          <Menu>
            <MenuTrigger asChild>
              <SidebarItem
                icon={
                  <Avatar
                    name={authProfile.name}
                    imageURL={authProfile.avatarUrl}
                    size="sm"
                  />
                }
                label={authProfile.name}
                labelStacked
                className={styles.profileItem}
              >
                <span className={styles.profileName}>{authProfile.name}</span>
                {authProfile.email && (
                  <span className={styles.profileMeta}>
                    {authProfile.email}
                  </span>
                )}
              </SidebarItem>
            </MenuTrigger>
            <MenuContent side="top" align="end">
              <div className={styles.menuHeader}>
                <Avatar
                  name={authProfile.name}
                  imageURL={authProfile.avatarUrl}
                  size="md"
                />
                <div className={styles.menuHeaderText}>
                  <span className={styles.menuHeaderName}>
                    {authProfile.name}
                  </span>
                  {authProfile.email && (
                    <span className={styles.menuHeaderMeta}>
                      {authProfile.email}
                    </span>
                  )}
                </div>
              </div>
              <MenuSeparator />
              <MenuItem startIcon={<GearSixIcon size={16} />}>
                Settings
              </MenuItem>
              <MenuItem
                startIcon={<SignOutIcon size={16} />}
                onSelect={handleSignOut}
                disabled={isSigningOut}
              >
                Sign out
              </MenuItem>
            </MenuContent>
          </Menu>
        )}
      </div>
    </Sidebar>
  );
};
