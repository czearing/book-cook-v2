import {
  type CSSProperties,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import type { SidebarItemProps, SidebarProps } from "./Sidebar.types";

type SidebarContextValue = {
  collapsed: boolean;
};

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
});

const useSidebarContext = () => useContext(SidebarContext);

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
  minWidth = 200,
  maxWidth = 360,
  resizable = true,
  onWidthChange,
  collapsedWidth = 72,
  showToggle = true,
  style,
  ...rest
}: SidebarProps) => {
  const isControlled = typeof collapsedProp === "boolean";
  const isResizable = resizable && typeof width === "number";
  const [collapsedState, setCollapsedState] = useState(defaultCollapsed);
  const isCompact = useMediaQuery(`(max-width: ${collapseBreakpoint}px)`);
  const [resizableWidth, setResizableWidth] = useState(
    typeof width === "number" ? width : 280
  );
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isControlled && isCompact) {
      setCollapsedState(true);
    }
  }, [isCompact, isControlled]);

  useEffect(() => {
    if (typeof width === "number") {
      setResizableWidth(width);
    }
  }, [width]);

  const collapsed = isControlled ? collapsedProp : collapsedState;
  const resolvedWidth = isResizable ? resizableWidth : width;
  const resolvedStyle = useMemo(
    () =>
      ({
        ...style,
        "--sidebar-width": toCssSize(resolvedWidth),
        "--sidebar-collapsed-width": toCssSize(collapsedWidth),
      }) as CSSProperties,
    [collapsedWidth, resolvedWidth, style]
  );

  const handleToggle = () => {
    const next = !collapsed;
    if (!isControlled) {
      setCollapsedState(next);
    }
    onCollapsedChange?.(next);
  };

  const handleResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizable || collapsed) {
      return;
    }
    event.preventDefault();
    const handle = event.currentTarget;
    handle.setPointerCapture(event.pointerId);
    const startX = event.clientX;
    const startWidth = resizableWidth;
    setIsResizing(true);

    const handleMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const nextWidth = Math.min(
        Math.max(startWidth + delta, minWidth),
        maxWidth
      );
      setResizableWidth(nextWidth);
      onWidthChange?.(nextWidth);
    };

    const cleanup = () => {
      handle.removeEventListener("pointermove", handleMove);
      handle.removeEventListener("pointerup", handleUp);
      handle.removeEventListener("pointercancel", handleUp);
      handle.removeEventListener("lostpointercapture", handleUp);
    };

    const handleUp = () => {
      setIsResizing(false);
      if (handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }
      cleanup();
    };

    handle.addEventListener("pointermove", handleMove);
    handle.addEventListener("pointerup", handleUp);
    handle.addEventListener("pointercancel", handleUp);
    handle.addEventListener("lostpointercapture", handleUp);
  };

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <div
        className={clsx(styles.sidebar, className)}
        data-collapsed={collapsed ? "true" : "false"}
        data-resizing={isResizing ? "true" : "false"}
        style={resolvedStyle}
        {...rest}
      >
        {showToggle && (
          <div className={styles.header}>
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
          </div>
        )}
        <div className={styles.content}>{children}</div>
        {isResizable && !collapsed && (
          <div
            className={styles.resizeHandle}
            onPointerDown={handleResizeStart}
            role="separator"
            aria-orientation="vertical"
            aria-valuemin={minWidth}
            aria-valuemax={maxWidth}
            aria-valuenow={Math.round(resizableWidth)}
          />
        )}
      </div>
    </SidebarContext.Provider>
  );
};

export const SidebarItem = ({
  icon,
  label,
  active,
  className,
  type,
  ...rest
}: SidebarItemProps) => {
  const { collapsed } = useSidebarContext();

  return (
    <button
      type={type ?? "button"}
      className={clsx(styles.item, active && styles.itemActive, className)}
      aria-label={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      {...rest}
    >
      <span className={styles.itemIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.itemLabel} aria-hidden={collapsed}>
        {label}
      </span>
    </button>
  );
};
