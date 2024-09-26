import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    item: "",
    owner: "",
    location: "",
    value: null,
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(book);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/inventory", book);
      navigate("/main");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Item</h1>
      <input
        type="text"
        placeholder="item"
        onChange={handleChange}
        name="item"
      />
      <input
        type="text"
        placeholder="owner"
        onChange={handleChange}
        name="owner"
      />
      <input
        type="text"
        placeholder="location"
        onChange={handleChange}
        name="location"
      />
      <input
        type="number"
        placeholder="value"
        onChange={handleChange}
        name="value"
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
