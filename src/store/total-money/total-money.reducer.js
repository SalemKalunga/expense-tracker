import { TOTAL_MONEY_ACTIONS } from "./total-money.action-types";

const INITIAL_TOTAL_MONEY = {
  total: 0,
};

export const totalMoneyReducer = (state = INITIAL_TOTAL_MONEY, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case TOTAL_MONEY_ACTIONS.SET_TOTAL_MONEY:
      return { ...state, total: payload };
    default:
      return state;
  }
};
