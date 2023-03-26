import { useEffect } from "react";
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
import {
  db,
  deleteHandler,
  EXPENSES_COLLECTION_REF,
  usersTotalMoneyCollectionRef,
} from "../../utils/firebase";
import { addDoc, doc, getDocs, setDoc } from "firebase/firestore";
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
import { fetchTotalAmount } from "../../store/total-money/total-money.actions";
import { selectTotal } from "../../store/total-money/total-money.selectors";
import { selectExpenses } from "../../store/expense/expense.selectors";
import { fetchExpensesAsync } from "../../store/expense/expense.actions";

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);

  const _dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    !currentUser && navigate("/");
  }, [currentUser, navigate]);

  currentUser && fetchTotalAmount(_dispatch, currentUser.uid);

  const totalMoney = useSelector(selectTotal);

  const expensesData = useSelector(selectExpenses);

  const getUsersExpenses = async () => {
    currentUser && fetchExpensesAsync(_dispatch, currentUser.uid);
  };

  useEffect(() => {
    currentUser && fetchExpensesAsync(_dispatch, currentUser.uid);
  }, [_dispatch, currentUser]);

  const addNewExpense = async (newExpense) => {
    await addDoc(EXPENSES_COLLECTION_REF, newExpense);
    console.log("THIS EXPENSE: ", newExpense);

    const totalUserMoneyDocs = await getDocs(usersTotalMoneyCollectionRef);
    const allTotalDocs = totalUserMoneyDocs.docs.map((doc) => ({
      doc: doc.data(),
      docId: doc.id,
    }));

    const usersTotals = allTotalDocs.filter(
      (obj) => obj.doc.userId === currentUser.uid
    );

    let sommedTotal = 0;
    if (newExpense.actionId === 0) {
      totalMoney > newExpense.amount
        ? (sommedTotal = totalMoney - newExpense.amount)
        : (sommedTotal = totalMoney);
    } else {
      sommedTotal = totalMoney + newExpense.amount;
    }
    const docRef = doc(db, "totals-somes", usersTotals[0].docId);
    const updatedTotal = { ...usersTotals[0].doc, total: sommedTotal };
    await setDoc(docRef, updatedTotal);

    getUsersExpenses();
  };

  const openedDepositeOpup = useSelector(selectDepositePopupStateValue);
  const openedWithdrawOpup = useSelector(selectWithdrawPopupStateValue);
  const toggleDepositePopup = () => {
    _dispatch(toggleDepositeFrom(!openedDepositeOpup));
  };
  const toggleWithdrawPopup = () => {
    _dispatch(toggleWithdrawFrom(!openedWithdrawOpup));
  };

  // DELETE HANDLER
  const deleteExpense = async (docId) => {
    deleteHandler(docId, getUsersExpenses);
  };
  return (
    <>
      <MainPart>
        <TotalDiv>
          <h2>Total: ${totalMoney}</h2>
        </TotalDiv>
        <Table>
          <tbody>
            {expensesData.map((expenseObj) => {
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
                        <button onClick={() => deleteExpense(expenseObj.docId)}>
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
                        <button onClick={() => deleteExpense(expenseObj.docId)}>
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
    </>
  );
};

export default Dashboard;
