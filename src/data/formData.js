export const loginInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
];

export const createExpenseInputs = [
  {
    id: 1,
    name: "description",
    type: "text",
    placeholder: "Expense Description",
    errorMessage: "Required field",
    required: true,
  },
  {
    id: 2,
    name: "remarks",
    type: "text",
    placeholder: "Remarks",
    errorMessage: "",
  },
  {
    id: 3,
    name: "amount",
    type: "number",
    step: "any",
    placeholder: "Amount Spent",
    errorMessage: "Required Field",
    required: true,
  },
];

export const calculatorInputs = [
  {
    id: 1,
    name: "bill",
    symbol: "$",
    type: "number",
    step: "any",
    placeholder: "0",
  },
  {
    id: 2,
    name: "gst",
    symbol: "%",
    type: "number",
    step: "any",
    placeholder: "0",
  },
  {
    id: 3,
    name: "service-charge",
    symbol: "%",
    type: "number",
    step: "any",
    placeholder: "0",
  },
];
