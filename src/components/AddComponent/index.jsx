import { useState, useEffect } from "react";
import styles from "./style.module.css";

const Index = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [incompleteTasks, setIncompleteTasks] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      const newItem = { text: inputValue, showTick: false };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      setInputValue("");
    }
  };

  const handleDeleteItem = (index) => {
    if (!isEditing) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
    }
  };
  const handleDeleteAll = () => {
    const newItems = [];
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  const handleToggleTick = (index) => {
    if (isEditing) {
      return;
    }
    const newItems = [...items];
    newItems[index].showTick = !newItems[index].showTick;
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  const handleEditItem = (index) => {
    console.log("handleEditItem::index: ", index + " - isDeleting: ", isDeleting + " - EditingIndex: ", editingIndex);
    console.log("EditValue: ", editValue);
    if (!isDeleting) {
      setEditingIndex(index);
      console.log("handleEditItem::if::setEditingIndex::index: ", index + " - isDeleting: ", isDeleting);
      setEditValue(editValue);
      console.log("if::EditValue: ", editValue);
      const newItems = [...items];
      newItems[index].text = editValue; // Cập nhật nội dung mới
      console.log("if::newItems1: ", newItems);
      setItems(newItems);
      console.log("if::setItems::items: ", items);
      localStorage.setItem("items", JSON.stringify(newItems));
      console.log("if::localStorage.setItem::items: ", items);
      console.log("handleEditItem::if::items[index].text): ", items[index].text);
      console.log("handleEditItem::if::IsEditing: ", isEditing); //false
      setIsEditing(true); // didn't work, please check
      console.log("handleEditItem::if::setIsEditing::IsEditing: ", isEditing); //false
    }
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddItem();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);

    const incompleteCount = storedItems.filter(
      (items) => !items.showTick
    ).length;
    setIncompleteTasks(incompleteCount);
  }, []);

  const handleEditIconClick = (index) => {
    console.log("!!! index: ", index + " - editingIndex: ", editingIndex);
    if (editingIndex === index) {
      console.log("if1: editingIndex: ", editingIndex);
      setEditingIndex(null);
      console.log("if2: editingIndex: ", editingIndex);
    } else {
      console.log("else1: index: ", index + " - editingIndex: ", editingIndex);
      setEditingIndex(index);
      console.log("items: ", items);
      console.log("else2: index: ", index + " - editingIndex: ", editingIndex);
      setEditValue(items[index].text);
      console.log("items[index].text: ", items[index].text);
    }
  };

  // const handlecloseInput = () => {
  //   setEditingIndex(null);
  // }

  const handleTickIconClick = (index) => {
    // Khi nhấn vào ảnh thứ hai (tick) trong trạng thái chỉnh sửa, cập nhật nội dung và chuyển về trạng thái không chỉnh sửa
    const newItems = [...items];
    // console.log("text", index);
    // console.log("newItems", newItems);
    // newItems[index].text = editValue; // Cập nhật nội dung mới
    // setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
    // setEditingIndex(null); // Kết thúc chỉnh sửa

  };

  return (
    <>
      <div className={styles.inputContainer}>
        <img
          width="20px"
          height="20px"
          src="../../public/add-circle-outline.svg"
          alt=""
        />
        <input
          value={inputValue}
          type="text"
          id="month-input"
          className={styles.formControl}
          placeholder="add a new task"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.btn} onClick={handleAddItem}>
          Add
        </button>
      </div>

      <div className={styles.form}>
        <div className={styles.title}>
          <div className={styles.title_form}>{incompleteTasks} task left</div>
          <div onClick={handleDeleteAll} className={styles.clear_form}>
            clear all task
          </div>
        </div>

        <div>
          {items.map((item, index) => (
            <div key={index} className={styles.result}>
              <div className={styles.resultAdd}>
                <div
                  className={`${styles.checkbox} ${item.showTick ? styles.checkboxItem : ""
                    }`}
                  onClick={() => handleToggleTick(index)}
                >
                  {item.showTick && (
                    <img src=".././public/checkmark-outline.svg" alt="" />
                  )}
                </div>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                  // onBlur={() => handleTickIconClick(index)}
                  />
                ) : (
                  <div
                    className={`${styles.textResult} ${item.showTick ? styles.textResult_Item : ""
                      }`}
                  >
                    {item.text}
                  </div>
                )}
              </div>

              <div className={styles.img}>
                <div
                  className={styles.img_edit}
                  onClick={() => handleEditIconClick(index)}
                >
                  {editingIndex === index
                    ? (
                      // x icon
                      <svg
                        // onClick={() => handlecloseInput()}
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="14"
                        viewBox="0 0 512 512"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    ) : (
                      // edit icon
                      <svg
                        // onClick={() => handleTickIconClick(index)}
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="14"
                        viewBox="0 0 512 512"
                      >
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                      </svg>
                    )
                  }
                </div>

                <div className={styles.img_delete}>
                  {editingIndex === index ? (
                    // tick (save) icon
                    <svg
                      onClick={() => {
                        setIsDeleting(false);
                        handleEditItem(index);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="14"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  ) : (
                    // delete icon
                    <svg
                      onClick={() => {
                        setIsDeleting(true);
                        handleDeleteItem(index);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="14"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
