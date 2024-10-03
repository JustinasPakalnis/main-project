import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { UserListContext } from "../../context/UserListContext";
import AddUpdateTemplate from "./AddUpdateTemplate.jsx";
import style from "./AddUpdate.module.css";
const Add = () => {
  const {
    insertActive,
    handleFieldClear,
    handleInsertClick,
    handleInsertActive,
  } = useContext(GlobalContext);
  return (
    <>
      <div
        className={`${style.form} ${style.formInsert}`}
        data-active={insertActive}
      >
        <h1>Create new item</h1>
        <AddUpdateTemplate />
        <div className={style.btnBlock}>
          <button className={style.updateButton} onClick={handleInsertClick}>
            Create
          </button>
          <button className={style.updateButton} onClick={handleFieldClear}>
            Clear
          </button>
          <button className={style.updateButton} onClick={handleInsertActive}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Add;
