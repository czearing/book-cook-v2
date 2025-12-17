import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";
import { Stack } from "../Stack";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Interactive: Story = {
  render: () => (
    <Stack direction="row" gap="md">
      <Checkbox defaultChecked={false} />
      <Checkbox defaultChecked={true} />
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" gap="md">
      <Checkbox defaultChecked={false} disabled />
      <Checkbox defaultChecked={true} disabled />
    </Stack>
  ),
};
