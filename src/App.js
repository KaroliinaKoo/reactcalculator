/* eslint-disable default-case */
import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATOR: "choose-operator",
  EQUALS: "equals",
};

function reducer(state, { type, payload }) {
  // action => type
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overrideCurrent === true) {
        return {
          ...state,
          currentOperand: payload.digit,
          overrideCurrent: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand == null) {return state}
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATOR:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
        // if currently no numbers or an operator is already chosen,
        //... do not accept operators
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.operation,
        };
        //pass current state into previous operand, then clear current operand
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };
    case ACTIONS.CLEAR:
      return {
        ...state, currentOperand:'0',
        previousOperand:null,
        operation:null,
      };
    case ACTIONS.EQUALS:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      //if missing operation, current or previous operands (numbers): do not evaluate
      return {
        ...state,
        overrideCurrent: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overrideCurrent === true)
        return {
          ...state,
          overrideCurrent: false,
          currentOperand: null,
        };
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        //if only one number is left, remove it
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1), //default: remove last number
      };
  }
}

//as default, calculate current calculation before adding more numbers =>
const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const current = parseFloat(currentOperand);
  const previous = parseFloat(previousOperand); //convert strings into numbers
  if (isNaN(previous) || isNaN(current)) return "";
  //if not a number, return empty string (= do not calculate)
  let calculation = "";
  switch (operation) {
    case "+":
      calculation = previous + current;
      break;
    case "−":
      calculation = previous - current;
      break;
    case "×":
      calculation = previous * current;
      break;
    case "÷":
      calculation = previous / current;
      break;
  }
  return calculation.toString(); //convert calculation into string, and return it
};

const INT_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [int, decimal] = operand.split(".");
  if (decimal == null) return INT_FORMATTER.format(int);
  return `${INT_FORMATTER.format(int)}.${decimal}`;
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
          {formatOperand(previousOperand)}
          {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <div className="span">
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>C</button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
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
        <button onClick={() => dispatch({ type: ACTIONS.EQUALS })}>=</button>
      </div>
    </div>
  );
}

export default App;
