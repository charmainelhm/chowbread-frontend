import { useEffect, useState } from "react";
import { calculatorInputs } from "../data/formData";
import { calculateTotalBill, toTitleCase } from "../helperFunctions";
import illustration from "../assets/Pasta-pana.png";
import { defaultCalcValue } from "../util";

const Calculator = () => {
  const [totalBill, setTotalBill] = useState(0);
  const [inputValues, setInputValues] = useState(defaultCalcValue);

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value) || e.target.value;
    setInputValues({ ...inputValues, [e.target.name]: value });
  };

  const resetCalcValue = () => {
    setInputValues(defaultCalcValue);
  };

  useEffect(() => {
    const total = calculateTotalBill(inputValues);
    setTotalBill(total);
  }, [inputValues]);

  const calculator = calculatorInputs.map((input, ind) => {
    input.label = input.name
      .split("-")
      .map((word) => toTitleCase(word))
      .join(" ");

    const { id, symbol, ...inputData } = input;
    return (
      <div key={ind}>
        <label className="calculator-label" htmlFor={inputData.name}>
          {inputData.label}
        </label>
        <input
          className="calculator-input"
          id={inputData.name}
          {...inputData}
          value={inputValues[inputData.name]}
          onChange={handleInputChange}
        />
      </div>
    );
  });
  return (
    <>
      <h1 className="text-center mt-4 mb-2">Bill Calculator</h1>
      <p className="text-center mb-4">
        Trouble splitting your bill when eating out with your friends? Use this
        calculator!
      </p>
      <div className="w-11/12 max-w-4xl mx-auto grid grid-cols-auto-fit gap-x-3">
        <div className="text-center">
          <img src={illustration} />
          <a className="opacity-60" href="https://storyset.com/people">
            People illustrations by Storyset
          </a>
        </div>
        <div className="bg-slate-900 p-4 rounded flex flex-col gap-y-4">
          {calculator}
          <div className="bg-slate-800 grow rounded p-4 flex flex-col justify-between">
            <div className="flex justify-between text-2xl">
              <p className="font-semibold">Total </p>
              <p className="font-bold"> {totalBill}</p>
            </div>
            <button
              onClick={resetCalcValue}
              className="btn btn-solid w-full text-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
