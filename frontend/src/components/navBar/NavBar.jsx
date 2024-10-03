import style from "./NavBar.module.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext.jsx";
import { GlobalContext } from "../../context/GlobalContext";
const NavBar = () => {
  const navigate = useNavigate();
  const { darkTheme } = useContext(LoginContext);
  const {
    handleInsertActive,
    fetchAllItems,
    handleActiveItems,
    handleRemowedItems,
    handleTranfsersItems,
  } = useContext(GlobalContext);
  return (
    <section className={style.navigationContainer} data-visible={darkTheme}>
      <span className={style.navigationTitle}>Navigation</span>

      <button
        className={style.navButton}
        onClick={() => {
          navigate("/main/Inventory");
          fetchAllItems();
        }}
      >
        Inventory
      </button>
      <span onClick={handleInsertActive} className={style.navLink}>
        Create item
      </span>
      <span
        onClick={() => {
          navigate("/main/Inventory/active");
          handleActiveItems();
        }}
        className={style.navLink}
      >
        Active items
      </span>
      <span
        onClick={() => {
          navigate("/main/Inventory/remowed");
          handleRemowedItems();
        }}
        className={style.navLink}
      >
        Retired items
      </span>
      <span
        onClick={() => {
          navigate("/main/Inventory/transfers");
          handleTranfsersItems();
        }}
        className={style.navLink}
      >
        Item transfers
      </span>

      <button
        className={style.navButton}
        onClick={() => navigate("/main/Personell")}
      >
        Personell
      </button>
      <span
        className={style.navLink}
        onClick={() => navigate("/main/createNewUser")}
      >
        Create new USER
      </span>
      <span className={style.navLink}>Active personnel(future)</span>
      <span className={style.navLink}>Former personnel(future)</span>
    </section>
  );
};

export default NavBar;
