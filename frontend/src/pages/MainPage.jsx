import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserListWrapper } from "../context/UserListContext";
import SecondaryHeader from "../components/secondaryHeader/SecondaryHeader.jsx";
import NavBar from "../components/navBar/NavBar.jsx";
import InventoryList from "../components/list/List.jsx";
import PersonellList from "../components/personellList/PersonellList.jsx";
import RegistrationTemplate from "../components/registrationTemplate/RegistrationTemplate.jsx";
import style from "./Main.module.css";
const MainPage = () => {
  return (
    <>
      <section className={style.mainCotainer}>
        <NavBar></NavBar>
        <UserListWrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/main/Inventory" />} />
            <Route path="/Inventory" element={<InventoryList />} />
            <Route path="/Personell" element={<PersonellList />} />
            <Route path="/createNewUser" element={<RegistrationTemplate />} />
          </Routes>
        </UserListWrapper>
      </section>
    </>
  );
};

export default MainPage;
