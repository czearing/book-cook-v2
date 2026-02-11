"use client";

import { useRef, type MouseEvent } from "react";
import { XIcon } from "@phosphor-icons/react";

import styles from "./SidebarSearchDialog.module.css";
import type { SidebarSearchDialogProps } from "./SidebarSearchDialog.types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../Dialog";
import { Searchbox } from "../Searchbox";

export const SidebarSearchDialog = ({
  open,
  onOpenChange,
  searchQuery,
  onSearchQueryChange,
  onSubmit,
}: SidebarSearchDialogProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSurfaceMouseDown = (event: MouseEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }
    if (target.closest("button") || target.closest("input")) {
      return;
    }
    event.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        size="lg"
        variant="search"
        withCloseButton={false}
        motion="none"
      >
        <DialogTitle className={styles.visuallyHidden}>
          Search recipes
        </DialogTitle>
        <DialogDescription className={styles.visuallyHidden}>
          Search recipes by name, ingredient, or notes.
        </DialogDescription>
        <form
          className={styles.header}
          role="search"
          onMouseDown={handleSurfaceMouseDown}
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <Searchbox
            ref={inputRef}
            className={styles.searchField}
            variant="ghost"
            size="md"
            value={searchQuery}
            onValueChange={onSearchQueryChange}
            placeholder="Search recipes..."
            aria-label="Search recipes"
            autoFocus
            fullWidth
            showStartIcon={false}
            showClear={false}
            controlClassName={styles.searchControl}
            inputClassName={styles.searchInput}
          />
          <DialogClose asChild>
            <button
              type="button"
              className={styles.close}
              aria-label="Close search"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};
