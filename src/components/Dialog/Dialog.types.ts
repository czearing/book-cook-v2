import type { HTMLAttributes } from "react";
import type {
  DialogContentProps as RadixDialogContentProps,
  DialogDescriptionProps as RadixDialogDescriptionProps,
  DialogOverlayProps as RadixDialogOverlayProps,
  DialogProps as RadixDialogProps,
  DialogTitleProps as RadixDialogTitleProps,
  DialogTriggerProps as RadixDialogTriggerProps,
  DialogCloseProps as RadixDialogCloseProps,
} from "@radix-ui/react-dialog";

export type DialogProps = RadixDialogProps;
export type DialogTriggerProps = RadixDialogTriggerProps;
export type DialogOverlayProps = RadixDialogOverlayProps & {
  /**
   * Optional class names for the overlay.
   */
  className?: string;
};

export type DialogSize = "sm" | "md" | "lg";
export type DialogVariant = "default" | "search";
export type DialogMotion = "default" | "none";

export type DialogContentProps = RadixDialogContentProps & {
  /**
   * Optional class names for the dialog content.
   */
  className?: string;
  /**
   * Optional class names for the dialog overlay.
   */
  overlayClassName?: string;
  /**
   * Dialog width preset.
   * @default "md"
   */
  size?: DialogSize;
  /**
   * Dialog visual variant.
   * @default "default"
   */
  variant?: DialogVariant;
  /**
   * Render the close button in the top-right corner.
   * @default true
   */
  withCloseButton?: boolean;
  /**
   * Accessible label for the close button.
   * @default "Close dialog"
   */
  closeLabel?: string;
  /**
   * Render the overlay behind the dialog.
   * @default true
   */
  withOverlay?: boolean;
  /**
   * Motion preset.
   * Use "none" for instant-open dialogs (e.g. command palette search).
   * @default "default"
   */
  motion?: DialogMotion;
};

export type DialogTitleProps = RadixDialogTitleProps & {
  /**
   * Optional class names for the dialog title.
   */
  className?: string;
};

export type DialogDescriptionProps = RadixDialogDescriptionProps & {
  /**
   * Optional class names for the dialog description.
   */
  className?: string;
};

export type DialogCloseProps = RadixDialogCloseProps & {
  /**
   * Optional class names for the close trigger.
   */
  className?: string;
};

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Optional class names for the header container.
   */
  className?: string;
};

export type DialogBodyProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Optional class names for the body container.
   */
  className?: string;
};

export type DialogFooterProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Optional class names for the footer container.
   */
  className?: string;
};
