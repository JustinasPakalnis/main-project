import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import List from "./components/list/List.jsx";
import Header from "./components/header/Header.jsx";
import Login from "./pages/Login";
import { ContextWrapper } from "./context/GlobalContext";
import { LoginWrapper } from "./context/LoginContext";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import "./app.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <LoginWrapper>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/main"
              element={
                <ContextWrapper>
                  <ProtectedRoute element={List} />
                </ContextWrapper>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </LoginWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
