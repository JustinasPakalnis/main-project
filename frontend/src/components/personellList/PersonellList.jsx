import { useContext, useEffect, useState } from "react";
import { UserListContext } from "../../context/UserListContext";
import { GlobalContext } from "../../context/GlobalContext";
import { LoginContext } from "../../context/LoginContext";
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
    userCommentFieldOpen,
    handleUserCommentMenuClose,
    userCommentID,
  } = useContext(UserListContext);

  const { authorizedUser } = useContext(LoginContext);
  const selectedUser = users.find((user) => user.id === userCommentID);
  return (
    <>
      <section className={style.usersListContainer}>
        <div className={style.commentBox} data-visible={userCommentFieldOpen}>
          {selectedUser && (
            <p>
              Comment something about: {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </p>
          )}
          <textarea
            className={style.inputComment}
            value={userComment}
            placeholder="Write your comment here"
            onChange={handlefieldChange}
            name="comment"
            required
          />
          <span className={style.letterCount}>
            Symbols left: {200 - userComment.length}
          </span>
          <div className={style.btnBlock}>
            <button
              onClick={(e) =>
                handleCreateUserComment(
                  e,
                  userComment,
                  userCommentID,
                  authorizedUser
                )
              }
              className={style.commentButton}
            >
              Send
            </button>
            <button
              onClick={handleUserCommentMenuClose}
              className={style.commentButton}
            >
              Close
            </button>
          </div>
        </div>
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

                <button
                  onClick={() => handleUserCommentMenu(users.id)}
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
          {userComments.length > 0 ? (
            userComments.map((userStuff, index) => (
              <li className={style.listItem} key={userStuff.id}>
                <p>Commented by: {userStuff.author}</p>
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
