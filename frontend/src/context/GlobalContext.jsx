import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const initialContext = {
  items: [],
  insertActive: false,
  updateActive: false,
  itemID: null,
  item: {
    item: "",
    owner: "",
    location: "",
    value: "",
    status: "",
    createdate: "",
    comment: "",
    condition: "",
  },
  fetchAllItems: () => {},
  handleDelete: () => {},
  handleInsertActive: () => {},
  handleUpdateActive: () => {},
  handleUpdateActiveOFF: () => {},
  handleUpdateClick: () => {},
  handleInputChange: () => {},
  handleFieldClear: () => {},
  handleInsertClick: () => {},
};
export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
  const [items, setItems] = useState(initialContext.items);
  const [item, setItem] = useState(initialContext.item);
  const [insertActive, setinsertActive] = useState(initialContext.insertActive);
  const [updateActive, setUpdateActive] = useState(initialContext.updateActive);
  const [itemID, setitemID] = useState(initialContext.itemID);
  //Clear input field
  const handleFieldClear = () => {
    setItem(initialContext.item);
  };
  // When click UPDATE ITEM the field get filled with selected item data
  useEffect(() => {
    const foundItem = items.find((s) => s.id === itemID);
    if (foundItem) {
      setItem(foundItem);
    }
  }, [itemID, items]);
  //HANDLING INPUTCHANGE
  const handleInputChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // INSERT NEW ITEM AND UPDATE ITEM WINDOW
  const handleInsertActive = () => {
    handleFieldClear();
    setUpdateActive(false);
    setinsertActive(!insertActive);
  };

  const handleUpdateActive = (id) => {
    setinsertActive(false);
    setitemID(id);
    setUpdateActive(true);
  };

  const handleUpdateActiveOFF = () => {
    handleFieldClear();
    setUpdateActive(false);
  };

  // Get data from SQL
  const fetchAllItems = async () => {
    try {
      const res = await axios.get("http://localhost:8800/inventory");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(items);

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
  //Update selected item API
  const handleUpdateClick = async (e, item) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/inventory/" + itemID, item);
      fetchAllItems();
      handleUpdateActiveOFF();
      handleFieldClear();
    } catch (err) {
      console.log(err);
    }
  };
  //INSERTING NEW ITEM TO SQL
  const handleInsertClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/inventory", item);

      fetchAllItems();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  const value = {
    items,
    item,
    fetchAllItems,
    handleDelete,
    insertActive,
    handleInsertActive,
    updateActive,
    handleUpdateActive,
    itemID,
    setitemID,
    handleUpdateActiveOFF,
    handleUpdateClick,
    handleInputChange,
    setItem,
    handleFieldClear,
    handleInsertClick,
  };
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}
