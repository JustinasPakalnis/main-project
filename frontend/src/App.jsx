import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/newItem/Add.jsx";
import List from "./components/list/List.jsx";
import Update from "./components/updateItem/Update.jsx";
import Header from "./components/header/Header.jsx";
import Login from "./pages/Login";
import { ContextWrapper } from "./context/GlobalContext";
import "./app.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ContextWrapper>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/main" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>{" "}
        </ContextWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
