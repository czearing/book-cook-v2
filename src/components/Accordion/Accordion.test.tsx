import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Accordion } from "./Accordion";
import type { AccordionItem } from "./Accordion.types";

const items: AccordionItem[] = [
  {
    value: "ingredients",
    title: "Ingredients",
    content: "Flour and sugar",
  },
  {
    value: "steps",
    title: "Steps",
    content: "Mix and cook",
  },
  {
    value: "notes",
    title: "Notes",
    content: "Rest the batter",
    disabled: true,
  },
];

describe("Accordion", () => {
  it("toggles an item when clicked", async () => {
    const user = userEvent.setup();

    render(<Accordion items={items} />);

    const trigger = screen.getByRole("button", { name: "Ingredients" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Flour and sugar")).toBeVisible();
  });

  it("allows multiple items to be open when type is multiple", async () => {
    const user = userEvent.setup();

    render(
      <Accordion
        items={items}
        type="multiple"
        defaultValue={["ingredients"]}
      />
    );

    await user.click(screen.getByRole("button", { name: "Steps" }));

    expect(screen.getByText("Flour and sugar")).toBeVisible();
    expect(screen.getByText("Mix and cook")).toBeVisible();
  });

  it("does not open disabled items", async () => {
    const user = userEvent.setup();

    render(<Accordion items={items} />);

    const trigger = screen.getByRole("button", { name: "Notes" });

    expect(trigger).toBeDisabled();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
