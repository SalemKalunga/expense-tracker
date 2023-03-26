import { POPUP_ACTIONS } from "./popup.action-types";

export const toggleDepositeFrom = (bool) => ({
  type: POPUP_ACTIONS.TOGGLE_DEPOSITE_FORM,
  payload: bool,
});

export const toggleWithdrawFrom = (bool) => ({
  type: POPUP_ACTIONS.TOGGLE_WITHDRAW_FORM,
  payload: bool,
});
