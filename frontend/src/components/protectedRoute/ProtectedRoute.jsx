import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

const ProtectedRoute = ({ element: Component }) => {
  const { isAuthenticated } = useContext(LoginContext);

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
