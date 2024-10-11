import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { UserListContext } from "../../context/UserListContext";
import { LoginContext } from "../../context/LoginContext";
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
  const { authorizedUser } = useContext(LoginContext);
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
            value={transferData.toUser}
            required
          >
            <option value="" disabled>
              Select user
            </option>
            {usersFullNames.map((user, index) =>
              authorizedUser.firstName + " " + authorizedUser.lastName !==
              user.fullName ? (
                <option key={index} value={user.id}>
                  {user.fullName}
                </option>
              ) : null
            )}
          </select>
          <input
            className={style.formField}
            value={transferData.comment}
            type="text"
            placeholder="comment"
            onChange={(e) => handleTransferComment(e)}
            name="comment"
          />
        </div>
        <div className={style.btnBlock}>
          <button className={style.updateButton} type="submit">
            Send
          </button>
          <button
            className={style.updateButton}
            type="button"
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
