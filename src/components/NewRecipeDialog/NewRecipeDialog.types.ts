export type NewRecipeDialogProps = {
  /**
   * Controls whether the dialog is open.
   */
  open: boolean;

  /**
   * Called when the dialog open state changes.
   */
  onOpenChange: (open: boolean) => void;
};
