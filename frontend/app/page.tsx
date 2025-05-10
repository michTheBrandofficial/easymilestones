"use client";

import { Button } from "@/components/buttons";
import AccountModal from "./_components/account-modal";
import { modalsBuilder } from "./utils/modals-builder";
import Link from "next/link";

const Home = () => {
  const { modals, modalFunctions } = modalsBuilder({
    account: {
      open: false,
    },
  });
  return (
    <section className="font-Satoshi w-full h-full  flex flex-col gap-y-10">
      <Button onTap={() => modalFunctions.openModal("account", {})}>
        Open account
      </Button>
      <AccountModal
        open={modals.account.open}
        onClose={() => modalFunctions.closeModal("account")}
      />
      <Link href={"/create-transaction"}>Create Transaction</Link>
    </section>
  );
};

export default Home;
