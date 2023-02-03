import { useState } from 'react';

const SimpleInput = (props) => {
  // Name Section:
  const [enteredName, setEnteredName] = useState(''); //updated name with every keystroke
  const [enteredNameTouched, setEnteredNameTouched] = useState(false); //name is touched when submitted
  const enteredNameIsValid = enteredName.trim() !== ''; //everytime input is changed, it's checked for validity
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched; //if name is invalid & name is touched then name is invalid

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  // Email Section:
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const enteredEmailIsValid = enteredEmail.includes('@');
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched; //if name is invalid & name is touched then name is invalid

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  // Entire Form Related
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

    setEnteredEmail('');
    setEnteredEmailTouched(false);
  };

  // since variable changes depending on state it’s fine to have it in the global scope
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName} />
      </div>
      {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}

      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler} value={enteredEmail} />
      </div>
      {emailInputIsInvalid && <p className="error-text">Email must be valid.</p>}

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
