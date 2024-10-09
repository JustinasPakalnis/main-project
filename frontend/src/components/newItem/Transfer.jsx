import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { UserListContext } from "../../context/UserListContext";
import style from "./AddUpdate.module.css";
const Transfer = () => {
  const {
    transferData,
    handleTransferDataChange,
    createTransfer,
    handleTransferComment,
    transfervisible,
    handleTransferMenuClose,
  } = useContext(GlobalContext);
  const { usersFullNames } = useContext(UserListContext);
  console.log(transfervisible);
  return (
    <>
      <form
        onSubmit={createTransfer}
        data-transfervisible={transfervisible}
        className={`${style.formRow} ${style.transferForm}`}
      >
        <div className={style.formLine}>
          <select
            className={style.formField}
            name="toUser"
            onChange={handleTransferDataChange}
            required
          >
            <option value="" disabled default>
              Select user
            </option>
            {usersFullNames.map((user, index) => (
              <option key={index} value={user.id}>
                {user.fullName}
              </option>
            ))}
          </select>
          <input
            className={style.formField}
            value={transferData.comment}
            type="text"
            placeholder="comment"
            onChange={handleTransferComment}
            name="comment"
          />
        </div>
        <div className={style.btnBlock}>
          <button className={style.updateButton} type="submit">
            Send
          </button>
          <button
            className={style.updateButton}
            onClick={handleTransferMenuClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Transfer;
