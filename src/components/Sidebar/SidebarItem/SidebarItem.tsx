import type { CSSProperties } from "react";
import { clsx } from "clsx";

import { BodyText } from "../../Typography";
import { useSidebarContext } from "../SidebarContext";
import styles from "./SidebarItem.module.css";
import type { SidebarItemProps } from "./SidebarItem.types";

export const SidebarItem = ({
  icon,
  label,
  active,
  depth = 0,
  endAdornment,
  className,
  type,
  ...rest
}: SidebarItemProps) => {
  const { collapsed } = useSidebarContext();
  const resolvedDepth = Math.max(0, depth);
  const indentStyle =
    resolvedDepth > 0
      ? ({ "--sidebar-item-indent": `${resolvedDepth * 14}px` } as
          CSSProperties)
      : undefined;

  return (
    <button
      type={type ?? "button"}
      className={clsx(styles.item, active && styles.itemActive, className)}
      style={indentStyle}
      data-collapsed={collapsed ? "true" : "false"}
      aria-label={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      {...rest}
    >
      <span className={styles.itemIcon} aria-hidden="true">
        {icon}
      </span>
      <BodyText
        as="span"
        className={styles.itemLabel}
        aria-hidden={collapsed}
        data-sidebar-collapsible="true"
      >
        {label}
      </BodyText>
      {endAdornment && (
        <span
          className={styles.itemEnd}
          aria-hidden={collapsed}
          data-sidebar-collapsible="true"
        >
          {endAdornment}
        </span>
      )}
    </button>
  );
};
