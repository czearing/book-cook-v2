import type { CSSProperties } from "react";
import { clsx } from "clsx";

import { MetaLabel } from "../../Typography";
import styles from "./SidebarSection.module.css";
import type { SidebarSectionProps } from "./SidebarSection.types";

export const SidebarSection = ({
  label,
  depth = 0,
  className,
  style,
  ...rest
}: SidebarSectionProps) => {
  const resolvedDepth = Math.max(0, depth);
  const indentStyle =
    resolvedDepth > 0
      ? ({ "--sidebar-item-indent": `${resolvedDepth * 14}px` } as
          CSSProperties)
      : undefined;

  return (
    <div
      className={clsx(styles.section, className)}
      style={{ ...style, ...indentStyle }}
      data-sidebar-collapsible="true"
      {...rest}
    >
      <MetaLabel as="span" className={styles.sectionLabel}>
        {label}
      </MetaLabel>
    </div>
  );
};
