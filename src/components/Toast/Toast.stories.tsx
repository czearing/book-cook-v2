import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";

import { Toast } from "./Toast";
import { Button } from "../Button";
import { Stack } from "../Stack";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Playground: Story = {
  render: () => (
    <>
      <Toast />
      <Stack direction="row" gap="sm" wrap>
        <Button onClick={() => toast("Recipe saved")}>Toast</Button>
        <Button onClick={() => toast("Share link copied", { description: "Ready to paste." })}>
          With Description
        </Button>
        <Button onClick={() => toast.success("Published")}>Success</Button>
        <Button onClick={() => toast.error("Save failed")}>Error</Button>
      </Stack>
    </>
  ),
};
