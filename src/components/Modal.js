import { createExpenseInputs } from "../data/formData";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { expenseType } from "../data/expenseType";
import { toTitleCase } from "../helperFunctions";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { API_URL } from "../util";
import { useDispatch } from "react-redux";
import { updateUserExpenseList } from "../redux/userSlice";

const Modal = ({ toggleModal, userExpenses, cookies, setExpenses }) => {
  const dispatch = useDispatch();
  const [expenseValues, setExpenseValues] = useState({
    description: "",
    remarks: "",
    amount: 0,
    type: "OTHERS",
  });

  const onInputChange = (e) => {
    setExpenseValues({
      ...expenseValues,
      [e.target.name]:
        e.target.name === "amount"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };

  const onTypeChange = (e) => {
    setExpenseValues({
      ...expenseValues,
      type: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(expenseValues);
    toggleModal();
    try {
      const res = await axios.post(`${API_URL}/expense/`, expenseValues, {
        headers: { access_token: cookies.access_token },
      });

      const expenses = [...userExpenses, res.data];

      dispatch(updateUserExpenseList(expenses));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modal">
      <div className="fill-screen bg-black opacity-80"></div>
      <div className="modal-content">
        <h2 className="mb-3">Add a New Expense</h2>
        <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
          {createExpenseInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={expenseValues[input.name]}
              onChange={onInputChange}
            />
          ))}
          <label className="font-semibold" htmlFor="expense-type">
            Expense Type
          </label>
          <select
            name="expense-type"
            className="bg-slate-100 py-2"
            value={expenseValues.type}
            onChange={onTypeChange}
          >
            {expenseType.map((type, ind) => (
              <option key={ind} value={type}>
                {toTitleCase(type)}
              </option>
            ))}
          </select>

          <button className="btn btn-solid-dark mt-2 self-end" type="submit">
            Add Expense
          </button>
        </form>
        <button className="btn modal-btn" onClick={toggleModal}>
          <GrClose />
        </button>
      </div>
    </div>
  );
};

export default Modal;
