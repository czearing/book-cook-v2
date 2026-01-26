import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TagEditor } from "./TagEditor";

const setup = (props: Partial<React.ComponentProps<typeof TagEditor>> = {}) => {
  const user = userEvent.setup();
  const onTagClick = jest.fn();
  const onTagsChange = jest.fn();
  render(
    <TagEditor
      tags={["Spicy"]}
      onTagClick={onTagClick}
      onTagsChange={onTagsChange}
      {...props}
    />
  );

  return { user, onTagClick, onTagsChange };
};

describe("TagEditor", () => {
  it("fires tag click when not editing", async () => {
    const { user, onTagClick } = setup();

    const tagButton = screen.getByText("Spicy").closest("button");
    expect(tagButton).not.toBeNull();
    await user.click(tagButton as HTMLElement);

    expect(onTagClick).toHaveBeenCalledWith("Spicy");
  });

  it("ignores tag click while editing", async () => {
    const { user, onTagClick } = setup();

    await user.click(screen.getByLabelText("Edit tags"));
    await user.click(screen.getByText("Spicy"));

    expect(onTagClick).not.toHaveBeenCalled();
  });

  it("adds a tag and saves on outside click", async () => {
    const { user, onTagsChange } = setup();

    await user.click(screen.getByLabelText("Edit tags"));
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.type(screen.getByPlaceholderText("Add tag"), "Salty{enter}");

    fireEvent.pointerDown(document.body);

    expect(onTagsChange).toHaveBeenCalledWith(["Spicy", "Salty"]);
  });

  it("removes a tag and saves on outside click", async () => {
    const { user, onTagsChange } = setup();

    await user.click(screen.getByLabelText("Edit tags"));
    await user.click(screen.getByLabelText("Remove Spicy"));

    fireEvent.pointerDown(document.body);

    expect(onTagsChange).toHaveBeenCalledWith([]);
  });

  it("shows the edit control for empty tags", () => {
    setup({ tags: [] });

    expect(screen.getByLabelText("Edit tags")).toBeInTheDocument();
  });
});
