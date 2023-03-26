import { combineReducers } from "redux";
import { expenseReducer } from "./expense/expense.reducer";
import { popupActionsReducer } from "./popup/popup.reducer";
import { totalMoneyReducer } from "./total-money/total-money.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  popup: popupActionsReducer,
  totalMoney: totalMoneyReducer,
  expenses: expenseReducer,
});
