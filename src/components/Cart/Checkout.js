import styles from "./Checkout.module.css";
import useInput from "../../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isPostalCode = (value) => /^([0-9]{5})$/.test(value);

const Checkout = (props) => {
  const { input: nameInput, isInputValue: isNameInputValid } = useInput(
    {
      id: "name",
      label: "Your name",
      type: "text",
    },
    "Name must be not empty",
    isNotEmpty
  );

  const { input: streetInput, isInputValue: isStreetInputValid } = useInput(
    {
      id: "street",
      label: "Street",
      type: "text",
    },
    "Street must be not empty",
    isNotEmpty
  );

  const { input: cityInput, isInputValue: isCityInputValid } = useInput(
    {
      id: "city",
      label: "City",
      type: "text",
    },
    "City must be not empty",
    isNotEmpty
  );

  const { input: postalCodeInput, isInputValue: isPostalCodeInputValid } =
    useInput(
      {
        id: "code",
        label: "Postal code",
        type: "text",
      },
      "Postal code is invalid",
      isPostalCode
    );

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
  };

  let formIsValid =
    isNameInputValid &&
    isStreetInputValid &&
    isCityInputValid &&
    isPostalCodeInputValid;

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
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
