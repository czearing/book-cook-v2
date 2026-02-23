import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/Button";
import { NewRecipeDialog } from "./NewRecipeDialog";

const meta: Meta<typeof NewRecipeDialog> = {
  title: "Components/NewRecipeDialog",
  component: NewRecipeDialog,
};

export default meta;

type Story = StoryObj<typeof NewRecipeDialog>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => undefined,
  },
};

export const WithTrigger: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>New recipe</Button>
        <NewRecipeDialog open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};
