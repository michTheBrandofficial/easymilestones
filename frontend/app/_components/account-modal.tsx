import { Button } from "@/components/buttons";
import Modal from "@/components/ui/modal";
import { ArrowRightFromSquare, Copy } from "@gravity-ui/icons";
import React from "react";
import { useLocalAccount } from "../_context/local-account";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";
import { Typography } from "@/components/typography";
import { formatEthAddress } from "../utils/format-address";
import BlueGirlAvatar from "../_avatars/blue-girl";

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const AccountModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const { privateKeyAccount, publicClient } = useLocalAccount();
  const { data: balance } = useQuery({
    queryKey: ["account-balance"],
    queryFn: async () =>
      publicClient.getBalance({
        address: privateKeyAccount.address,
        blockTag: "latest",
      }),
    refetchOnWindowFocus: false,
  });
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Body className="bg-em-dark min-w-[280px] text-white flex flex-col gap-y-4 !border-none">
        <Modal.Header title="Connected" />
        <div className="flex justify-center">
          <BlueGirlAvatar />
        </div>
        <div className="flex flex-col gap-y-1 items-center justify-center">
          <div className="flex items-center justify-center gap-x-2">
            <Typography className="">
              {formatEthAddress(privateKeyAccount.address)}
            </Typography>
            <Button
              onTap={async () => {
                navigator.clipboard
                  .writeText(privateKeyAccount.address)
                  .then(() => {
                    console.log("Copied to clipboard");
                  })
                  .catch((err) => {
                    throw new Error(err);
                  });
              }}
              variant="icon"
              className="p-0 bg-transparent text-em-light-dark"
            >
              <Copy className="" width={14} height={14} />
            </Button>
          </div>
          <Typography className="max-w- overflow-hidden text-ellipsis text-sm text-em-light-dark">
            {balance && Number(formatEther(balance)).toFixed(4)} ETH
          </Typography>
        </div>
        <Button className="mt-auto flex items-center justify-center rounded-xl gap-x-2 w-full bg-em-light-dark py-3">
          <ArrowRightFromSquare width={20} height={20} /> Disconnect
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AccountModal;
