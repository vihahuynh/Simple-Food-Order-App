import styles from "./Checkout.module.css";
import useInput from "../../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isPostalCode = (value) => /^([0-9]{5})$/.test(value);

const Checkout = (props) => {
  const {
    input: nameInput,
    enteredInput: enteredName,
    isInputValid: isNameInputValid,
  } = useInput(
    {
      id: "name",
      label: "Your name",
      type: "text",
    },

    "Name must be not empty",
    isNotEmpty
  );

  const {
    input: streetInput,
    enteredInput: enteredStreet,
    isInputValid: isStreetInputValid,
  } = useInput(
    {
      id: "street",
      label: "Street",
      type: "text",
    },
    "Street must be not empty",
    isNotEmpty
  );

  const {
    input: cityInput,
    enteredInput: enteredCity,
    isInputValid: isCityInputValid,
  } = useInput(
    {
      id: "city",
      label: "City",
      type: "text",
    },
    "City must be not empty",
    isNotEmpty
  );

  const {
    input: postalCodeInput,
    enteredInput: enteredPostalCode,
    isInputValid: isPostalCodeInputValid,
  } = useInput(
    {
      id: "code",
      label: "Postal code",
      type: "text",
    },
    "Postal code is invalid",
    isPostalCode
  );

  let formIsValid = false;

  formIsValid =
    isNameInputValid &&
    isStreetInputValid &&
    isCityInputValid &&
    isPostalCodeInputValid;

  const confirmHandler = (event) => {
    event.preventDefault();
    console.log(formIsValid);
    if (!formIsValid) return;

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      {nameInput}
      {streetInput}
      {postalCodeInput}
      {cityInput}
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} type="submit" className={styles.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
