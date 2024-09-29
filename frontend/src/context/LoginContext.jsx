import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const initialContext = {
  isAuthenticated: false,
  authorizedUserFirstName: "",
  authorizedUserLastName: "",
  message: null,
  handleAuthentication: () => {},
  handleLogin: () => {},
};
export const LoginContext = createContext(initialContext);

export function LoginWrapper(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialContext.isAuthenticated
  );

  const [authorizedUserFirstName, setAuthorizedUserFirstName] = useState(
    initialContext.authorizedUserFirstName
  );
  const [authorizedUserLastName, setAuthorizedUserLastName] = useState(
    initialContext.authorizedUserLastName
  );
  const [message, setMessage] = useState(initialContext.message);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleLogin = async (e, username, password) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/api/login", {
        username: username,
        password: password,
      });

      console.log(response.data);
      console.log(response.data.user.firstName);

      if (response.data.message === "Login approved") {
        setAuthorizedUserFirstName(response.data.user.firstName);
        setAuthorizedUserLastName(response.data.user.lastName);
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
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  console.log(authorizedUserFirstName);
  console.log(authorizedUserLastName);

  console.log("Is it authentificated?", isAuthenticated);

  const value = {
    isAuthenticated,
    handleAuthentication,
    handleLogin,
    message,
    authorizedUserFirstName,
    authorizedUserLastName,
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}
