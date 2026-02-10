import type { Meta, StoryObj } from "@storybook/react";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Button } from "../Button";
import { BodyText } from "../Typography";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save recipe</DialogTitle>
          <DialogDescription>
            Choose where this recipe should live in your library.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <BodyText as="p">
            Your most recent collection will be selected by default. You can
            also create a new collection later.
          </BodyText>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="secondary">Open {size} dialog</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{size.toUpperCase()} dialog</DialogTitle>
              <DialogDescription>
                This dialog uses the {size} width preset.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
              <Button>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Read story</Button>
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Weekend dinner plan</DialogTitle>
          <DialogDescription>
            A quick preview of your lineup for the next three meals.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <BodyText as="p" key={`line-${index}`}>
              {index + 1}. Start with the citrus salad, then follow with the
              roasted squash and finish with the brown butter cake.
            </BodyText>
          ))}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button>Save plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
