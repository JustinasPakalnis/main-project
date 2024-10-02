import style from "./Header.module.css";
import { LoginContext } from "../../context/LoginContext.jsx";
import React, { useContext } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa6";
const Header = () => {
  const {
    authorizedUserFirstName,
    authorizedUserLastName,
    darkTheme,
    handleDarkThemeToggle,
  } = useContext(LoginContext);

  return (
    <header className={style.headerContainer}>
      <div>
        <BsFillMoonStarsFill
          onClick={handleDarkThemeToggle}
          className={style.themeToggle}
          data-visible={darkTheme}
        />
        <FaSun
          onClick={handleDarkThemeToggle}
          className={style.themeToggle}
          data-visible={!darkTheme}
        />
      </div>
      <div className={style.headerContent}>
        <h1>Justinas Pakalnis</h1>
        <p>FullStack Developer</p>
      </div>
      <div className={style.headerUser}>
        {authorizedUserFirstName && authorizedUserLastName && (
          <>
            <p>Session:</p>
            <p>
              {authorizedUserFirstName} {authorizedUserLastName}
            </p>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
