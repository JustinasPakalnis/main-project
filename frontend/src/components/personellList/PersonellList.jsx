import { useContext, useEffect, useState } from "react";
import { UserListContext } from "../../context/UserListContext";
import { GlobalContext } from "../../context/GlobalContext";
import style from "./PersonellList.module.css";
const PersonellList = () => {
  const {
    users,
    handlefieldChange,
    userComment,
    handleCreateUserComment,
    fetchUserComments,
    userComments,
  } = useContext(UserListContext);

  return (
    <>
      <section className={style.usersListContainer}>
        <div className={style.listContainer}>
          <ul className={style.list}>
            <div className={style.title}>
              <p>First Name</p>
              <p>Last Name</p>
              <p>User status</p>

              <p>Email addres</p>
              <p>User Type</p>
            </div>
            {users.map((users, index) => (
              <li className={style.listItem} key={users.id}>
                <p>{users.firstName}</p>
                <p>{users.lastName}</p>
                <p>{users.userstatus}</p>
                <p>{users.email}</p>
                <p>{users.type}</p>
                <input
                  className={style.formField}
                  value={userComment}
                  type="text"
                  placeholder="comment"
                  onChange={handlefieldChange}
                  name="comment"
                  required
                />
                <button
                  onClick={(e) =>
                    handleCreateUserComment(e, userComment, users.id)
                  }
                  className={style.button}
                >
                  Comment
                </button>
                <button
                  onClick={(e) => fetchUserComments(users.id)}
                  className={style.button}
                >
                  Get
                </button>
              </li>
            ))}
          </ul>
          {userComments.map((userStuff, index) => (
            <li className={style.listItem} key={userStuff.id}>
              <p>{userStuff.commentDate.split("T").join(" ").slice(0, 16)}</p>
              <p>{userStuff.comment}</p>
            </li>
          ))}
        </div>
      </section>
    </>
  );
};

export default PersonellList;
