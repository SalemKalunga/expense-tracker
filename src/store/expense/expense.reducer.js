import { EXPENSE_ACTIONS } from "./expense.action-types";

const INITIAL_EXPENSE_DATA = {
  expenses: [],
  isLoading: false,
  error: null,
};

export const expenseReducer = (state = INITIAL_EXPENSE_DATA, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case EXPENSE_ACTIONS.FETCH_EXPENSES_START:
      return { ...state, isLoading: true };
    case EXPENSE_ACTIONS.FETCH_EXPENSES_SUCCESS:
      return { ...state, expenses: payload, isLoading: false };
    case EXPENSE_ACTIONS.FETCH_EXPENSES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
