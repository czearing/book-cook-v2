import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("shows the tooltip content on hover", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Helpful copy" delay={0}>
        <button type="button">Trigger</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole("button", { name: "Trigger" }));

    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Helpful copy"
    );
  });

  it("does not render when disabled", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Hidden" delay={0} disabled>
        <button type="button">Trigger</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole("button", { name: "Trigger" }));

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
