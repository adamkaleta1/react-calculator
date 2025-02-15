import { useReducer } from 'react'
import './styles.css'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import { ACTIONS, evaluate, OPERATIONS, formatOperand } from './helpers'
import { Todos } from './Todos'

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:

      if (state.overwrite === true) {
        return {
          ...state,
          currentOperand: payload.digit === "." ? "0." : payload.digit,
          overwrite: false
        }
      }

      if (payload.digit === "0" && state.currentOperand === "0") {
        return "state";
      }
      if (payload.digit === ".") {
        if (!state.currentOperand) {
          return {
            ...state,
            currentOperand: "0."
          }
        }
        if (state.currentOperand.includes(".")) {
          return state
        }
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }


      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }


    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }

      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),

      }


    case ACTIONS.EVALUATE:
      if (state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
  }
}

// state = {
//   currentOperand: "2",
//   previousOperand: "3",
//   operation: "+",
//   overwrite: true/false - czy "=" zostało wciśnięte i trzeba zerować
// }

function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button className="span-one" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
        <OperationButton operation={OPERATIONS.DIVIDE} dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation={OPERATIONS.MULTIPLY} dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation={OPERATIONS.PLUS} dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation={OPERATIONS.MINUS} dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      </div>
      {/* <PlusMinus /> */}
      <Todos />
    </>
  )
}

export default App

