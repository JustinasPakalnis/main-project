import React, { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import style from "./Add.module.css";
const Add = () => {
  const { fetchAllItems, insertActive } = useContext(GlobalContext);
  const [item, setItem] = useState({
    item: "",
    owner: "",
    location: "",
    value: null,
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(item);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/inventory", item);
      fetchAllItems();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleClear = () => {
    setItem({ item: "", owner: "", location: "", value: null });
    setError(false);
  };
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
          onChange={handleChange}
          name="item"
          value={item.item}
        />
        <input
          type="text"
          placeholder="owner"
          onChange={handleChange}
          name="owner"
          value={item.owner}
        />
        <input
          type="text"
          placeholder="location"
          onChange={handleChange}
          name="location"
          value={item.location}
        />
        <input
          type="number"
          placeholder="value"
          onChange={handleChange}
          name="value"
          value={item.value || ""}
        />
        <button onClick={handleClick}>Add</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Add;
