import { clsx } from "clsx";

import styles from "./Tag.module.css";
import type { TagProps } from "./Tag.types";
import { BodyText } from "../Typography";

export const Tag = ({
  children,
  onClick,
  endIcon,
  onEndIconClick,
  endIconAriaLabel,
  className,
}: TagProps) => {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(styles.tag, styles.interactive, className)}
      >
        <BodyText as="span" className={styles.text}>
          {children}
        </BodyText>
        {endIcon && (
          <span
            role="button"
            aria-label={endIconAriaLabel}
            className={styles.endIcon}
            onClick={(event) => {
              event.stopPropagation();
              onEndIconClick?.(event);
            }}
          >
            {endIcon}
          </span>
        )}
      </button>
    );
  }

  return (
    <span className={clsx(styles.tag, className)}>
      <BodyText as="span" className={styles.text}>
        {children}
      </BodyText>
      {endIcon && (
        <span
          role="button"
          aria-label={endIconAriaLabel}
          className={styles.endIcon}
          onClick={onEndIconClick}
        >
          {endIcon}
        </span>
      )}
    </span>
  );
};
