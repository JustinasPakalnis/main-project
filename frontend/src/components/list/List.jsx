import { useContext } from "react";
import style from "./List.module.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const List = () => {
  const navigate = useNavigate();
  const { items, handleDelete } = useContext(GlobalContext);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  const handleAdd = () => {
    navigate(`/add`);
  };

  return (
    <>
      <div className={style.mainListContainer}>
        <button className={style.button} onClick={() => handleAdd()}>
          Add new item
        </button>
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
                  onClick={() => handleUpdate(item.id)}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default List;
