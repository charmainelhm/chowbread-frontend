import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Expense from "../components/Expense";
import Modal from "../components/Modal";
import { updateUserExpenseList, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router";
import {
  calculateCurrentMonthExpense,
  checkValidUserSession,
  getCurrentMonth,
  retrieveUserExpenses,
} from "../helperFunctions";
import jwt_decode from "jwt-decode";

const ExpenseList = ({ cookies }) => {
  const { currentUser, userExpenses } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setExpenses(userExpenses);
  }, [userExpenses]);

  useEffect(() => {
    const retrieveExpenses = async () => {
      const expenseList = await retrieveUserExpenses(
        currentUser.id,
        cookies.access_token
      );
      dispatch(updateUserExpenseList(expenseList));
    };

    if (currentUser) {
      retrieveExpenses();
    }
  }, [currentUser]);

  useEffect(() => {
    const retrieveData = async () => {
      const cookie = cookies.access_token;
      const validSession = await checkValidUserSession(cookie);
      if (validSession) {
        const userData = jwt_decode(cookie);
        dispatch(loginSuccess(userData));
      } else navigate("/signin");
    };
    if (!cookies.access_token) {
      navigate("/signin");
    } else retrieveData();
  }, []);

  const expenseArr = expenses.map((expense, ind) => {
    return <Expense key={ind} expense={expense} />;
  });
  return (
    <div className="mx-auto w-4/5 max-w-screen-lg">
      <div className="flex items-center justify-between my-8">
        <h1>
          {currentUser ? `${currentUser.firstName}` : "User"}'s Food Expenses
        </h1>
        <button className="btn btn-outline" onClick={toggleModal}>
          Add New Expense
        </button>
      </div>
      <h3 className="mb-4">
        Total Food Expenses for {getCurrentMonth()}:{" "}
        {calculateCurrentMonthExpense(expenses)}
      </h3>
      <div>{expenseArr}</div>
      {modal && (
        <Modal
          toggleModal={toggleModal}
          userExpenses={userExpenses}
          cookies={cookies}
          setExpenses={setExpenses}
        />
      )}
    </div>
  );
};

export default ExpenseList;
