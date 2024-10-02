import style from "./SecondaryHeader.module.css";
import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { LoginContext } from "../../context/LoginContext.jsx";
const SecondaryHeader = () => {
  const { items } = useContext(GlobalContext);
  const { darkTheme } = useContext(LoginContext);
  const totalValue = items.reduce(
    (acc, currentItem) => acc + (currentItem.value || 0),
    0
  );

  const uniqueLocations = [...new Set(items.map((item) => item.location))]
    .length;
  const uniqueOwners = [...new Set(items.map((item) => item.owner))].length;

  return (
    <header className={style.StatsBar} data-visible={darkTheme}>
      <div className={style.stat}>
        <p>Total warehouse amount:</p>
        <p>{items.length}</p>
      </div>
      <div className={style.stat}>
        <p>Total warehouse value:</p>
        <p>{totalValue} Eur</p>
      </div>
      <div className={style.stat}>
        <p>Total different locations:</p>
        <p>{uniqueLocations}</p>
      </div>
      <div className={style.stat}>
        <p>Total different owners:</p>
        <p>{uniqueOwners}</p>
      </div>
    </header>
  );
};

export default SecondaryHeader;
