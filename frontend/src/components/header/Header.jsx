import style from "./Header.module.css";
import { LoginContext } from "../../context/LoginContext.jsx";
import React, { useContext } from "react";
const Header = () => {
  const { authorizedUserFirstName, authorizedUserLastName } =
    useContext(LoginContext);

  return (
    <header className={style.headerContainer}>
      <div className={style.headerUser}></div>
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
