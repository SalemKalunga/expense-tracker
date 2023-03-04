import React, { useContext } from "react";
import { WithdrawButton } from "../main/main.style";
import { Form } from "../add_income_form.component/add_income_form.style";
import { PopupContext } from "../../contexts/popup.context";

const WithdrawForm = () => {
  const { setOpenedWithdrawOpup, openedWithdrawOpup } =
    useContext(PopupContext);
  const toggleWithdrawPopup = () => {
    setOpenedWithdrawOpup(!openedWithdrawOpup);
  };
  return (
    <>
      <h1>Retrait</h1>
      <br />
      <Form>
        <input type="number" placeholder="$ montant" required />
        <input type="text" placeholder="justification" required />
        <WithdrawButton type="button" onClick={toggleWithdrawPopup}>
          retirer
        </WithdrawButton>
      </Form>
    </>
  );
};

export default WithdrawForm;
