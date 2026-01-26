import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { TagEditor } from "./TagEditor";

const meta: Meta = {
  title: "Components/TagEditor",
  component: TagEditor,
};

export default meta;

export const Editable: StoryObj = {
  render: () => {
    const [tags, setTags] = useState(["Spicy", "Weeknight", "Comfort Food"]);
    return (
      <TagEditor
        tags={tags}
        onTagsChange={setTags}
        onTagClick={() => undefined}
      />
    );
  },
};

export const ReadOnly: StoryObj = {
  render: () => (
    <TagEditor
      tags={["Dessert", "Cookies"]}
      editable={false}
      onTagClick={() => undefined}
    />
  ),
};

export const Empty: StoryObj = {
  render: () => (
    <TagEditor
      tags={[]}
      showEditControl
      onTagClick={() => undefined}
    />
  ),
};
