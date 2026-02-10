"use client";

import { XIcon } from "@phosphor-icons/react";

import styles from "./SidebarContent.module.css";
import { Dialog, DialogClose, DialogContent } from "../Dialog";
import { Searchbox } from "../Searchbox";

export type SidebarSearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSubmit: () => void;
};

export const SidebarSearchDialog = ({
  open,
  onOpenChange,
  searchQuery,
  onSearchQueryChange,
  onSubmit,
}: SidebarSearchDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      size="md"
      variant="search"
      withCloseButton={false}
      overlayClassName={styles.searchOverlay}
    >
      <form
        className={styles.searchHeader}
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Searchbox
          className={styles.searchField}
          variant="ghost"
          size="lg"
          value={searchQuery}
          onValueChange={onSearchQueryChange}
          placeholder="Search recipes..."
          aria-label="Search recipes"
          autoFocus
          fullWidth
          showStartIcon={false}
          showClear={false}
        />
        <DialogClose asChild>
          <button
            type="button"
            className={styles.searchClose}
            aria-label="Close search"
          >
            <XIcon size={16} aria-hidden="true" />
          </button>
        </DialogClose>
      </form>
    </DialogContent>
  </Dialog>
);
