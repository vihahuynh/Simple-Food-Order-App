import React, { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const amountStr = amountInputRef.current.value;

    const amountNum = +amountStr;
    if (amountStr.trim().lenght === 0 || amountNum < 1 || amountNum > 5) {
      setIsAmountValid(false);
      return;
    }

    props.addAmountItem(amountNum);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button type="submit">+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
