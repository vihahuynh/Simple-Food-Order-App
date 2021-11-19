import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCardButton.module.css";

const HeaderCardButton = (props) => {
  const cartCxt = useContext(CartContext);
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

  const { items } = cartCxt;

  const btnStyles = `${styles.button} ${isBtnHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length <= 0) {
      return;
    }
    setIsBtnHighlighted(true);
    const timer = setTimeout(() => setIsBtnHighlighted(false), 300);

    return () => clearTimeout(timer);
  }, [items]);

  const numOfCartItems = items.reduce((total, item) => {
    return total + item.amount;
  }, 0);
  return (
    <button className={btnStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your card</span>
      <span className={styles.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
