import { useContext } from "react";
import style from "./List.module.css";
import ListTemplate from "./ListTemplate.jsx";
import { GlobalContext } from "../../context/GlobalContext";
import Add from "../newItem/Add.jsx";
import Update from "../newItem/Update.jsx";
import SecondaryHeader from "../secondaryHeader/SecondaryHeader.jsx";
import { UserListContext } from "../../context/UserListContext.jsx";
const InventoryList = ({ props }) => {
  const {
    item,
    handleInputChange,
    transferData,
    handleTransferDataChange,
    createTransfer,
    handleTransferComment,
  } = useContext(GlobalContext);
  const { usersFullNames } = useContext(UserListContext);
  return (
    <>
      <section>
        <SecondaryHeader></SecondaryHeader>
        <div className={style.mainListContainer}>
          <Add></Add>
          <Update></Update>
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
          <button onClick={createTransfer}>Send</button>
          <div className={style.listContainer}>
            <ListTemplate props={props} />
          </div>
        </div>
      </section>
    </>
  );
};

export default InventoryList;
