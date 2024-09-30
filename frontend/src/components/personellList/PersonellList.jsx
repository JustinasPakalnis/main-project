import { useContext } from "react";
import { UserListContext } from "../../context/UserListContext";
import style from "./PersonellList.module.css";
const PersonellList = () => {
  const { users } = useContext(UserListContext);

  return (
    <>
      <section className={style.usersListContainer}>
        <div className={style.listContainer}>
          <ul className={style.list}>
            <div className={style.title}>
              <p>First Name</p>
              <p>Last Name</p>
              <p>User Type</p>
              <p>User Name</p>
              <p>Password</p>
              <p>Email addres</p>
            </div>
            {users.map((users, index) => (
              <li className={style.listItem} key={users.id}>
                <p>{users.firstName}</p>
                <p>{users.lastName}</p>
                <p>{users.type}</p>
                <p>{users.username}</p>
                <p>{users.password}</p>
                <p>{users.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default PersonellList;
