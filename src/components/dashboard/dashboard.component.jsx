import { useEffect, useReducer, useState } from "react";
import "./dashboard.style";
import {
  ButtonsContainer,
  DepositeTd,
  AddIncomeButton,
  MainPart,
  Table,
  TotalDiv,
  WithdrawTd,
  WithdrawButton,
} from "./dashboard.style";
import PopupComponent from "../popup.component/popup.component";
import { useNavigate } from "react-router-dom";
import { deleteHandler, EXPENSES_COLLECTION_REF } from "../../utils/firebase";
import { addDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selectors";
import {
  selectDepositePopupStateValue,
  selectWithdrawPopupStateValue,
} from "../../store/popup/popup.selectors";
import {
  toggleDepositeFrom,
  toggleWithdrawFrom,
} from "../../store/popup/popup.actions";

const INITIAL_VALUES = {
  total: 0,
  expenses: [],
};

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);

  const _dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    !currentUser && navigate("/");
  }, [currentUser, navigate]);

  const ACTIONS = {
    TOTAL: "total",
    DEPOSE: "deposite",
    WITHDRAW: "withdraw",
    SET_EXPENSES: "set-expenses",
  };

  const [exepensesData, setExepensesData] = useState(INITIAL_VALUES.expenses);

  const expenseReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTIONS.TOTAL:
        return { ...state, total: getTotal(payload.expenses) };
      case ACTIONS.SET_EXPENSES:
        return { ...state, expenses: payload };
      default:
        return state;
    }
  };

  const getTotal = (expenses) => {
    const withdras = [];
    const deposites = [];
    expenses.map((expense) => {
      return expense.doc.actionId
        ? deposites.push(expense.doc)
        : withdras.push(expense.doc);
    });
    let totalA = deposites.reduce((counter, deposite) => {
      return (counter = counter + deposite.amount);
    }, 0);
    if (withdras.length) {
      const total = withdras.reduce((count, withdraw) => {
        if (totalA >= withdraw.amount) {
          count = totalA = totalA - withdraw.amount;
          return count;
        }
        return count;
      }, 0);
      return total;
    }
    return totalA;
  };

  const getExpensesDataFromFirestore = async () => {
    const expenesesDocs = await getDocs(EXPENSES_COLLECTION_REF);
    const docsArray = expenesesDocs.docs.map((doc) => {
      return { doc: doc.data(), docId: doc.id };
    });
    setExepensesData(docsArray);
  };

  useEffect(() => {
    getExpensesDataFromFirestore();
  }, []);

  const addNewExpense = async (newExpense) => {
    await addDoc(EXPENSES_COLLECTION_REF, newExpense);
    getExpensesDataFromFirestore();
  };

  // USE EFFECT TO SET EXEPENSES == firestore data
  useEffect(() => {
    const currentUsersData = exepensesData.filter((expense) => {
      if (!currentUser) return {};
      return expense.doc.userId === currentUser.uid;
    });
    const updateExpensesArray = () => {
      dispatch({
        type: ACTIONS.SET_EXPENSES,
        payload: currentUsersData,
      });
    };

    updateExpensesArray();
  }, [exepensesData, ACTIONS.SET_EXPENSES, currentUser]);

  const [{ total, expenses }, dispatch] = useReducer(
    expenseReducer,
    INITIAL_VALUES
  );

  useEffect(() => {
    const totalFunction = () =>
      dispatch({ type: ACTIONS.TOTAL, payload: { expenses } });
    totalFunction();
  }, [expenses, ACTIONS.TOTAL]);

  const openedDepositeOpup = useSelector(selectDepositePopupStateValue);
  const openedWithdrawOpup = useSelector(selectWithdrawPopupStateValue);
  const toggleDepositePopup = () => {
    _dispatch(toggleDepositeFrom(!openedDepositeOpup));
  };
  const toggleWithdrawPopup = () => {
    _dispatch(toggleWithdrawFrom(!openedWithdrawOpup));
  };

  // DELETE HANDLER

  return (
    <MainPart>
      <TotalDiv>
        <h2>Total: ${total}</h2>
      </TotalDiv>
      <Table>
        <tbody>
          {expenses.map((expenseObj) => {
            const { doc } = expenseObj;
            const { id, actionId, amount, date, reason } = doc;
            // console.log(expenseObj.docId);
            return (
              <tr key={id}>
                {actionId ? (
                  <>
                    <DepositeTd>
                      <p>+ ${amount}</p>
                    </DepositeTd>
                    <DepositeTd>
                      <p>{date}</p>
                    </DepositeTd>
                    <DepositeTd>
                      <p>{reason}</p>
                    </DepositeTd>
                    <DepositeTd>
                      <button
                        onClick={() =>
                          deleteHandler(
                            expenseObj.docId,
                            getExpensesDataFromFirestore
                          )
                        }
                      >
                        X
                      </button>
                    </DepositeTd>
                  </>
                ) : (
                  <>
                    <WithdrawTd>
                      <p>- ${amount}</p>
                    </WithdrawTd>
                    <WithdrawTd>
                      <p>{date}</p>
                    </WithdrawTd>
                    <WithdrawTd>
                      <p>{reason}</p>
                    </WithdrawTd>
                    <DepositeTd>
                      <button
                        onClick={() =>
                          deleteHandler(
                            expenseObj.docId,
                            getExpensesDataFromFirestore
                          )
                        }
                      >
                        X
                      </button>
                    </DepositeTd>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ButtonsContainer>
        <AddIncomeButton onClick={toggleDepositePopup}>
          effectuer un dépot
        </AddIncomeButton>
        <WithdrawButton onClick={toggleWithdrawPopup}>retirer</WithdrawButton>
      </ButtonsContainer>
      {/* {alerts.error ? (
        <ErrorMessage>Pas assez d'argent✋😊</ErrorMessage>
      ) : (
        <></>
      )}
      {alerts.success ? (
        <SuccessMessage>Argent, Argent!🤑</SuccessMessage>
      ) : (
        <></>
      )} */}
      {openedDepositeOpup || openedWithdrawOpup ? (
        <PopupComponent
          withdrawHandler={addNewExpense}
          depositeHandler={addNewExpense}
        />
      ) : (
        <i></i>
      )}
    </MainPart>
  );
};

export default Dashboard;
