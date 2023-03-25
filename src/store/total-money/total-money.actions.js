import { TOTAL_MONEY_ACTIONS } from "./total-money.action-types";

export const setTotalMoney = (total) => ({
  type: TOTAL_MONEY_ACTIONS.SET_TOTAL_MONEY,
  payload: total,
});
  
