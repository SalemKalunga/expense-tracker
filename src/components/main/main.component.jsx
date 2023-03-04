import { useContext, useEffect, useReducer } from "react";
import "./main.style";
import { expenses } from "../../utils/data";
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
import AddIncomePopup from "../add_income_popup.component/add_income_popup.component";
import { DepositePopupContext } from "../../contexts/deposite.popup.context";
const Main = () => {
  const INITIAL_VALUES = {
    total: 0,
    expenses: expenses,
  };

  const ACTIONS = {
    TOTAL: "total",
    DEPOSE: "deposite",
    WITHDRAW: "withdraw",
  };

  const expenseReducer = (state, action) => {
    const { total, expenses } = state;
    const { type, payload } = action;
    switch (type) {
      case ACTIONS.TOTAL:
        return { ...state, total: getTotal(expenses) };
      default:
        break;
    }
  };

  const getTotal = (expenses) => {
    const withdras = [];
    const deposites = [];
    expenses.map((expense) => {
      expense.actionId ? deposites.push(expense) : withdras.push(expense);
    });
    let totalA = deposites.reduce((counter, deposite) => {
      return (counter = counter + deposite.amount);
    }, 0);
    const total = withdras.reduce((count, withdraw) => {
      if (totalA >= withdraw.amount) {
        count = totalA = totalA - withdraw.amount;
        return count;
      }
      return count;
    }, 0);

    return total;
  };

  const findTotal = () => {
    dispatch({ type: ACTIONS.TOTAL });
  };

  useEffect(() => {
    findTotal();
  }, expenses);

  const [{ total }, dispatch] = useReducer(expenseReducer, INITIAL_VALUES);
  const { openedDepositeOpup, setOpenedDepositeOpup } =
    useContext(DepositePopupContext);

  const toggleDepositePopup = () => {
    setOpenedDepositeOpup(!openedDepositeOpup);
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
          add income
        </AddIncomeButton>
        <WithdrawButton>withdraw</WithdrawButton>
      </ButtonsContainer>
      {openedDepositeOpup ? <AddIncomePopup /> : <i></i>}
    </MainPart>
  );
};

export default Main;
