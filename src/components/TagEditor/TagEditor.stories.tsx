import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TagEditor } from "./TagEditor";

const meta: Meta<typeof TagEditor> = {
  title: "Components/TagEditor",
  component: TagEditor,
  parameters: {
    layout: "padded",
  },
};

export default meta;

const AVAILABLE_TAGS = [
  "Spicy",
  "Weeknight",
  "Comfort Food",
  "Dessert",
  "Vegetarian",
  "Quick",
  "Salty",
  "Sweet",
];

/** View mode — tags are clickable, edit control appears on hover. */
const EditableStory = () => {
  const [tags, setTags] = useState(["Spicy", "Weeknight", "Comfort Food"]);
  return (
    <TagEditor
      tags={tags}
      availableTags={AVAILABLE_TAGS}
      onTagsChange={setTags}
      onTagClick={() => undefined}
    />
  );
};

export const ViewMode: StoryObj<typeof TagEditor> = {
  name: "View mode",
  render: () => <EditableStory />,
};

/** Edit mode — edit control always visible, input is focused, remove buttons on tags. */
const EditModeStory = () => {
  const [tags, setTags] = useState(["Spicy", "Weeknight"]);
  return (
    <TagEditor
      tags={tags}
      availableTags={AVAILABLE_TAGS}
      onTagsChange={setTags}
      onTagClick={() => undefined}
      showEditControl
    />
  );
};

export const EditMode: StoryObj<typeof TagEditor> = {
  name: "Edit mode",
  render: () => <EditModeStory />,
};

/** Read-only — no edit control rendered at all. */
export const ReadOnly: StoryObj<typeof TagEditor> = {
  name: "Read-only",
  render: () => (
    <TagEditor
      tags={["Dessert", "Cookies"]}
      editable={false}
      onTagClick={() => undefined}
    />
  ),
};

/** Empty state — no tags, edit control always visible to invite the first tag. */
export const Empty: StoryObj<typeof TagEditor> = {
  name: "Empty state",
  render: () => (
    <TagEditor
      tags={[]}
      showEditControl
      availableTags={AVAILABLE_TAGS}
      onTagClick={() => undefined}
    />
  ),
};

/** Single tag — edge case for padding and alignment. */
export const SingleTag: StoryObj<typeof TagEditor> = {
  name: "Single tag",
  render: () => (
    <TagEditor
      tags={["Vegetarian"]}
      availableTags={AVAILABLE_TAGS}
      onTagsChange={() => undefined}
      onTagClick={() => undefined}
    />
  ),
};
