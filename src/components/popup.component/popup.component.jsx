import React from "react";
import "./popup.style";
import { PopupContainer } from "./popup.style";
import AddIncomeForm from "../add_income_form.component/add_income_form.component";
import WithdrawForm from "../withdraw_form.component/withdraw_form.component";
import { useSelector } from "react-redux";
import {
  selectDepositePopupStateValue,
  selectWithdrawPopupStateValue,
} from "../../store/popup/popup.selectors";

const PopupComponent = ({ depositeHandler, withdrawHandler }) => {
  const openedDepositeOpup = useSelector(selectDepositePopupStateValue);
  const openedWithdrawOpup = useSelector(selectWithdrawPopupStateValue);
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

export default PopupComponent;
