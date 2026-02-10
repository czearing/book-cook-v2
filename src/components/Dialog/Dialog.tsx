"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import styles from "./Dialog.module.css";
import type {
  DialogBodyProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./Dialog.types";

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const variantClassMap = {
  default: null,
  search: styles.variantSearch,
} as const;

/**
 * Dialog root using Radix Dialog.
 */
export const Dialog = (props: DialogProps) => (
  <DialogPrimitive.Root {...props} />
);

/**
 * Dialog trigger. Use with `asChild` for custom triggers.
 */
export const DialogTrigger = (props: DialogTriggerProps) => (
  <DialogPrimitive.Trigger {...props} />
);

/**
 * Dialog overlay layer.
 */
export const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Overlay
    className={clsx(styles.overlay, className)}
    {...props}
  />
);

/**
 * Dialog content panel.
 */
export const DialogContent = ({
  className,
  overlayClassName,
  size = "md",
  variant = "default",
  withCloseButton = true,
  closeLabel = "Close dialog",
  withOverlay = true,
  children,
  ...props
}: DialogContentProps) => (
  <DialogPrimitive.Portal>
    {withOverlay && <DialogOverlay className={overlayClassName} />}
    <DialogPrimitive.Content
      className={clsx(
        styles.content,
        sizeClassMap[size],
        variantClassMap[variant],
        className
      )}
      data-close-button={withCloseButton ? "" : undefined}
      {...props}
    >
      {children}
      {withCloseButton && (
        <DialogPrimitive.Close
          aria-label={closeLabel}
          className={styles.closeButton}
          type="button"
        >
          <XIcon size={16} aria-hidden="true" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

/**
 * Dialog title.
 */
export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    className={clsx(styles.title, className)}
    {...props}
  />
);

/**
 * Dialog description.
 */
export const DialogDescription = ({
  className,
  ...props
}: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={clsx(styles.description, className)}
    {...props}
  />
);

/**
 * Dialog close control (typically used with `asChild`).
 */
export const DialogClose = ({ className, ...props }: DialogCloseProps) => (
  <DialogPrimitive.Close className={clsx(styles.close, className)} {...props} />
);

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={clsx(styles.header, className)} {...props} />
);

export const DialogBody = ({ className, ...props }: DialogBodyProps) => (
  <div className={clsx(styles.body, className)} {...props} />
);

export const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div className={clsx(styles.footer, className)} {...props} />
);
