import React from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";

const CART_ITEMS = [{ id: "c1", name: "Sushi", amount: 2, price: "32.34" }];

const Cart = (props) => {
  return (
    <Modal onClick={props.onHideCart}>
      <ul>
        {CART_ITEMS.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>34.33</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
