"use client";

import { Button } from "@/components/buttons";
import AccountModal from "./_components/account-modal";
import { modalsBuilder } from "./utils/modals-builder";
import Link from "next/link";
import { useSheet } from "@/components/ui/sheet";

const Home = () => {
  const { Sheet, SheetContent, SheetHeader, openSheet } = useSheet('account')
  return (
    <section className="font-Satoshi w-full h-full flex-col gap-y-10 ">
      <Sheet title="Account"  ></Sheet>
    </section>
  );
};

export default Home;
