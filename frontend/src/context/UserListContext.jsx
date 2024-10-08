import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const initialContext = {
  users: [],
  userCommentID: null,
  usersFullNames: [],
  userComments: [],
  userCommentFieldOpen: false,
  userListCommentID: null,
  userTemplate: {
    userstatus: "",
    password: "",
    type: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  userComment: "",
  fetchAllUsers: () => {},
  handleInputChange: () => {},
  handleCreateUser: () => {},
  fetchAllUsersFullNames: () => {},
  handleCreateUserComment: () => {},
  handlefieldChange: () => {},
  fetchUserComments: () => {},
  handleUserCommentMenu: () => {},
  handleFieldClear: () => {},
  handleUserCommentMenuClose: () => {},
};
export const UserListContext = createContext(initialContext);
export function UserListWrapper(props) {
  const [users, setUsers] = useState(initialContext.users);
  const [userTemplate, setUserTemplate] = useState(initialContext.userTemplate);
  const [usersFullNames, setUsersFullNames] = useState(
    initialContext.usersFullNames
  );
  const [userComment, setUserComment] = useState(initialContext.userComment);
  const [userComments, setUserComments] = useState(initialContext.userComments);

  const [userCommentFieldOpen, setUserCommentFieldOpen] = useState(
    initialContext.userCommentFieldOpen
  );
  const [userCommentID, setUserCommentID] = useState(
    initialContext.userCommentID
  );
  const [userListCommentID, setUserListCommentID] = useState(
    initialContext.userListCommentID
  );

  const handlefieldChange = (e) => {
    setUserComment(e.target.value);
  };

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllUsersFullNames = async () => {
    try {
      const res = await axios.get("http://localhost:8800/usersFullNames");
      setUsersFullNames(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(function () {
    fetchAllUsers();
    fetchAllUsersFullNames();
    setUserTemplate(initialContext.userTemplate);
  }, []);
  // console.log(usersFullNames);

  // useEffect(function () {
  //   setUserTemplate(initialContext.userTemplate);
  // }, []);

  const handleInputChange = (e) => {
    setUserTemplate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/users", userTemplate);
      fetchAllUsers();
      setUserTemplate(initialContext.userTemplate);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCreateUserComment = async (
    e,
    comment,
    userCommentID,
    authorizedUser
  ) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/users/comment`, {
        comment,
        userCommentID,
        authorizedUser,
      });
      handleFieldClear();
      setUserCommentFieldOpen(false);
      setUserCommentID(null);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserComments = async (id, index) => {
    try {
      const res = await axios.get(`http://localhost:8800/usercomments/${id}`);
      setUserComments(res.data);
      setUserCommentFieldOpen(false);
      setUserListCommentID(userListCommentID === index ? null : index);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(userListCommentID);

  const handleUserCommentMenu = (userCommentID) => {
    setUserCommentID(userCommentID);
    setUserCommentFieldOpen(true);
    handleFieldClear();
    setUserListCommentID(null);
  };
  const handleUserCommentMenuClose = () => {
    setUserCommentFieldOpen(false);
    handleFieldClear();
    setUserCommentID(null);
  };

  const handleFieldClear = () => {
    setUserComment(initialContext.userComment);
  };
  const value = {
    users,
    handleInputChange,
    userTemplate,
    handleCreateUser,
    usersFullNames,
    handlefieldChange,
    userComment,
    handleCreateUserComment,
    userComments,
    fetchUserComments,
    handleUserCommentMenu,
    userListCommentID,
    userCommentFieldOpen,
    handleUserCommentMenuClose,
    userCommentID,
  };
  return (
    <UserListContext.Provider value={value}>
      {props.children}
    </UserListContext.Provider>
  );
}
