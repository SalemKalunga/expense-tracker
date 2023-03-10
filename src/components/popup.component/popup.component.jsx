import React, { useContext } from "react";
import "./popup.style";
import { PopupContainer } from "./popup.style";
import AddIncomeForm from "../add_income_form.component/add_income_form.component";
import WithdrawForm from "../withdraw_form.component/withdraw_form.component";
import { PopupContext } from "../../contexts/popup.context";

const AddIncomePopup = ({ depositeHandler, withdrawHandler }) => {
  const { openedDepositeOpup, openedWithdrawOpup } = useContext(PopupContext);

  return (
    <PopupContainer>
      {openedDepositeOpup ? (
        <AddIncomeForm depositeHandler={depositeHandler} />
      ) : (
        <></>
      )}
      {openedWithdrawOpup ? (
        <WithdrawForm withdrawHandler={withdrawHandler} />
      ) : (
        <></>
      )}
    </PopupContainer>
  );
};

export default AddIncomePopup;
