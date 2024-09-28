import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import style from "./Add.module.css";
const Update = () => {
  const { items, fetchAllItems, updateActive, itemID, handleUpdateActiveOFF } =
    useContext(GlobalContext);

  const [item, setItem] = useState({
    item: "",
    owner: "",
    location: "",
    value: null,
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    const foundItem = items.find((s) => s.id === itemID);
    if (foundItem) {
      setItem(foundItem);
    }
  }, [itemID, items]);

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/inventory/" + itemID, item);
      fetchAllItems();
      handleUpdateActiveOFF();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

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
          onChange={handleChange}
          name="item"
        />
        <input
          value={item.owner}
          type="text"
          placeholder="owner"
          onChange={handleChange}
          name="owner"
        />
        <input
          value={item.location}
          type="text"
          placeholder="location"
          onChange={handleChange}
          name="location"
        />
        <input
          value={item.value || ""}
          type="number"
          placeholder="value"
          onChange={handleChange}
          name="value"
        />
        <button className="formButton" onClick={handleClick}>
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
