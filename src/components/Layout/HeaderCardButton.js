import React from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCardButton.module.css";

const HeaderCardButton = () => {
  return (
    <button className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your card</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};

export default HeaderCardButton;
