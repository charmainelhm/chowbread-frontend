import { useSelector } from "react-redux";

const ExpenseList = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <h1>
      User Expenses Page {currentUser ? `Hello ${currentUser.firstName}` : ""}
    </h1>
  );
};

export default ExpenseList;
