import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const initialContext = {
  items: [],
  activeItems: [],
  transferItems: [],
  remowedItems: [],
  insertActive: false,
  updateActive: false,
  itemID: null,
  selectedMenu: 0,

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
  handleActiveItems: () => {},
  handleRemowedItems: () => {},
  handleTranfsersItems: () => {},
};
export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
  const [items, setItems] = useState(initialContext.items);
  const [item, setItem] = useState(initialContext.item);
  const [insertActive, setinsertActive] = useState(initialContext.insertActive);
  const [updateActive, setUpdateActive] = useState(initialContext.updateActive);
  const [itemID, setitemID] = useState(initialContext.itemID);
  const [activeItems, setActiveItems] = useState(initialContext.activeItems);
  const [transferItems, setTransferItems] = useState(
    initialContext.transferItems
  );
  const [remowedItems, setRemowedItems] = useState(initialContext.remowedItems);
  const [visibleItems, setVisibleItems] = useState(items);
  const [selectedMenu, setSelectedMenu] = useState(initialContext.selectedMenu);

  // ITEM array is filled with data ant first page opening
  useEffect(function () {
    fetchAllItems();
  }, []);
  useEffect(() => {
    const foundItem = items.find((s) => s.id === itemID);
    if (foundItem) {
      setItem(foundItem);
    }
  }, [itemID, items]);
  //Clear input field
  const handleFieldClear = () => {
    setItem(initialContext.item);
  };

  //HANDLING INPUTCHANGE
  const handleInputChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // INSERT NEW ITEM AND UPDATE ITEM WINDOW
  const handleInsertActive = () => {
    handleFieldClear();
    setUpdateActive(false);
    setinsertActive(!insertActive);
    setSelectedMenu(1);
    setitemID(initialContext.itemID);
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
  const handleActiveItems = () => {
    setUpdateActive(false);
    setinsertActive(false);
    handleFieldClear();
  };

  const handleRemowedItems = () => {
    setUpdateActive(false);
    setinsertActive(false);
    handleFieldClear();
  };

  const handleTranfsersItems = () => {
    setUpdateActive(false);
    setinsertActive(false);
    handleFieldClear();
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
    // handleFieldClear();
    try {
      await axios.post("http://localhost:8800/inventory", item);

      fetchAllItems();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  // ITEM filters array is filled with data ant first page opening
  useEffect(
    function () {
      setActiveItems(items.filter((item) => item.status === "Active"));
      setRemowedItems(items.filter((item) => item.status === "Remowed"));
      setTransferItems(items.filter((item) => item.status === "Transfer"));
      setVisibleItems(items); // Show all items by defaul
    },
    [items]
  );
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
    handleActiveItems,
    handleRemowedItems,
    handleTranfsersItems,
    visibleItems,
    activeItems,
    transferItems,
    remowedItems,
    selectedMenu,
    setSelectedMenu,
    setinsertActive,
    setUpdateActive,
  };
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}
