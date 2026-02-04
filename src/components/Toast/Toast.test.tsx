import { act, render, screen } from "@testing-library/react";
import { toast } from "sonner";

import { Toast } from "./Toast";

describe("Toast", () => {
  afterEach(() => {
    toast.dismiss();
  });

  it("renders toast content", async () => {
    render(<Toast />);

    act(() => {
      toast("Recipe saved");
    });

    expect(await screen.findByText("Recipe saved")).toBeInTheDocument();
  });

  it("merges custom class names", () => {
    render(<Toast className="custom-toaster" />);

    expect(document.querySelector(".custom-toaster")).toBeInTheDocument();
  });
});
