import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const initialContext = {
  isAuthenticated: false,

  authorizedUser: {},
  darkTheme: false,
  loginMessage: false,
  message: null,
  handleAuthentication: () => {},
  handleLogin: () => {},
  handleDarkThemeToggle: () => {},
  handleLoginMessage: () => {},
};
export const LoginContext = createContext(initialContext);

export function LoginWrapper(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialContext.isAuthenticated
  );
  const [darkTheme, setdarkTheme] = useState(initialContext.darkTheme);

  const [authorizedUser, setAuthorizedUser] = useState(
    initialContext.authorizedUser
  );
  const [message, setMessage] = useState(initialContext.message);
  const [loginMessage, setLoginMessage] = useState(initialContext.loginMessage);
  console.log(authorizedUser);

  const handleDarkThemeToggle = () => {
    setdarkTheme(!darkTheme);
  };

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };
  const handleLoginMessage = () => {
    setLoginMessage(false);
  };

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/api/login", {
        email: email,
        password: password,
      });

      console.log(response.data);
      console.log(response.data.user.firstName);

      if (response.data.message === "Login approved") {
        setAuthorizedUser({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
        });
        handleAuthentication();
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
        setTimeout(() => {
          setLoginMessage(true);
        }, 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("LOGIN HAS BEEN DENIED!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setTimeout(() => {
        setLoginMessage(true);
      }, 3000);
    }
  };

  console.log("Is user authentificated?", isAuthenticated);

  const value = {
    isAuthenticated,
    handleAuthentication,
    handleLogin,
    message,
    authorizedUser,
    handleDarkThemeToggle,
    darkTheme,
    loginMessage,
    handleLoginMessage,
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}
