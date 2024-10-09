import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { UserListContext } from "../../context/UserListContext";
import style from "./AddUpdate.module.css";
const AddUpdateTemplate = () => {
  const { item, handleInputChange } = useContext(GlobalContext);
  const { usersFullNames } = useContext(UserListContext);
  return (
    <div className={style.formRow}>
      <div className={style.formLine}>
        <input
          className={style.formField}
          value={item.item}
          type="text"
          placeholder="Item"
          onChange={handleInputChange}
          name="item"
        />
        <select
          className={style.formField}
          name="owner"
          value={item.owner}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select user
          </option>
          {usersFullNames.map((user, index) => (
            <option key={index} value={user.fullName}>
              {user.fullName}
            </option>
          ))}
        </select>
        <input
          className={style.formField}
          value={item.location}
          type="text"
          placeholder="Location"
          onChange={handleInputChange}
          name="location"
        />
        <input
          className={style.formField}
          value={item.value}
          type="number"
          placeholder="Value"
          onChange={handleInputChange}
          name="value"
        />
      </div>
      <div className={style.formLine}>
        <select
          className={style.formField}
          name="status"
          value={item.status}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="Active">Active</option>
          <option value="Remowed">Remowed</option>
        </select>
        <select
          className={style.formField}
          name="condition"
          value={item.condition}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select condition
          </option>
          <option value="New">New</option>
          <option value="Broken">Broken</option>
          <option value="Good">Good</option>
          <option value="Poor">Poor</option>
        </select>
        <input
          className={style.formField}
          type="date"
          placeholder="date"
          onChange={handleInputChange}
          name="createdate"
          value={item.createdate}
        />
        <input
          className={style.formField}
          type="text"
          placeholder="Comment"
          onChange={handleInputChange}
          name="comment"
          value={item.comment}
        />
      </div>
    </div>
  );
};

export default AddUpdateTemplate;
