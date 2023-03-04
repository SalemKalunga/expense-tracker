import React, { useContext } from "react";
import { AddIncomeButton } from "../main/main.style";
import { Form } from "./add_income_form.style";
import { DepositePopupContext } from "../../contexts/deposite.popup.context";

const AddIncomeForm = (props) => {
  const { openedDepositeOpup, setOpenedDepositeOpup } =
    useContext(DepositePopupContext);
  const toggleDepositePopup = () => {
    setOpenedDepositeOpup(!openedDepositeOpup);
  };
  return (
    <>
      <h1>Deposite</h1>
      <br />
      <Form>
        <input type="number" placeholder="$ amount" required />
        <input type="text" placeholder="source" required />
        <AddIncomeButton type="button" onClick={toggleDepositePopup}>
          add new income
        </AddIncomeButton>
      </Form>
    </>
  );
};

export default AddIncomeForm;
