import type { Meta, StoryObj } from "@storybook/react";

import { TextEditor } from "./TextEditor";

const meta: Meta = {
  title: "Components/Text Editor",
};

export default meta;

export const Showcase: StoryObj = {
  render: () => <TextEditor />,
};
