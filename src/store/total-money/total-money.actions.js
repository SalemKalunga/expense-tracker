import { addDoc, getDocs } from "firebase/firestore";
import { usersTotalMoneyCollectionRef } from "../../utils/firebase";
import { TOTAL_MONEY_ACTIONS } from "./total-money.action-types";

export const fetchTotalStart = () => ({
  type: TOTAL_MONEY_ACTIONS.FETCH_TOTAL_MONEY_START,
});

export const fetchTotalAmountSuccess = (total) => ({
  type: TOTAL_MONEY_ACTIONS.FETCH_TOTAL_MONEY_SUCCESS,
  payload: total,
});
export const fetchTotalAmountFailed = (error) => ({
  type: TOTAL_MONEY_ACTIONS.FETCH_TOTAL_MONEY_SUCCESS,
  payload: error,
});

export const fetchTotalAmount = async (dispatch, userId) => {
  dispatch(fetchTotalStart);
  try {
    const totalUserMoneyDocs = await getDocs(usersTotalMoneyCollectionRef);
    const allTotalDocs = totalUserMoneyDocs.docs.map((doc) => doc.data());
    const usersTotals = allTotalDocs.filter((obj) => obj.userId === userId);

    if (usersTotals.length > 0) {
      dispatch(fetchTotalAmountSuccess(usersTotals[0].total));
    } else {
      await addDoc(usersTotalMoneyCollectionRef, {
        total: 0,
        userId,
      });
      dispatch(fetchTotalAmountSuccess(0));
    }
  } catch (error) {
    dispatch(fetchTotalAmountFailed(error));
  }
};
