import { TOTAL_MONEY_ACTIONS } from "./total-money.action-types";

const INITIAL_TOTAL_MONEY = {
  total: 0,
  isLoading: false,
  error: null,
  isAdding: false,
};

export const totalMoneyReducer = (state = INITIAL_TOTAL_MONEY, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case TOTAL_MONEY_ACTIONS.FETCH_TOTAL_MONEY_START:
      return { ...state, isLoading: true };
    case TOTAL_MONEY_ACTIONS.FETCH_TOTAL_MONEY_SUCCESS:
      return { ...state, isLoading: false, total: payload };
    case TOTAL_MONEY_ACTIONS.FETCH_TOTAL_MONEY_FAILED:
      return { ...state, isLoading: false, error: payload };
    case TOTAL_MONEY_ACTIONS.ADD_TO_TOTAL_START:
      return { ...state, isAdding: true };
    case TOTAL_MONEY_ACTIONS.ADD_TO_TOTAL_SUCCESS:
      return { ...state, isAdding: false };
    default:
      return state;
  }
};
