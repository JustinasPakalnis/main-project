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
    handleUserCommentMenu,
    userCommentMenuID,
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
                  className={style.commentBox}
                  data-visible={userCommentMenuID === index}
                  value={userComment}
                  type="text"
                  placeholder="comment"
                  onChange={handlefieldChange}
                  name="comment"
                  required
                />
                <button
                  onClick={() => handleUserCommentMenu(index)}
                  className={style.button}
                >
                  {userCommentMenuID === index ? "Close" : "Comment"}
                </button>
                {userCommentMenuID === index && (
                  <button
                    onClick={(e) =>
                      handleCreateUserComment(e, userComment, users.id)
                    }
                    className={style.button}
                  >
                    Send
                  </button>
                )}

                {userCommentMenuID !== index && (
                  <button
                    onClick={(e) => fetchUserComments(users.id)}
                    className={style.button}
                  >
                    Get
                  </button>
                )}
              </li>
            ))}
          </ul>
          {userComments.length > 0 ? (
            userComments.map((userStuff, index) => (
              <li className={style.listItem} key={userStuff.id}>
                <p>{userStuff.commentDate.split("T").join(" ").slice(0, 16)}</p>
                <p>{userStuff.comment}</p>
              </li>
            ))
          ) : (
            <p>No comments available for this one</p>
          )}
        </div>
      </section>
    </>
  );
};

export default PersonellList;
