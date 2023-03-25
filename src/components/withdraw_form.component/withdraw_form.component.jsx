import React, { useState } from "react";
import { WithdrawButton } from "../dashboard/dashboard.style";
import {
  CloseButton,
  Form,
} from "../add_income_form.component/add_income_form.style";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selectors";
import { selectWithdrawPopupStateValue } from "../../store/popup/popup.selectors";
import { toggleWithdrawFrom } from "../../store/popup/popup.actions";

const WithdrawForm = ({ withdrawHandler }) => {
  const openedWithdrawOpup = useSelector(selectWithdrawPopupStateValue);
  const dispatch = useDispatch();

  const formData = {
    amount: 0,
    source: "",
  };
  const [withdrawFormData, setWithdrawFormData] = useState(formData);
  const currentUser = useSelector(selectCurrentUser);
  const { amount, source } = withdrawFormData;

  const formInputHandler = (event) => {
    const { name, value } = event.target;
    setWithdrawFormData({ ...withdrawFormData, [name]: value });
  };

  const HandleWithdraw = async (event) => {
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
      actionId: 0,
      reason: source,
      userId: currentUser.uid,
      amount: parseFloat(amount),
      date: `${ids.day}-${ids.month}-${ids.year}`,
    };
    withdrawHandler(expense);
    dispatch(toggleWithdrawFrom(!openedWithdrawOpup));
  };
  return (
    <>
      <h1>Retrait</h1>
      <br />
      <CloseButton
        onClick={() => dispatch(toggleWithdrawFrom(!openedWithdrawOpup))}
      >
        X
      </CloseButton>
      <Form onSubmit={HandleWithdraw}>
        <input
          type="number"
          name="amount"
          placeholder="$ amount"
          value={amount}
          onChange={(e) => formInputHandler(e)}
          required
          min={1}
        />
        <input
          type="text"
          placeholder="source"
          name="source"
          value={source}
          onChange={(e) => formInputHandler(e)}
          required
        />
        <WithdrawButton>retirer</WithdrawButton>
      </Form>
    </>
  );
};

export default WithdrawForm;
