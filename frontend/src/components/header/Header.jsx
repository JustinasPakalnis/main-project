import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./Header.module.css";
const Header = () => {
  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <h1>Justinas Pakalnis</h1>
        <p>FullStack Developer</p>
      </div>
    </header>
  );
};
export default Header;
