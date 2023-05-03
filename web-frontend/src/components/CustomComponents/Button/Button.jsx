import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <button
      className="primaryBtn"
      {...props}
    >
      {props.name}
    </button>
  );
}
