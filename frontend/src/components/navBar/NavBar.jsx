import style from "./NavBar.module.css";
import React, { useContext, useState } from "react";
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
    selectedMenu,
    setSelectedMenu,
    setinsertActive,
    setUpdateActive,
  } = useContext(GlobalContext);

  return (
    <section className={style.navigationContainer} data-visible={darkTheme}>
      <span className={style.navigationTitle}>Navigation</span>

      <button
        className={style.navButton}
        data-selected={selectedMenu === 1}
        onClick={() => {
          navigate("/main/Inventory");
          fetchAllItems();
          setSelectedMenu(1);
          setinsertActive(false);
          setUpdateActive(false);
        }}
      >
        Inventory
      </button>
      <span
        onClick={() => {
          navigate("/main/Inventory");
          handleInsertActive(); // Call the first function
          {
            selectedMenu === 8 ? setSelectedMenu(1) : setSelectedMenu(8);
          } // Then call the second function
        }}
        data-selected={selectedMenu === 8}
        className={style.navLink}
      >
        Create item
      </span>
      <span
        data-selected={selectedMenu === 2}
        onClick={() => {
          navigate("/main/Inventory/active");
          handleActiveItems();
          setSelectedMenu(2);
        }}
        className={style.navLink}
      >
        Active items
      </span>
      <span
        data-selected={selectedMenu === 3}
        onClick={() => {
          navigate("/main/Inventory/remowed");
          handleRemowedItems();
          setSelectedMenu(3);
        }}
        className={style.navLink}
      >
        Remowed items
      </span>
      <span
        data-selected={selectedMenu === 4}
        onClick={() => {
          navigate("/main/Inventory/transfers");
          handleTranfsersItems();
          setSelectedMenu(4);
        }}
        className={style.navLink}
      >
        Item transfers
      </span>

      <button
        data-selected={selectedMenu === 5}
        className={style.navButton}
        onClick={() => {
          navigate("/main/Personell");
          setSelectedMenu(5);
        }}
      >
        Personell
      </button>
      <span
        data-selected={selectedMenu === 6}
        className={style.navLink}
        onClick={() => {
          navigate("/main/createNewUser");
          setSelectedMenu(6);
        }}
      >
        Create new USER
      </span>
      <span className={style.navLink}>Active personnel(future)</span>
      <span className={style.navLink}>Former personnel(future)</span>
    </section>
  );
};

export default NavBar;
