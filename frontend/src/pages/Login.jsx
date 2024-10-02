import React, { useState, useContext } from "react";
import style from "./Login.module.css";
import { LoginContext } from "../context/LoginContext";
const Login = () => {
  const { handleLogin, message } = useContext(LoginContext);
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
        <p className={style.message}>{message}</p>
      </form>
    </section>
  );
};

export default Login;
