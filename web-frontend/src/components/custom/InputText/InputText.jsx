import React from "react";
import "./InputText.css";

function InputText({ ...props }) {
  return <input className="textBox" {...props} />;
}

export default InputText;
