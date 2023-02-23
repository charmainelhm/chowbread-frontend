import axios from "axios";
import { API_URL } from "./util";

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

  return sgdFormatter.format(currentMonthExpenses);
};

export const calculateTotalBill = (billInfo) => {
  const { bill, gst, "service-charge": serviceCharge } = billInfo;
  const totalGst = bill * (gst / 100);
  const totalServiceCharge = bill * (serviceCharge / 100);
  const total = bill + totalGst + totalServiceCharge;
  return sgdFormatter.format(total || 0);
};

export const sgdFormatter = new Intl.NumberFormat("en-SG", {
  style: "currency",
  currency: "SGD",
});

export const checkValidUserSession = async (cookie) => {
  try {
    const res = await axios.get(`${API_URL}/session/user`, {
      headers: { access_token: cookie },
    });

    return res.data.validSession;
  } catch (err) {
    console.log(err);
  }
};

export const retrieveUserExpenses = async (userId, cookie) => {
  try {
    const res = await axios.get(`${API_URL}/expense/${userId}`, {
      headers: { access_token: cookie },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
