import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

// const CART_ITEMS = [{ id: "c1", name: "Sushi", amount: 2, price: "32.34" }];

const Cart = (props) => {
  const cartCxt = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onAddItemHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };
  const onRemoveItemHandler = (id) => {
    cartCxt.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const isEmptyCard = cartCxt.items.length <= 0;

  const onSubmitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://react-http-ced21-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCxt.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCxt.clearAll();
  };

  if (isSubmitting)
    return (
      <Modal onClick={props.onHideCart}>
        <p>Sending order data...</p>
      </Modal>
    );

  if (isSubmitted) {
    return (
      <Modal onClick={props.onHideCart}>
        <p>Successfully sent order data!</p>
        <div className={styles.actions}>
          <button className={styles.button} onClick={props.onHideCart}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClick={props.onHideCart}>
      <ul className={styles["cart-items"]}>
        {cartCxt.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              price={item.price}
              name={item.name}
              amount={item.amount}
              onAdd={onAddItemHandler.bind(null, item)}
              onRemove={onRemoveItemHandler.bind(null, item.id)}
            />
          );
        })}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{`$${cartCxt.totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={onSubmitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {!isEmptyCard && (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
