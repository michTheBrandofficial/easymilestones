import { useState } from "react";

export const modalsBuilder = <
  T extends {
    [index: string]: {
      open: boolean;
      [index: string]: any;
    };
  }
>(
  modalConfigs: T
) => {
  const [modals, setModals] = useState(modalConfigs);
  const modalFunctions = {
    openModal: <K extends keyof typeof modals>(
      modal: K,
      payload: Omit<(typeof modals)[K], "open">
    ) => {
      setModals((p) => ({
        ...p,
        [modal]: {
          ...p[modal],
          ...payload,
          open: true,
        },
      }));
    },
    closeModal: (modal: keyof typeof modals) => {
      setModals((p) => ({
        ...p,
        [modal]: {
          ...p[modal],
          open: false,
        },
      }));
    },
  };
  return {
    modals,
    modalFunctions,
  };
};
