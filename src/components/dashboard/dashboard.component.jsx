import { useContext, useEffect, useReducer, useState } from "react";
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
  ErrorMessage,
  SuccessMessage,
} from "./dashboard.style";
import AddIncomePopup from "../popup.component/popup.component";
import { PopupContext } from "../../contexts/popup.context";
import { UserContext } from "../../contexts/user_context.component";
import { useNavigate } from "react-router-dom";
import { EXPENSES_COLLECTION_REF } from "../../utils/firebase";
import { getDocs } from "firebase/firestore";

const INITIAL_VALUES = {
  total: 0,
  expenses: [],
};

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);

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
  const initialAlerts = {
    error: false,
    success: false,
  };

  const [alerts, setAlerts] = useState(initialAlerts);
  const toggleAlerts = (alrt) => {
    if (alrt === 1) {
      setAlerts({ ...alerts, error: !alerts.error });
    } else {
      setAlerts({ ...alerts, success: !alerts.success });
    }
  };
  const [exepensesData, setExepensesData] = useState(INITIAL_VALUES.expenses);

  const expenseReducer = (state, action) => {
    const { expenses, total } = state;
    const { type, payload } = action;
    switch (type) {
      case ACTIONS.TOTAL:
        return { ...state, total: getTotal(payload.expenses) };
      case ACTIONS.SET_EXPENSES:
        return { ...state, expenses: payload };
      case ACTIONS.DEPOSE:
        return { ...state, expenses: [...expenses, payload] };
      case ACTIONS.WITHDRAW:
        if (payload.amount < total) {
          return { ...state, expenses: [...expenses, payload] };
        }
        toggleAlerts(1);
        return state;
      default:
        return state;
    }
  };

  const getTotal = (expenses) => {
    const withdras = [];
    const deposites = [];
    expenses.map((expense) => {
      return expense.actionId
        ? deposites.push(expense)
        : withdras.push(expense);
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
      return doc.data();
    });
    setExepensesData(docsArray);
  };

  useEffect(() => {
    getExpensesDataFromFirestore();
  }, []);

  useEffect(() => {
    const currentUsersData = exepensesData.filter((expense) => {
      if (!currentUser) return {};
      return expense.userId === currentUser.uid;
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

  const {
    openedDepositeOpup,
    setOpenedDepositeOpup,
    openedWithdrawOpup,
    setOpenedWithdrawOpup,
  } = useContext(PopupContext);

  const toggleDepositePopup = () => {
    setOpenedDepositeOpup(!openedDepositeOpup);
  };
  const toggleWithdrawPopup = () => {
    setOpenedWithdrawOpup(!openedWithdrawOpup);
  };

  const depositeHandler = (user) => {
    dispatch({ type: ACTIONS.DEPOSE, payload: user });
  };
  const withdrawHandler = (user) => {
    dispatch({ type: ACTIONS.WITHDRAW, payload: user });
  };
  return (
    <MainPart>
      <TotalDiv>
        <h2>Total: ${total}</h2>
      </TotalDiv>
      <Table>
        <tbody>
          {expenses.map(({ id, actionId, amount, date, reason }) => {
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
      {alerts.error ? (
        <ErrorMessage>Pas assez d'argent✋😊</ErrorMessage>
      ) : (
        <></>
      )}
      {alerts.success ? (
        <SuccessMessage>Argent, Argent!🤑</SuccessMessage>
      ) : (
        <></>
      )}
      {openedDepositeOpup || openedWithdrawOpup ? (
        <AddIncomePopup
          withdrawHandler={withdrawHandler}
          depositeHandler={depositeHandler}
        />
      ) : (
        <i></i>
      )}
    </MainPart>
  );
};

export default Dashboard;
