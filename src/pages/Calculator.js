import { useState } from "react";
import { calculatorInputs } from "../data/formData";
import { toTitleCase } from "../helperFunctions";

const Calculator = () => {
  const [totalBill, setTotalBill] = useState(0);

  const calculator = calculatorInputs.map((input, ind) => {
    input.label = input.name
      .split("-")
      .map((word) => toTitleCase(word))
      .join(" ");

    const { id, symbol, ...inputData } = input;
    return (
      <>
        <label for={inputData.name}>{inputData.label}</label>
        <input key={ind} id={inputData.name} {...inputData} />
      </>
    );
  });
  return (
    <>
      <h1>Bill Calculator</h1>
      <div>{calculator}</div>
      <p>Total Bill: {totalBill}</p>
    </>
  );
};

export default Calculator;
