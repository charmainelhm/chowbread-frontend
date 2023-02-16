const Expense = ({ expense, key }) => {
  return (
    <div key={key}>
      <h2>{expense.description}</h2>
      <p>{expense.remarks}</p>
      <p>Amount: {expense.amount}</p>
      <p>Expense type: {expense.type}</p>
    </div>
  );
};

export default Expense;
