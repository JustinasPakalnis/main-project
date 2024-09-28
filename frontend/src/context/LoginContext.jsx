import { createContext, useEffect, useState } from "react";
export const initialContext = {
  isAuthenticated: false,

  handleAuthentication: () => {},
};
export const LoginContext = createContext(initialContext);

export function LoginWrapper(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialContext.isAuthenticated
  );
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  console.log("Is it authentificated?", isAuthenticated);

  const value = {
    isAuthenticated,
    handleAuthentication,
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}
