import { useState } from "react";
import { useSelector } from "react-redux";
import Expense from "../components/Expense";
import Modal from "../components/Modal";
import { expenseList } from "../data/testData";

const ExpenseList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  const expenseArr = expenseList.map((expense, ind) => {
    return <Expense key={ind} expense={expense} />;
  });
  return (
    <div className="mx-auto w-4/5 max-w-screen-lg">
      <h1 className="my-8">
        {currentUser ? `${currentUser.firstName}` : "User"}'s Expenses
      </h1>
      <button className="btn btn-outline" onClick={toggleModal}>
        Add New Expense
      </button>
      <div>{expenseArr}</div>
      {modal && <Modal toggleModal={toggleModal} />}
    </div>
  );
};

export default ExpenseList;
