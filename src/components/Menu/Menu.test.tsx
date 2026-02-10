import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "./Menu";

describe("Menu", () => {
  it("opens and fires onSelect for items", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <Menu>
        <MenuTrigger asChild>
          <button type="button">Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onSelect={onSelect}>Edit</MenuItem>
        </MenuContent>
      </Menu>
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const item = await screen.findByRole("menuitem", { name: "Edit" });

    await user.click(item);

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("does not fire onSelect for disabled items", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <Menu>
        <MenuTrigger asChild>
          <button type="button">Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem disabled onSelect={onSelect}>
            Archive
          </MenuItem>
        </MenuContent>
      </Menu>
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const item = await screen.findByRole("menuitem", { name: "Archive" });

    await user.click(item);

    expect(onSelect).not.toHaveBeenCalled();
    expect(item).toHaveAttribute("data-disabled");
  });

  it("handles checkbox and radio selection", async () => {
    const user = userEvent.setup();
    const onCheckedChange = jest.fn();
    const onValueChange = jest.fn();

    render(
      <Menu>
        <MenuTrigger asChild>
          <button type="button">Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem checked={false} onCheckedChange={onCheckedChange}>
            Notes
          </MenuCheckboxItem>
          <MenuRadioGroup value="newest" onValueChange={onValueChange}>
            <MenuRadioItem value="newest">Newest</MenuRadioItem>
            <MenuRadioItem value="oldest">Oldest</MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    await user.click(await screen.findByRole("menuitemcheckbox", { name: "Notes" }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);

    await user.click(await screen.findByRole("menuitemradio", { name: "Oldest" }));
    expect(onValueChange).toHaveBeenCalledWith("oldest");
  });
});
