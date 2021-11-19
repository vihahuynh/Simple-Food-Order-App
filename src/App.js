import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCart = () => {
    setCartIsShown(true);
  };

  const hideCart = () => {
    setCartIsShown(false);
  };

  return (
    <>
      {cartIsShown && <Cart onHideCart={hideCart} />}
      <Header onShowCart={showCart} />
      <Meals />
    </>
  );
}

export default App;
