import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Expense from "../components/Expense";
import Modal from "../components/Modal";
import { expenseList } from "../data/testData";
import { API_URL } from "../util";
import { updateUserExpenseList } from "../redux/userSlice";
import { useNavigate } from "react-router";

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
    if (!currentUser) navigate("/signin");
    const retrieveUserExpenses = async () => {
      try {
        const res = await axios.get(`${API_URL}/expense/${currentUser.id}`, {
          headers: { access_token: cookies.access_token },
        });

        if (res) {
          dispatch(updateUserExpenseList(res.data));
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (currentUser) retrieveUserExpenses();
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
