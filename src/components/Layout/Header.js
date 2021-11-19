import React from "react";
import styles from "./Header.module.css";
import mainImage from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Ding Ding Meals</h1>
        <HeaderCardButton />
      </header>
      <div className={styles["main-image"]}>
        <img src={mainImage} alt="A table full of meals!" />
      </div>
    </>
  );
};

export default Header;
