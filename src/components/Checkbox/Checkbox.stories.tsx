import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";
import { Stack } from "../Stack";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const UncontrolledCheckbox = ({ initial = false }) => {
  const [checked, setChecked] = useState(initial);
  return <Checkbox checked={checked} onClick={() => setChecked(!checked)} />;
};

export const Interactive: Story = {
  render: () => (
    <Stack direction="row" gap="md">
      <UncontrolledCheckbox initial={false} />
      <UncontrolledCheckbox initial={true} />
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" gap="md">
      <Checkbox checked={false} disabled />
      <Checkbox checked={true} disabled />
    </Stack>
  ),
};
