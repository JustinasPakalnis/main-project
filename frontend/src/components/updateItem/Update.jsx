import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [item, setItem] = useState({
    item: "",
    owner: "",
    location: "",
    value: null,
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const itemId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/inventory/" + itemId, item);
      navigate("/main");
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update selected Item</h1>
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
      <button className="formButton" onClick={handleClick}>
        UPDATE
      </button>
    </div>
  );
};

export default Update;
