import React, { useState } from "react";
import styles from "../components/Cart/Checkout.module.css";

const useInput = (inputInfo, errorMessage, checkValidCondition) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const isInputValid = checkValidCondition(enteredInput);
  const isInvalid = !isInputValid && inputIsTouched;

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };

  const reset = () => {
    setEnteredInput("");
    setInputIsTouched(false);
  };

  const formClasses = isInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const input = (
    <div className={formClasses}>
      <label htmlFor={inputInfo.id}>{inputInfo.label}</label>
      <input
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        type={inputInfo.type}
        id={inputInfo.id}
        value={enteredInput}
      />
      {isInvalid && <p className={styles["error-text"]}>{errorMessage}</p>}
    </div>
  );
  return { input, enteredInput, isInputValid, reset };
};

export default useInput;
