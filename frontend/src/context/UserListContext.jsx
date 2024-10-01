import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const initialContext = {
  users: {
    username: "",
    password: "",
    type: "",
    firstName: "",
    lastName: "",
    email: "",
  },

  fetchAllUsers: () => {},
};
export const UserListContext = createContext(initialContext);
export function UserListWrapper(props) {
  const [users, setUsers] = useState(initialContext.users);

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
  console.log(users);

  const value = {
    users,
  };
  return (
    <UserListContext.Provider value={value}>
      {props.children}
    </UserListContext.Provider>
  );
}
