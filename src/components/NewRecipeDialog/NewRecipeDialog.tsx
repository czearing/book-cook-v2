"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCreateRecipe } from "@/clientToServer/hooks/useCreateRecipe";
import { Button } from "@/components/Button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import type { NewRecipeDialogProps } from "./NewRecipeDialog.types";

export const NewRecipeDialog = ({ open, onOpenChange }: NewRecipeDialogProps) => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const mutation = useCreateRecipe();

  const handleCreate = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    mutation.mutate(trimmed, {
      onSuccess: ({ id }) => {
        router.push(`/recipes/${id}`);
        onOpenChange(false);
      },
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setTitle("");
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>New recipe</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input
            label="Title"
            placeholder="e.g. Spaghetti carbonara"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreate();
              }
            }}
            fullWidth
            autoFocus
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              onClick={() => setTitle("")}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="primary"
            disabled={mutation.isPending}
            isLoading={mutation.isPending}
            onClick={handleCreate}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
