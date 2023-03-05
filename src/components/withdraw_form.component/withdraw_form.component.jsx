import React, { useContext } from "react";
import { WithdrawButton } from "../main/main.style";
import {
  CloseButton,
  Form,
} from "../add_income_form.component/add_income_form.style";
import { PopupContext } from "../../contexts/popup.context";

const WithdrawForm = () => {
  const { openedWithdrawOpup, setOpenedWithdrawOpup } =
    useContext(PopupContext);
  const toggleWithdrawPopup = () => {
    setOpenedWithdrawOpup(!openedWithdrawOpup);
  };
  return (
    <>
      <h1>Retrait</h1>
      <br />
      <CloseButton onClick={() => setOpenedWithdrawOpup(!openedWithdrawOpup)}>
        X
      </CloseButton>
      <Form>
        <input type="number" placeholder="$ montant" required />
        <input type="text" placeholder="justification" required />
        <WithdrawButton type="button">retirer</WithdrawButton>
      </Form>
    </>
  );
};

export default WithdrawForm;
