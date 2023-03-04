import React, { useContext } from "react";
import { AddIncomeButton } from "../main/main.style";
import { Form } from "./add_income_form.style";
import { PopupContext } from "../../contexts/popup.context";

const AddIncomeForm = () => {
  const { openedDepositeOpup, setOpenedDepositeOpup } =
    useContext(PopupContext);
  const toggleDepositePopup = () => {
    setOpenedDepositeOpup(!openedDepositeOpup);
  };
  return (
    <>
      <h1>Dépot</h1>
      <br />
      <Form>
        <input type="number" placeholder="$ amount" required />
        <input type="text" placeholder="source" required />
        <AddIncomeButton type="button" onClick={toggleDepositePopup}>
          déposer
        </AddIncomeButton>
      </Form>
    </>
  );
};

export default AddIncomeForm;
