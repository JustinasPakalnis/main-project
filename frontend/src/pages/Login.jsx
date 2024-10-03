import React, { useState, useContext } from "react";
import style from "./Login.module.css";
import { LoginContext } from "../context/LoginContext";
import { IoCloseSharp } from "react-icons/io5";
const Login = () => {
  const { handleLogin, message, loginMessage, handleLoginMessage } =
    useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className={style.loginContainer}>
      <form
        className={style.login}
        onSubmit={(e) => handleLogin(e, email, password)}
      >
        <h2 className={style.title}>To acces you have to log in</h2>
        <div>
          <label className={style.label}>User email: </label>
          <input
            className={style.field}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={style.label}>Password: </label>
          <input
            className={style.field}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={style.button} type="submit">
          Login
        </button>
        {message && <p className={style.message}>{message}</p>}
        <div className={style.loginMessage} data-message={loginMessage}>
          <p>If you want to create account, please contact customer support!</p>
          <IoCloseSharp
            onClick={handleLoginMessage}
            className={style.loginClose}
          />
        </div>
      </form>
    </section>
  );
};

export default Login;
