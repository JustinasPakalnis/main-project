import { useContext } from "react";
import style from "./List.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import { LoginContext } from "../../context/LoginContext.jsx";
const TransferList = ({ type }) => {
  const { transferListData, acceptTransfer, declineTransfer } =
    useContext(GlobalContext);
  const { authorizedUser } = useContext(LoginContext);

  let displayedIndex = 0;
  return (
    <>
      <section className={style.transferContainer}>
        <h1 className={style.transferTitle}>Your pending transfers</h1>
        <div className={style.listContainer}>
          <ul className={style.list}>
            {transferListData.map((item) =>
              item.status === "pending" &&
              authorizedUser.userID === item.to_user ? (
                <li
                  className={
                    displayedIndex++ % 2 === 0
                      ? style.listItem
                      : `${style.listItem} ${style.listItem2}`
                  }
                  key={item.id}
                >
                  <p>{item.item}</p>
                  <p>{item.fromUserFullName}</p>
                  <p>{item.toUserFullName}</p>
                  <p>{item.condition}</p>
                  <p>{item.transfer_comment}</p>
                  <p>{item.transfer_date.split("T").join(" ").slice(0, 16)}</p>
                  <button
                    className={style.button}
                    onClick={(e) => acceptTransfer(e, item.item_id, item.id)}
                  >
                    Accept
                  </button>
                  <button
                    className={style.button}
                    onClick={(e) => declineTransfer(e, item.item_id, item.id)}
                  >
                    Decline
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default TransferList;
