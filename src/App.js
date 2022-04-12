/* eslint-disable default-case */
import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATOR: "choose-operator",
  EQUALS: "equals",
};

function reducer(state, { type, payload }) {  // action => type
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {return state};
      if (payload.digit === "." && state.currentOperand.includes(".")) {return state};
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calc-container">
      <div className="output span">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <div className="span">
        <button>C</button>
        <button>DEL</button>
      </div>
      <div className="span">
      <OperationButton operation="+" dispatch={dispatch} />
      <OperationButton operation="−" dispatch={dispatch} />
      <OperationButton operation="×" dispatch={dispatch} />
      <OperationButton operation="÷" dispatch={dispatch} />
      </div>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />

      <div className="span">
      <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button>=</button>
      </div>
    </div>
  );
}

export default App;
