import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const initialContext = {
  items: [],
  fetchAllItems: () => {},
  handleDelete: () => {},
};
export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
  const [items, setItems] = useState(initialContext.items);

  // Get data from SQL
  const fetchAllItems = async () => {
    try {
      const res = await axios.get("http://localhost:8800/inventory");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // ITEM array is filled with data ant first page opening
  useEffect(function () {
    fetchAllItems();
  }, []);
  // Remowe selected item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/inventory/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    items,
    fetchAllItems,
    handleDelete,
  };
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}
