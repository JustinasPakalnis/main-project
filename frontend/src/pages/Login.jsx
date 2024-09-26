import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/api/login", {
        username: username,
        password: password,
      });

      console.log("Full response:", response);
      console.log("Login status:", response.data.message);
      console.log("User details:", response.data.user);

      if (response.data.message === "Login approved") {
        navigate("/main");
      }
      if (
        response.data.message === "Login denied, incorrect password" ||
        response.data.message === "User not found"
      ) {
        setMessage("LOGIN HAS BEEN DENIED!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <section className={style.loginContainer}>
      <form className={style.login} onSubmit={handleLogin}>
        <h2 className={style.title}>To acces you have to log in</h2>
        <div>
          <label className={style.label}>Username: </label>
          <input
            className={style.field}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
