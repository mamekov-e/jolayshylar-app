import React from "react";
import { Link } from "react-router-dom";
import routesImg from "../../assets/partners/homePage/routes-icon.svg";
import busesImg from "../../assets/partners/homePage/buses-icon.svg";
import reportsImg from "../../assets/partners/homePage/reports-icon.png";
import "./Card.css";

export default function Card({ data }) {
  const { imgSrc, linkToValue, description, btnName } = data;
  var img = "";

  if (imgSrc === "routes-icon.svg") {
    img = routesImg;
  } else if (imgSrc === "buses-icon.svg") {
    img = busesImg;
  } else if (imgSrc === "reports-icon.png") {
    img = reportsImg;
  }

  return (
    <div className="cardSection">
      <img src={img} />
      <h4 className="cardDescription">{description}</h4>
      <Link to={linkToValue}>
        <button className="thirdBtn">{btnName}</button>
      </Link>
    </div>
  );
}
