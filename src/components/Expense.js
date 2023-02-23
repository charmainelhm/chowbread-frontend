import { sgdFormatter } from "../utils/helperFunctions";
import "../index.css";

const Expense = ({ expense }) => {
  const date = new Date(expense.createdAt);

  return (
    <div className="bg-white text-fuchsia-900 p-2 mb-4 rounded flex items-center gap-x-2 shadow-lg shadow-slate-400/50">
      <h2>{expense.description}</h2>
      <p>{date.toLocaleDateString()}</p>
      <p>{expense.remarks}</p>
      <p className="ml-auto text-2xl font-bold">
        {sgdFormatter.format(expense.amount)}
      </p>
      <p className={`tag ${expense.type}`}>{expense.type}</p>
    </div>
  );
};

export default Expense;
