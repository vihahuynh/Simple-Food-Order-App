import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const { name, price, description, id } = props.meal;

  const addAmountItem = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{`$${price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={id} addAmountItem={addAmountItem} />
      </div>
    </li>
  );
};

export default MealItem;
