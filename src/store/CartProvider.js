import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingItem = state.items.find((item) => item.id === action.item.id);
    const addingAmount = action.item.price * action.item.amount;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      return {
        items: state.items.map((item) =>
          item.id === action.item.id ? updatedItem : item
        ),
        totalAmount: state.totalAmount + addingAmount,
      };
    }
    return {
      items: state.items.concat(action.item),
      totalAmount: state.totalAmount + addingAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItem = state.items.find((item) => item.id === action.id);
    if (existingItem.amount === 1) {
      return {
        items: state.items.filter((item) => item.id !== existingItem.id),
        totalAmount: state.totalAmount - existingItem.price,
      };
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      return {
        items: state.items.map((item) =>
          item.id === existingItem.id ? updatedItem : item
        ),
        totalAmount: state.totalAmount - existingItem.price,
      };
    }
  }

  if (action.type === "CLEAR") {
    return defaultCart;
  }
  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCart);

  const addItemToCartHandler = (item) => {
    cartDispatch({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    cartDispatch({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    cartDispatch({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearAll: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
