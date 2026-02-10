"use client";

import {
  type CSSProperties,
  useEffect,
  useState,
} from "react";
import { SidebarSimpleIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import type { SidebarProps } from "./Sidebar.types";
import { SidebarContext } from "./SidebarContext";
import { SidebarItem } from "./SidebarItem";
import { Avatar } from "../Avatar";
import { BodyText } from "../Typography";

const toCssSize = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

const useMediaQuery = (query: string) => {
  const getMatches = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(query);
    const setMatchesIfNeeded = (next: boolean) => {
      setMatches((prev) => (prev === next ? prev : next));
    };
    const handleChange = () => setMatchesIfNeeded(mediaQueryList.matches);

    setMatchesIfNeeded(mediaQueryList.matches);

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
  const [isHydrated, setIsHydrated] = useState(false);
  const isControlled = typeof collapsedProp === "boolean";
  const isCompact = useMediaQuery(`(max-width: ${collapseBreakpoint}px)`);
  const [collapsedState, setCollapsedState] = useState(() => defaultCollapsed);
  const [sectionOpenState, setSectionOpenState] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isControlled) {
      setCollapsedState((prev) => (prev === isCompact ? prev : isCompact));
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

  const profileFooter = profile ? (
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
  ) : null;

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        className={clsx(styles.sidebar, className)}
        data-sidebar-collapsed={collapsed ? "true" : "false"}
        data-sidebar-hydrated={isHydrated ? "true" : "false"}
        data-sidebar="true"
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
        {profileFooter}
      </div>
    </SidebarContext.Provider>
  );
};
