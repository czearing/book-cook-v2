import { clsx } from "clsx";

import styles from "./Tag.module.css";
import type { TagProps } from "./Tag.types";
import { BodyText } from "../Typography";

export const Tag = ({
  children,
  onClick,
  startIcon,
  startIconAriaLabel,
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
        {startIcon && (
          <span
            className={styles.startIcon}
            aria-label={startIconAriaLabel}
            role={startIconAriaLabel ? "img" : undefined}
            aria-hidden={startIconAriaLabel ? undefined : true}
          >
            {startIcon}
          </span>
        )}
        <BodyText as="span" className={styles.text}>
          {children}
        </BodyText>
        {endIcon && (
          <span
            role={onEndIconClick ? "button" : undefined}
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
      {startIcon && (
        <span
          className={styles.startIcon}
          aria-label={startIconAriaLabel}
          role={startIconAriaLabel ? "img" : undefined}
          aria-hidden={startIconAriaLabel ? undefined : true}
        >
          {startIcon}
        </span>
      )}
      <BodyText as="span" className={styles.text}>
        {children}
      </BodyText>
      {endIcon && (
        <span
          role={onEndIconClick ? "button" : undefined}
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
