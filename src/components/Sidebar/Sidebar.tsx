import { type CSSProperties, type KeyboardEvent, useEffect, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import { Avatar } from "../Avatar";
import { BodyText, MetaLabel } from "../Typography";
import { SidebarContext } from "./SidebarContext";
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
  collapsedWidth = 72,
  profile,
  showToggle = true,
  style,
  ...rest
}: SidebarProps) => {
  const isControlled = typeof collapsedProp === "boolean";
  const [collapsedState, setCollapsedState] = useState(defaultCollapsed);
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

  const handleToggle = () => {
    const next = !collapsed;
    if (!isControlled) {
      setCollapsedState(next);
    }
    onCollapsedChange?.(next);
  };

  const profileOnClick = profile?.onClick;
  const handleProfileKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!profileOnClick) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      profileOnClick();
    }
  };

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <div
        className={clsx(styles.sidebar, className)}
        data-sidebar-collapsed={collapsed ? "true" : "false"}
        style={resolvedStyle}
        {...rest}
      >
        {(showToggle || profile) && (
          <div className={styles.header}>
            {profile && (
              <div
                className={clsx(
                  styles.profile,
                  profile.onClick && styles.profileInteractive
                )}
                {...(profile.onClick
                  ? {
                      role: "button",
                      tabIndex: 0,
                      onClick: profileOnClick,
                      onKeyDown: handleProfileKeyDown,
                      "aria-label": profile.ariaLabel ?? profile.name,
                    }
                  : {})}
              >
                <Avatar
                  name={profile.name}
                  imageURL={profile.imageURL}
                  size="sm"
                />
                <div
                  className={styles.profileText}
                  data-sidebar-collapsible="true"
                >
                  <BodyText as="span" className={styles.profileName}>
                    {profile.name}
                  </BodyText>
                  {profile.meta && (
                    <MetaLabel as="span" className={styles.profileMeta}>
                      {profile.meta}
                    </MetaLabel>
                  )}
                </div>
              </div>
            )}
            {showToggle && (
              <button
                type="button"
                onClick={handleToggle}
                className={styles.toggleButton}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? (
                  <CaretRightIcon size={16} />
                ) : (
                  <CaretLeftIcon size={16} />
                )}
              </button>
            )}
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </SidebarContext.Provider>
  );
};
