import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const initialContext = {
  users: [],
  usersFullNames: [],
  userComments: [],
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
};
export const UserListContext = createContext(initialContext);
export function UserListWrapper(props) {
  const [users, setUsers] = useState(initialContext.users);
  const [userTemplate, setUserTemplate] = useState(initialContext.users);
  const [usersFullNames, setUsersFullNames] = useState(
    initialContext.usersFullNames
  );
  const [userComment, setUserComment] = useState(initialContext.userComment);
  const [userComments, setUserComments] = useState(initialContext.userComments);

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

  useEffect(function () {
    setUserTemplate(initialContext.userTemplate);
  }, []);

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
  const handleCreateUserComment = async (e, comment, id) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/users/comment`, { id, comment });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserComments = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8800/usercomments/${id}`);
      setUserComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userComments);

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
  };
  return (
    <UserListContext.Provider value={value}>
      {props.children}
    </UserListContext.Provider>
  );
}
