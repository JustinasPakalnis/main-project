import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const initialContext = {
  users: [],
  userTemplate: {
    userstatus: "",
    password: "",
    type: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  fetchAllUsers: () => {},
  handleInputChange: () => {},
  handleCreateUser: () => {},
};
export const UserListContext = createContext(initialContext);
export function UserListWrapper(props) {
  const [users, setUsers] = useState(initialContext.users);
  const [userTemplate, setUserTemplate] = useState(initialContext.users);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(function () {
    fetchAllUsers();
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

  const value = {
    users,
    handleInputChange,
    userTemplate,
    handleCreateUser,
  };
  return (
    <UserListContext.Provider value={value}>
      {props.children}
    </UserListContext.Provider>
  );
}
