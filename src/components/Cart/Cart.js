import React, { useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

// const CART_ITEMS = [{ id: "c1", name: "Sushi", amount: 2, price: "32.34" }];

const Cart = (props) => {
  const cartCxt = useContext(CartContext);

  const onAddItemHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };
  const onRemoveItemHandler = (id) => {
    cartCxt.removeItem(id);
  };

  const isEmptyCard = cartCxt.items.length <= 0;

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
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {!isEmptyCard && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
