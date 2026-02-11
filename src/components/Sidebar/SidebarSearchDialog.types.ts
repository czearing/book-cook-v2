/** Props for `SidebarSearchDialog`. */
export type SidebarSearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSubmit: () => void;
};

