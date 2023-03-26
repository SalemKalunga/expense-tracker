import { POPUP_ACTIONS } from "./popup.action-types";

const INITIAL_OPOPUP_ACTIONS_STATE = {
  openedDepositeOpup: false,
  openedWithdrawOpup: false,
};

export const popupActionsReducer = (
  state = INITIAL_OPOPUP_ACTIONS_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case POPUP_ACTIONS.TOGGLE_DEPOSITE_FORM:
      return { ...state, openedDepositeOpup: payload };
    case POPUP_ACTIONS.TOGGLE_WITHDRAW_FORM:
      return { ...state, openedWithdrawOpup: payload };
    default:
      return state;
  }
};
