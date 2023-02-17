import { createExpenseInputs } from "../data/formData";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { expenseType } from "../data/expenseType";
import { toTitleCase } from "../helperFunctions";

const Modal = ({ toggleModal }) => {
  const [expenseValues, setExpenseValues] = useState({
    description: "",
    remarks: "",
    amount: 0,
    type: "OTHERS",
  });

  const onInputChange = (e) => {
    setExpenseValues({
      ...expenseValues,
      [e.target.name]: e.target.value,
    });
  };

  const onTypeChange = (e) => {
    setExpenseValues({
      ...expenseValues,
      type: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(expenseValues);
  };
  return (
    <div className="modal">
      <div
        className="fill-screen bg-black opacity-80"
        onClick={toggleModal}
      ></div>
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
          <select value={expenseValues.type} onChange={onTypeChange}>
            {expenseType.map((type) => (
              <option value={type}>{toTitleCase(type)}</option>
            ))}
          </select>
          <button className="btn btn-solid mt-2" type="submit">
            Add Expense
          </button>
        </form>
        <button className="btn" onClick={toggleModal}>
          Close modal
        </button>
      </div>
    </div>
  );
};

export default Modal;
