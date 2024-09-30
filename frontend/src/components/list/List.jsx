import { useContext } from "react";
import style from "./List.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import Add from "../newItem/Add.jsx";
import Update from "../newItem/Update.jsx";
import SecondaryHeader from "../secondaryHeader/SecondaryHeader.jsx";
const InventoryList = () => {
  const {
    items,
    handleDelete,
    handleInsertActive,
    insertActive,
    handleUpdateActive,
  } = useContext(GlobalContext);

  return (
    <>
      <section>
        <SecondaryHeader></SecondaryHeader>
        <div className={style.mainListContainer}>
          <button className={style.button} onClick={handleInsertActive}>
            {insertActive === false ? "Add new item" : "Close"}
          </button>
          <Add></Add>
          <Update></Update>
          <div className={style.listContainer}>
            <ul className={style.list}>
              <div className={style.title}>
                <p>Item</p>
                <p>Owner</p>
                <p>Location</p>
                <p>Value</p>
              </div>

              {items.map((item, index) => (
                <li className={style.listItem} key={item.id}>
                  <p>{item.item}</p>
                  <p>{item.owner}</p>
                  <p>{item.location}</p>
                  <p>{item.value.toFixed(2)} Eur</p>
                  <button
                    className={`${style.button} ${style.btnDelete}`}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={style.button}
                    onClick={() => handleUpdateActive(item.id)}
                  >
                    Update
                  </button>
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
