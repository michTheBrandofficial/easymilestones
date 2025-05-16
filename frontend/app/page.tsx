"use client";
import { Button } from "@/components/buttons";
import { useSheet } from "@/components/ui/sheet";

const Home = () => {
  const { Sheet, SheetContent, SheetHeader, openSheet } = useSheet("account");
  return (
    <section className="font-Satoshi w-full h-full flex-col gap-y-10 ">
      <Sheet title="Account"></Sheet>
      <Button onTap={openSheet} className="mt-40" >Open</Button>
    </section>
  );
};

export default Home;
