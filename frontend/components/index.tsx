import { useState } from "react";
import { Button } from "./buttons";
import { Typography } from "./typography";
import DatePicker from "./ui/calendar";
import Popover from "./ui/popover";
import Pagination from "./ui/pagination";
import CheckBox from "./ui/checkbox";
import Toggle from "./ui/toggle";
import Tab from "./ui/tab";

const Components = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [phone] = useState("");
  return (
    <section className="w-full h-screen overflow-x-auto p-3 p space-y-10 no-scrollbar text-center ">
      <Tab>
        <Tab.Header >
          <Tab.Link value="all" label="All" />
          <Tab.Link value="missed" label="Missed" />
        </Tab.Header>
      </Tab>
      <CheckBox checked={open} onChange={(checked) => setOpen(checked)} />
      <Toggle checked={open} onChange={(checked) => setOpen(checked)} />
      <Button onTap={() => setOpen(true)}>Open Modal</Button>
      {phone}
      <div className="w-full py-20 space-y-2">
        <Typography variant={"h2"}>
          We're on page <span className="bg-orange-400 px-4">{page}</span>
        </Typography>
        <Pagination
          totalPages={20}
          onPageChange={(_page) => setPage(_page)}
          page={page}
          className=" mx-auto"
        />
      </div>
      <Popover transformOrigin="top-left">
        <Popover.Trigger>
          <Button>Click me</Button>
        </Popover.Trigger>
        <Popover.Content className="p-4">anams</Popover.Content>
      </Popover>
      <DatePicker
        onChange={(date) => console.log(date)}
        disableOldDates={true}
        disabledDays={["Sunday", "Monday", "Thursday"]}
        className="w-full max-w-[400px] rounded-3xl "
      />
      <Button onTap={() => setOpen(!open)}>Charles</Button>
      <Typography variant={"span"}>I am boy</Typography>
      <Typography variant={"p"}>I am boy</Typography>
      <Typography variant={"h1"}>I am boy</Typography>
      <Typography variant={"h2"}>I am boy 44</Typography>
      <Typography variant={"h3"}>I am boy</Typography>
      <Typography variant={"h4"}>I am boy</Typography>
    </section>
  );
};

export default Components;
