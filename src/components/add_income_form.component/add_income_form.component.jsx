import React, { useState } from "react";
import { AddIncomeButton } from "../dashboard/dashboard.style";
import { CloseButton, Form } from "./add_income_form.style";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selectors";
import { selectDepositePopupStateValue } from "../../store/popup/popup.selectors";
import { toggleDepositeFrom } from "../../store/popup/popup.actions";
// import { addNewExpense } from "../../utils/firebase";
const AddIncomeForm = ({ depositeHandler }) => {
  const currentUser = useSelector(selectCurrentUser);
  const openedDepositeOpup = useSelector(selectDepositePopupStateValue);
  const dispatch = useDispatch();

  const formData = {
    source: "",
    amount: 0,
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
      userId: currentUser.uid,
      reason: source,
      amount: parseFloat(amount),
      date: `${ids.day}-${ids.month}-${ids.year}`,
    };
    // depositeHandler(expense);
    depositeHandler(expense);
    dispatch(toggleDepositeFrom(!openedDepositeOpup));
  };

  return (
    <>
      <h1>Dépot</h1>
      <br />
      <CloseButton
        onClick={() => dispatch(toggleDepositeFrom(!openedDepositeOpup))}
      >
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
