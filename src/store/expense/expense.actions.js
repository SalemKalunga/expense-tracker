import { getDocs } from "firebase/firestore";
import { EXPENSES_COLLECTION_REF } from "../../utils/firebase";
import { EXPENSE_ACTIONS } from "./expense.action-types";

export const fetchExpensesStart = () => ({
  type: EXPENSE_ACTIONS.FETCH_EXPENSES_START,
});
export const fetchExpensesSuccess = (expenses) => ({
  type: EXPENSE_ACTIONS.FETCH_EXPENSES_SUCCESS,
  payload: expenses,
});
export const fetchExpensesFailed = (error) => ({
  type: EXPENSE_ACTIONS.FETCH_EXPENSES_START,
  payload: error,
});

export const fetchExpensesAsync = async (dispatch, uid) => {
  dispatch(fetchExpensesStart());
  try {
    const expensesData = await getDocs(EXPENSES_COLLECTION_REF);

    const docsArray = expensesData.docs.map((doc) => {
      return { doc: doc.data(), docId: doc.id };
    });

    const usersExpenses = docsArray.filter(
      (expense) => expense.doc.userId === uid
    );

    dispatch(fetchExpensesSuccess(usersExpenses));
  } catch (error) {
    dispatch(fetchExpensesFailed(error));
  }
};
