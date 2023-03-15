import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <button
      className="primaryBtn"
      type={props.type}
      style={props.style}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}
