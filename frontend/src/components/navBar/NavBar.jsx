import style from "./NavBar.module.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext.jsx";
import { GlobalContext } from "../../context/GlobalContext";
const NavBar = () => {
  const navigate = useNavigate();
  const { darkTheme } = useContext(LoginContext);
  const { handleInsertActive } = useContext(GlobalContext);
  return (
    <section className={style.navigationContainer} data-visible={darkTheme}>
      <span className={style.navigationTitle}>Navigation</span>

      <button
        className={style.navButton}
        onClick={() => navigate("/main/Inventory")}
      >
        Inventory
      </button>
      <span onClick={handleInsertActive} className={style.navLink}>
        Create item
      </span>
      <span className={style.navLink}>Active items(future)</span>
      <span className={style.navLink}>Retired items(future)</span>
      <span className={style.navLink}>Item transfers(future)</span>
      <span className={style.navLink}>History logs(future)</span>
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
