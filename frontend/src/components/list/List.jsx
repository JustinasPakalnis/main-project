import { useContext } from "react";
import style from "./List.module.css";
import ListTemplate from "./ListTemplate.jsx";
import { GlobalContext } from "../../context/GlobalContext";
import Add from "../newItem/Add.jsx";
import Update from "../newItem/Update.jsx";
import SecondaryHeader from "../secondaryHeader/SecondaryHeader.jsx";
import { LoginContext } from "../../context/LoginContext.jsx";
const InventoryList = ({ props }) => {
  const {
    items,
    handleDelete,
    handleInsertActive,
    insertActive,
    handleUpdateActive,
  } = useContext(GlobalContext);
  const { darkTheme } = useContext(LoginContext);
  return (
    <>
      <section>
        <SecondaryHeader></SecondaryHeader>
        <div className={style.mainListContainer} data-visible={darkTheme}>
          <Add></Add>
          <Update></Update>
          <div className={style.listContainer} data-visible={darkTheme}>
            <ListTemplate props={props} />
          </div>
        </div>
      </section>
    </>
  );
};

export default InventoryList;
