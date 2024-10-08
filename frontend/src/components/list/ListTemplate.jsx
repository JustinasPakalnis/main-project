import { useContext } from "react";
import style from "./List.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import { LoginContext } from "../../context/LoginContext.jsx";
const ListTemplate = ({ props }) => {
  const { handleDelete, handleUpdateActive, handleTransferMenuOpen } =
    useContext(GlobalContext);
  const { darkTheme } = useContext(LoginContext);
  return (
    <>
      <div className={style.title}>
        <p>Item</p>
        <p>Owner</p>
        <p>Condition</p>
        <p>Location</p>
        <p>Value</p>
        <p>Date created</p>
        <p>Comment</p>
      </div>
      <ul className={style.list}>
        {props.map((item, index) => (
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
            <p>{item.condition}</p>
            <p>{item.location}</p>
            <p>{item.value.toFixed(2)} Eur</p>
            <p>{new Date(item.createdate).toLocaleDateString()}</p>
            <p>{item.comment}</p>
            <div className={style.buttonBlock}>
              <button
                className={`${style.button} ${style.btnDelete}`}
                onClick={() => handleTransferMenuOpen(item.id)}
              >
                Transfer
              </button>
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
    </>
  );
};

export default ListTemplate;
