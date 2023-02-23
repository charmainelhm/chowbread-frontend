import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Expense from "../components/Expense";
import Modal from "../components/Modal";
import {
  updateUserExpenseList,
  loginSuccess,
  logout,
} from "../redux/userSlice";
import { useNavigate } from "react-router";
import {
  calculateCurrentMonthExpense,
  checkValidUserSession,
  getCurrentMonth,
  retrieveUserExpenses,
} from "../utils/helperFunctions";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { API_URL } from "../config";
import { TbLogout, TbPlus } from "react-icons/tb";

const ExpenseList = ({ cookies, removeCookie }) => {
  const { currentUser, userExpenses } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/session/${currentUser.id}`,
        {},
        {
          headers: { access_token: cookies.access_token },
        }
      );
      if (res.data.logOutSuccess) {
        removeCookie("access_token", {
          path: "/",
          sameSite: "lax",
          secure: "true",
        });

        dispatch(logout());
        // console.log("Logout success!");
        navigate(0);
      }
    } catch (err) {
      console.log(err);
    }
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
        <button className="btn" onClick={handleLogout}>
          <TbLogout className="btn-icon" />
          Logout
        </button>
      </div>
      <h3 className="mb-4">
        Total Food Expenses for {getCurrentMonth()}:{" "}
        {calculateCurrentMonthExpense(expenses)}
      </h3>
      <div className="text-right mb-3">
        <button className="btn btn-solid" onClick={toggleModal}>
          <TbPlus className="btn-icon" />
          Add New Expense
        </button>
      </div>
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
