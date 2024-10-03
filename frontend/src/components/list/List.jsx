import { useContext } from "react";
import style from "./List.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import Add from "../newItem/Add.jsx";
import Update from "../newItem/Update.jsx";
import SecondaryHeader from "../secondaryHeader/SecondaryHeader.jsx";
import { LoginContext } from "../../context/LoginContext.jsx";
const InventoryList = () => {
  const {
    items,
    handleDelete,
    handleInsertActive,
    insertActive,
    handleUpdateActive,
  } = useContext(GlobalContext);
  const { darkTheme } = useContext(LoginContext);
  return (
    <>
      <section>
        <SecondaryHeader></SecondaryHeader>
        <div className={style.mainListContainer} data-visible={darkTheme}>
          <Add></Add>
          <Update></Update>
          <div className={style.listContainer} data-visible={darkTheme}>
            <div className={style.title}>
              <p>Item</p>
              <p>Owner</p>
              <p>Location</p>
              <p>Value</p>
              <p>Date created</p>
              <p>Comment</p>
              <p>Condition</p>
            </div>
            <ul className={style.list}>
              {items.map((item, index) => (
                <li
                  className={
                    index % 2 === 0
                      ? style.listItem
                      : `${style.listItem} ${style.listItem2}`
                  }
                  data-visible={darkTheme}
                  key={item.id}
                >
                  <p>{item.item}</p>
                  <p>{item.owner}</p>
                  <p>{item.location}</p>
                  <p>{item.value.toFixed(2)} Eur</p>
                  <p>{new Date(item.createdate).toLocaleDateString()}</p>
                  <p>{item.comment}</p>
                  <p>{item.condition}</p>
                  <div className={style.buttonBlock}>
                    <button
                      className={style.button}
                      onClick={() => handleUpdateActive(item.id)}
                    >
                      Update
                    </button>
                    <button
                      className={`${style.button} ${style.btnDelete}`}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default InventoryList;
