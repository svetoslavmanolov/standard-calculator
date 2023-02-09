import { useReducer } from 'react';
import DigitButton from './DigitButton';
import './style.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  PERCENTAGE: 'percentage',
  INVERT: 'invert',
  SQUARE_ROOT: 'square-root',
  SQUARED: 'squared'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:

      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }

      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }

  }
}

const INTEGER_FORMATTED = new Intl.NumberFormat('en-us', {maximumFractionDigits: 0});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTED.format(integer);
  return `${INTEGER_FORMATTED.format(integer)}.${decimal}`;
}

function App() {

  const [{ currentOperand, previousOperand, operaion }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operaion}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>x²</button>
      <DigitButton digit='7' dispatch={dispatch} />
      <button>8</button>
      <button>9</button>
      <button>*</button>
      <button>+/-</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>%</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>-</button>
      <button>√</button>
      <button>0</button>
      <button>.</button>
      <button>00</button>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
