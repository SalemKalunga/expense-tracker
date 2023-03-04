import { createContext, useState } from "react";

export const DepositePopupContext = createContext({
  openedDepositeOpup: false,
  setOpenedDepositeOpup: null,
});

export const DepositePopupContextProvider = ({ children }) => {
  const [openedDepositeOpup, setOpenedDepositeOpup] = useState(false);

  const value = { openedDepositeOpup, setOpenedDepositeOpup };
  return (
    <DepositePopupContext.Provider value={value}>
      {children}
    </DepositePopupContext.Provider>
  );
};
