"use client";

import { Button } from "@/components/buttons";
import AccountModal from "./_components/account-modal";
import { modalsBuilder } from "./utils/modals-builder";

const Home = () => {
  const { modals, modalFunctions } = modalsBuilder({
    account: {
      open: false,
    },
  });
  return (
    <section className="font-Satoshi w-full h-full bg-em-sky-blue">
      <Button onTap={() => modalFunctions.openModal("account", {})}>
        Open account
      </Button>
      <AccountModal
        open={modals.account.open}
        onClose={() => modalFunctions.closeModal("account")}
      />
    </section>
  );
};

export default Home;
