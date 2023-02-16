import { useSelector } from "react-redux";
import Expense from "../components/Expense";

const data = [
  {
    description: "this is a test expense",
    remarks: null,
    amount: 12.02,
    type: "EATOUT",
    createdAt: "2023-02-07T01:55:18.222Z",
  },
  {
    description: "this is a test expense 2",
    remarks: "Trying out the remarks",
    amount: 56.8,
    type: "GROCERY",
    createdAt: "2023-02-07T01:55:18.222Z",
  },
  {
    description: "this is a test expense 3",
    remarks: "Trying out the remarks",
    amount: 60.9,
    type: "DELIVERY",
    createdAt: "2023-02-07T01:55:18.222Z",
  },
  {
    description: "this is a test expense 3",
    remarks: "Trying out the remarks",
    amount: 60.9,
    type: "OTHERS",
    createdAt: "2023-02-07T01:55:18.222Z",
  },
];
const ExpenseList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const expenseArr = data.map((expense, ind) => {
    return <Expense key={ind} expense={expense} />;
  });
  return (
    <div className="mx-auto w-4/5 max-w-screen-lg">
      <h1 className="my-8">
        {currentUser ? `${currentUser.firstName}` : "User"}'s Expenses
      </h1>
      <button className="btn btn-outline">Add New Expense</button>
      <div>{expenseArr}</div>
    </div>
  );
};

export default ExpenseList;
