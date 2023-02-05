import { useReducer } from 'react';

// initial states
const initialInput = {
  value: '',
  isTouched: false,
};

// the name is stateReducer as it hold the state for the reducer
const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }

  return initialInput;
};

// use useReducer() if you're updating a state based on another state, which is not the case here, so it's not necessarily
const useInput = (validateValue) => {
  const [inputState, dispatchInput] = useReducer(inputStateReducer, initialInput);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatchInput({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatchInput({ type: 'BLUR' });
  };

  const reset = () => {
    dispatchInput({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
