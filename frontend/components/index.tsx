"use client";
import { useState } from "react";
import { Button } from "./buttons";
import Popover from "./ui/popover";
import CheckBox from "./ui/checkbox";
import Toggle from "./ui/toggle";
import PendingOverlay from "./ui/pending-overlay";
import Sheet from "./ui/sheet";

const Components = () => {
  const [open, setOpen] = useState(false);
  const [phone] = useState("");
  return (
    <section className="w-full h-screen overflow-x-auto p-3 p space-y-10 no-scrollbar ">
      <CheckBox checked={open} onChange={(checked) => setOpen(checked)} />
      <Toggle checked={open} onChange={(checked) => setOpen(checked)} />
      <Button onTap={() => setOpen(true)}>Open Modal</Button>
      {phone}
      <Popover transformOrigin="top-left">
        <Popover.Trigger>
          <Button>Click me</Button>
        </Popover.Trigger>
        <Popover.Content className="p-4">anams</Popover.Content>
      </Popover>
      <Button onTap={() => setOpen(!open)}>Charles</Button>
      <PendingOverlay isPending={false} />
      <Sheet open={open} onClose={() => {
        setOpen(false)
      }} title="Confirm">
        <Sheet.Body>
          <Sheet.Header>Address</Sheet.Header>
          <Sheet.Content>djdjkd</Sheet.Content>
        </Sheet.Body>
      </Sheet>
    </section>
  );
};

export default Components;
