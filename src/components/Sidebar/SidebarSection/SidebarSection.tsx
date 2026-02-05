import type { CSSProperties } from "react";
import { clsx } from "clsx";

import styles from "./SidebarSection.module.css";
import type { SidebarSectionProps } from "./SidebarSection.types";

import { Accordion } from "../../Accordion";

export const SidebarSection = ({
  label,
  children,
  depth = 0,
  variant = "section",
  icon,
  endAdornment,
  defaultOpen = true,
  open,
  onOpenChange,
  className,
  style,
  ...rest
}: SidebarSectionProps) => {
  const resolvedDepth = Math.max(0, depth);
  const indentStyle =
    resolvedDepth > 0
      ? ({
          "--sidebar-section-indent": `${resolvedDepth * 14}px`,
        } as CSSProperties)
      : undefined;
  const sectionValue = label;
  const isControlled = typeof open === "boolean";
  const isItemVariant = variant === "item";
  const resolvedValue = isControlled ? (open ? sectionValue : "") : undefined;
  const resolvedDefaultValue =
    !isControlled && defaultOpen ? sectionValue : undefined;
  const title = isItemVariant ? (
    <>
      {icon && (
        <span className={styles.sectionIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.sectionText}>{label}</span>
      {endAdornment && (
        <span className={styles.sectionEnd} aria-hidden="true">
          {endAdornment}
        </span>
      )}
    </>
  ) : (
    label
  );
  const handleValueChange = (value: string | string[]) => {
    if (typeof value !== "string") {
      return;
    }
    onOpenChange?.(value === sectionValue);
  };

  return (
    <Accordion
      items={[
        {
          value: sectionValue,
          title,
          content: children,
        },
      ]}
      type="single"
      collapsible
      value={resolvedValue}
      defaultValue={resolvedDefaultValue}
      onValueChange={onOpenChange ? handleValueChange : undefined}
      className={clsx(styles.section, isItemVariant && styles.sectionItem, className)}
      triggerClassName={clsx(
        styles.sectionTrigger,
        isItemVariant && styles.sectionTriggerItem
      )}
      contentClassName={styles.sectionContent}
      data-sidebar-collapsible="true"
      style={{ ...style, ...indentStyle }}
      {...rest}
    />
  );
};
