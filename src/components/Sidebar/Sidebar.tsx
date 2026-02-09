"use client";

import {
  type CSSProperties,
  useEffect,
  useState,
} from "react";
import { SidebarSimpleIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import { Avatar } from "../Avatar";
import { BodyText } from "../Typography";
import { SidebarContext } from "./SidebarContext";
import { SidebarItem } from "./SidebarItem";
import styles from "./Sidebar.module.css";
import type { SidebarProps } from "./Sidebar.types";

const toCssSize = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQueryList.matches);

    handleChange();

    if ("addEventListener" in mediaQueryList) {
      mediaQueryList.addEventListener("change", handleChange);
      return () => mediaQueryList.removeEventListener("change", handleChange);
    }

    mediaQueryList.addListener(handleChange);
    return () => mediaQueryList.removeListener(handleChange);
  }, [query]);

  return matches;
};

export const Sidebar = ({
  className,
  children,
  defaultCollapsed = false,
  collapsed: collapsedProp,
  onCollapsedChange,
  collapseBreakpoint = 900,
  width = 280,
  collapsedWidth = 52,
  profile,
  showToggle = true,
  style,
  ...rest
}: SidebarProps) => {
  const isControlled = typeof collapsedProp === "boolean";
  const [collapsedState, setCollapsedState] = useState(defaultCollapsed);
  const [sectionOpenState, setSectionOpenState] = useState<
    Record<string, boolean>
  >({});
  const isCompact = useMediaQuery(`(max-width: ${collapseBreakpoint}px)`);

  useEffect(() => {
    if (!isControlled && isCompact) {
      setCollapsedState(true);
    }
  }, [isCompact, isControlled]);

  const collapsed = isControlled ? collapsedProp : collapsedState;
  const resolvedStyle = {
    ...style,
    "--sidebar-width": toCssSize(width),
    "--sidebar-collapsed-width": toCssSize(collapsedWidth),
  } as CSSProperties;

  const getSectionOpen = (id: string) => sectionOpenState[id];

  const setSectionOpen = (id: string, open: boolean) => {
    setSectionOpenState((prev) =>
      prev[id] === open ? prev : { ...prev, [id]: open }
    );
  };

  const contextValue = {
    collapsed,
    getSectionOpen,
    setSectionOpen,
  };

  const handleToggle = () => {
    const next = !collapsed;
    if (!isControlled) {
      setCollapsedState(next);
    }
    onCollapsedChange?.(next);
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        className={clsx(styles.sidebar, className)}
        data-sidebar-collapsed={collapsed ? "true" : "false"}
        style={resolvedStyle}
        {...rest}
      >
        {showToggle && (
          <div className={styles.header}>
            <SidebarItem
              icon={<SidebarSimpleIcon size={18} />}
              label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              iconOnly
              onClick={handleToggle}
              className={styles.toggleButton}
            />
          </div>
        )}
        <div className={styles.content}>{children}</div>
        {profile && (() => {
          const profileButton = (
            <SidebarItem
              icon={<Avatar name={profile.name} imageURL={profile.imageURL} size="sm" />}
              label={profile.name}
              labelStacked
              onClick={profile.onClick}
              className={clsx(styles.profileItem, styles.profileFooter)}
            >
              <BodyText as="span" className={styles.profileName}>
                {profile.name}
              </BodyText>
              {profile.meta && (
                <BodyText as="span" className={styles.profileMeta}>
                  {profile.meta}
                </BodyText>
              )}
            </SidebarItem>
          );

          return profileButton;
        })()}
      </div>
    </SidebarContext.Provider>
  );
};
