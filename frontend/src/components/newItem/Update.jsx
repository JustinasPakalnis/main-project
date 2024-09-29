import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import style from "./Add.module.css";
const Update = () => {
  const {
    items,
    item,
    handleInputChange,
    updateActive,
    itemID,
    handleUpdateActiveOFF,
    handleUpdateClick,
  } = useContext(GlobalContext);

  return (
    <div
      className={`${style.form} ${style.formUpdate}`}
      data-active={updateActive}
    >
      <h1>Update selected Item</h1>
      <div className={style.formRow}>
        <input
          value={item.item}
          type="text"
          placeholder="item"
          onChange={handleInputChange}
          name="item"
        />
        <input
          value={item.owner}
          type="text"
          placeholder="owner"
          onChange={handleInputChange}
          name="owner"
        />
        <input
          value={item.location}
          type="text"
          placeholder="location"
          onChange={handleInputChange}
          name="location"
        />
        <input
          value={item.value || ""}
          type="number"
          placeholder="value"
          onChange={handleInputChange}
          name="value"
        />
        <button
          className="formButton"
          onClick={(e) => handleUpdateClick(e, item)}
        >
          UPDATE
        </button>
        <button className="formButton" onClick={handleUpdateActiveOFF}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default Update;
