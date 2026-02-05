import type { ReactNode } from "react";
import type {
  AccordionMultipleProps,
  AccordionSingleProps,
} from "@radix-ui/react-accordion";

export type AccordionItem = {
  /**
   * Unique value for the accordion item.
   */
  value: string;
  /**
   * Heading content for the accordion trigger.
   */
  title: ReactNode;
  /**
   * Content rendered inside the accordion panel.
   */
  content: ReactNode;
  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;
};

export type AccordionType = "single" | "multiple";
export type AccordionValue = string | string[];

type AccordionRootProps =
  | Omit<AccordionSingleProps, "type" | "collapsible" | "children">
  | Omit<AccordionMultipleProps, "type" | "children">;

export type AccordionProps = AccordionRootProps & {
  /**
   * Accordion items to render.
   */
  items: AccordionItem[];
  /**
   * Accordion behavior type.
   * @default "single"
   */
  type?: AccordionType;
  /**
   * The controlled value of the accordion.
   */
  value?: AccordionValue;
  /**
   * The default expanded value(s) for uncontrolled usage.
   */
  defaultValue?: AccordionValue;
  /**
   * Callback fired when the expanded value changes.
   */
  onValueChange?: (value: AccordionValue) => void;
  /**
   * Allow all items to be collapsed when type is "single".
   * @default true
   */
  collapsible?: boolean;
  /**
   * Optional class names for the accordion root.
   */
  className?: string;
  /**
   * Optional class names for each item.
   */
  itemClassName?: string;
  /**
   * Optional class names for triggers.
   */
  triggerClassName?: string;
  /**
   * Optional class names for content panels.
   */
  contentClassName?: string;
};
