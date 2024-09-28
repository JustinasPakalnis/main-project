import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const initialContext = {
  items: [],
  insertActive: false,
  updateActive: false,
  itemID: null,
  fetchAllItems: () => {},
  handleDelete: () => {},
  handleInsertActive: () => {},
  handleUpdateActive: () => {},
  handleUpdateActiveOFF: () => {},
};
export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
  const [items, setItems] = useState(initialContext.items);
  const [insertActive, setinsertActive] = useState(initialContext.insertActive);
  const [updateActive, setUpdateActive] = useState(initialContext.updateActive);
  const [itemID, setitemID] = useState(initialContext.itemID);

  const handleInsertActive = () => {
    setUpdateActive(false);
    setinsertActive(!insertActive);
  };
  const handleUpdateActiveOFF = () => {
    setUpdateActive(false);
  };

  const handleUpdateActive = (id) => {
    setinsertActive(false);
    setitemID(id);
    setUpdateActive(true);
  };
  console.log(itemID);

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
      fetchAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    items,
    fetchAllItems,
    handleDelete,
    insertActive,
    handleInsertActive,
    updateActive,
    handleUpdateActive,
    itemID,
    setitemID,
    handleUpdateActiveOFF,
  };
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}
