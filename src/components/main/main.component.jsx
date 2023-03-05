import { useContext, useEffect, useReducer } from "react";
import "./main.style";
import {
  ButtonsContainer,
  DepositeTd,
  AddIncomeButton,
  MainPart,
  Table,
  TotalDiv,
  WithdrawTd,
  WithdrawButton,
} from "./main.style";
import AddIncomePopup from "../popup.component/popup.component";
import { PopupContext } from "../../contexts/popup.context";

const INITIAL_VALUES = {
  total: 0,
  expenses: [],
};

const Main = () => {
  const ACTIONS = {
    TOTAL: "total",
    DEPOSE: "deposite",
    WITHDRAW: "withdraw",
  };

  const expenseReducer = (state, action) => {
    const { expenses } = state;
    const { type, payload } = action;
    switch (type) {
      case ACTIONS.TOTAL:
        return { ...state, total: getTotal(payload.expenses) };
      case ACTIONS.DEPOSE:
        return { ...state, expenses: [...expenses, payload] };
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
          console.log(count);

          return count;
        }
        return count;
      }, 0);
      return total;
    }
    return totalA;
  };

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
      {openedDepositeOpup || openedWithdrawOpup ? (
        <AddIncomePopup depositeHandler={depositeHandler} />
      ) : (
        <i></i>
      )}
    </MainPart>
  );
};

export default Main;
