import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SidebarContent } from "./SidebarContent";

const mockMutate = jest.fn();
const mockMutation = {
  mutate: mockMutate,
  isPending: false,
};

jest.mock("@/clientToServer/hooks/useCreateRecipe", () => ({
  useCreateRecipe: () => mockMutation,
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: jest.fn() }),
}));

beforeEach(() => {
  mockMutate.mockReset();
  mockMutation.isPending = false;
});

describe("SidebarContent — new recipe", () => {
  it("calls useCreateRecipe with 'Untitled recipe' when New recipe is clicked", async () => {
    const user = userEvent.setup();
    render(<SidebarContent />);

    await user.click(screen.getByRole("button", { name: "New recipe" }));

    expect(mockMutate).toHaveBeenCalledWith(
      "Untitled recipe",
      expect.objectContaining({ onSuccess: expect.any(Function) })
    );
  });

  it("calls onNavigate with /recipes/<id> on success", async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    mockMutate.mockImplementation((_title: string, options: { onSuccess: (data: { id: string }) => void }) => {
      options.onSuccess({ id: "abc-123" });
    });

    render(<SidebarContent onNavigate={onNavigate} />);
    await user.click(screen.getByRole("button", { name: "New recipe" }));

    expect(onNavigate).toHaveBeenCalledWith("/recipes/abc-123");
  });

  it("disables the New recipe button while pending", () => {
    mockMutation.isPending = true;
    render(<SidebarContent />);

    expect(screen.getByRole("button", { name: "New recipe" })).toBeDisabled();
  });

  it("does not open a dialog when New recipe is clicked", async () => {
    const user = userEvent.setup();
    render(<SidebarContent />);

    await user.click(screen.getByRole("button", { name: "New recipe" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
