import React, { useContext } from "react";
import { BusContext } from "../../contexts/useBus";
import AddBtn from "../custom/Button/Button";
import EditBtn from "../custom/Button/Button";
import RemoveBtn from "../custom/Button/Button";
import "./Operations.css";

export default function Operations() {
  const { goToSubpage, busItems, deleteOn, setDeleteOn } =
    useContext(BusContext);

  function onDelete() {
    setDeleteOn(!deleteOn);
  }

  function onAdd() {
    goToSubpage("add");
  }

  return (
    <div className="operations">
      <AddBtn name="Добавить" style={addBtnStyle} onClick={onAdd} />
      {/* <EditBtn name="Редактировать" style={editBtnStyle} /> */}
      <RemoveBtn
        name="Удалить"
        style={
          busItems.length
            ? removeBtnStyle
            : {
                ...removeBtnStyle,
                ...{ backgroundColor: "rgba(201, 60, 60, 0.6)" },
              }
        }
        onClick={onDelete}
      />
    </div>
  );
}

const addBtnStyle = {
  backgroundColor: "#34A160",
  color: "white",
  padding: "12px 14px",
};
const editBtnStyle = {
  backgroundColor: "#3466A1",
  color: "white",
  padding: "12px 14px",
};
const removeBtnStyle = {
  backgroundColor: "#C93C3C",
  color: "white",
  padding: "12px 14px",
};
