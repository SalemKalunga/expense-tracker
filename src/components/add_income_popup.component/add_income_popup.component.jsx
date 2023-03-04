import React, { useContext } from "react";
import "./add_income_popup.style";
import { PopupContainer } from "./add_income_popup.style";
import AddIncomeForm from "../add_income_form.component/add_income_form.component";
import { DepositePopupContext } from "../../contexts/deposite.popup.context";
const AddIncomePopup = () => {
  const { openedDepositeOpup, setOpenedDepositeOpup } =
    useContext(DepositePopupContext);
  const toggleDepositePopup = () => {
    setOpenedDepositeOpup(!openedDepositeOpup);
  };
  return (
    <PopupContainer>
      <AddIncomeForm type="button" onClick={toggleDepositePopup} />
    </PopupContainer>
  );
};

export default AddIncomePopup;
