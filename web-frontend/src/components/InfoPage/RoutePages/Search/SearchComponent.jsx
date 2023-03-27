import React from "react";
import InputText from "../../../custom/InputText/InputText.jsx";
import SearchBtn from "../../../custom/Button/Button.jsx";
import "./SearchComponent.css";

export default function SearchComponent() {
  return (
    <div className="searchPanel">
      <InputText placeholder="Найти маршрут" />
      <SearchBtn name="Поиск" />
    </div>
  );
}
