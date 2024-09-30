import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <section className={style.navigationContainer}>
      <span className={style.navigationTitle}>Navigation</span>

      <button
        className={style.navButton}
        onClick={() => navigate("/main/Inventory")}
      >
        Inventory
      </button>
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
      <span className={style.navLink}>Active personnel(future)</span>
      <span className={style.navLink}>Former personnel(future)</span>
    </section>
  );
};

export default NavBar;
