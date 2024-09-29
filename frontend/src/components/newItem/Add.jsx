import React, { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import style from "./Add.module.css";
const Add = () => {
  const {
    fetchAllItems,
    insertActive,
    handleInputChange,
    item,
    handleFieldClear,
    handleInsertClick,
  } = useContext(GlobalContext);

  return (
    <div
      className={`${style.form} ${style.formInsert}`}
      data-active={insertActive}
    >
      <h1>Insert New Item</h1>
      <div className={style.formRow}>
        <input
          type="text"
          placeholder="item"
          onChange={handleInputChange}
          name="item"
          value={item.item}
        />
        <input
          type="text"
          placeholder="owner"
          onChange={handleInputChange}
          name="owner"
          value={item.owner}
        />
        <input
          type="text"
          placeholder="location"
          onChange={handleInputChange}
          name="location"
          value={item.location}
        />
        <input
          type="number"
          placeholder="value"
          onChange={handleInputChange}
          name="value"
          value={item.value || ""}
        />
        <button onClick={handleInsertClick}>Add</button>
        <button onClick={handleFieldClear}>Clear</button>
      </div>
    </div>
  );
};

export default Add;
