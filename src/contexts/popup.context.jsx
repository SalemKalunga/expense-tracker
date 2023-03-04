import { createContext, useState } from "react";

export const PopupContext = createContext({
  openedDepositeOpup: false,
  setOpenedDepositeOpup: null,
  openedWithdrawOpup: false,
  setOpenedWithdrawOpup: null,
});

export const PopupContextProvider = ({ children }) => {
  const [openedDepositeOpup, setOpenedDepositeOpup] = useState(false);
  const [openedWithdrawOpup, setOpenedWithdrawOpup] = useState(false);

  const value = {
    openedDepositeOpup,
    openedWithdrawOpup,
    setOpenedDepositeOpup,
    setOpenedWithdrawOpup,
  };
  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
};
