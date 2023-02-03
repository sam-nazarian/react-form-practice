import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState(''); //updated name with every keystroke
  const [enteredNameTouched, setEnteredNameTouched] = useState(false); //name is touched when submitted

  const enteredNameIsValid = enteredName.trim() !== ''; //everytime input is changed, it's checked for validity
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched; //if name is invalid & name is touched then name is invalid

  let formIsValid = false;
  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      return;
    }

    console.log(enteredName);

    // reset form
    setEnteredName('');
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName} />
      </div>

      {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
