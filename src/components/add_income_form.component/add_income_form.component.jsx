import React, { useContext, useState } from "react";
import { AddIncomeButton } from "../main/main.style";
import { CloseButton, Form } from "./add_income_form.style";
import { PopupContext } from "../../contexts/popup.context";

const AddIncomeForm = ({ depositeHandler }) => {
  const { openedDepositeOpup, setOpenedDepositeOpup } =
    useContext(PopupContext);
  const formData = {
    amount: 0,
    source: "",
  };

  const [depositeFormData, setdepositeFormData] = useState(formData);

  const { amount, source } = depositeFormData;

  const formInputHandler = (event) => {
    const { name, value } = event.target;
    setdepositeFormData({ ...depositeFormData, [name]: value });
  };

  const HandleDeposite = (event) => {
    event.preventDefault();
    const date = new Date();
    const ids = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      id: date.getTime(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
    const expense = {
      id: ids.id,
      actionId: 1,
      reason: source,
      amount: parseFloat(amount),
      date: `${ids.day}/${ids.month}/${ids.year} - ${ids.hour}h : ${ids.minutes}min`,
    };
    depositeHandler(expense);
    setOpenedDepositeOpup(!openedDepositeOpup);
  };

  return (
    <>
      <h1>Dépot</h1>
      <br />
      <CloseButton onClick={() => setOpenedDepositeOpup(!openedDepositeOpup)}>
        X
      </CloseButton>
      <Form onSubmit={HandleDeposite}>
        <input
          type="number"
          name="amount"
          placeholder="$ amount"
          value={amount}
          onChange={(e) => formInputHandler(e)}
          min={1}
          required
        />
        <input
          type="text"
          placeholder="source"
          name="source"
          value={source}
          onChange={(e) => formInputHandler(e)}
          required
        />
        <AddIncomeButton>déposer</AddIncomeButton>
      </Form>
    </>
  );
};

export default AddIncomeForm;
