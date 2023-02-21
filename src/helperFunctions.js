export const toTitleCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getCurrentMonth = () =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date());

const getMonth = (isoString = "") => {
  const date = new Date(isoString);
  return date.getMonth();
};

export const calculateCurrentMonthExpense = (expenseArr) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const currentMonthExpenses = expenseArr.reduce((sum, expense) => {
    const createdMonth = getMonth(expense.createdAt);
    return createdMonth === currentMonth ? sum + expense.amount : sum;
  }, 0);

  return currentMonthExpenses;
};
