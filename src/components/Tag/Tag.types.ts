import type { ReactNode } from "react";

export type TagProps = {
  /**
   * Tag contents.
   */
  children: ReactNode;
  /**
   * Optional click handler for interactive tags.
   */
  onClick?: () => void;
  /**
   * Optional trailing icon.
   */
  endIcon?: ReactNode;
  /**
   * Handler for trailing icon clicks.
   */
  onEndIconClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  /**
   * Accessible label for the trailing icon.
   */
  endIconAriaLabel?: string;
  /**
   * Optional class names to customize the tag.
   */
  className?: string;
};
