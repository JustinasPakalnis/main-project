import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import AddUpdateTemplate from "./AddUpdateTemplate.jsx";
import style from "./AddUpdate.module.css";
const Update = () => {
  const { item, updateActive, handleUpdateActiveOFF, handleUpdateClick } =
    useContext(GlobalContext);
  return (
    <div
      className={`${style.form} ${style.formUpdate}`}
      data-active={updateActive}
    >
      <h1>Update selected Item</h1>
      <AddUpdateTemplate />
      <div className={style.btnBlock}>
        <button
          className={style.updateButton}
          onClick={(e) => handleUpdateClick(e, item)}
        >
          UPDATE
        </button>
        <button className={style.updateButton} onClick={handleUpdateActiveOFF}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default Update;
