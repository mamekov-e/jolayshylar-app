import React, { useContext } from "react";
import { Link } from "react-router-dom";
import routesImg from "../../assets/partners/homePage/routes-icon.svg";
import busesImg from "../../assets/partners/homePage/buses-icon.svg";
import reportsImg from "../../assets/partners/homePage/reports-icon.png";
import "./Card.css";
import { BreadcrumbContext } from "../../contexts/useBreadcrumb";
import {AllBusesSubpageCrumb, AllRoutesSubpageCrumb} from "../../constants/BreadcrumbItems";
import { BusContext } from "../../contexts/useBus";

export default function Card({ data }) {
  const { goToSubpage } = useContext(BusContext);

  const { imgSrc, linkToValue, description, btnName } = data;
  var img = "";
  var subpageToOpen;

  if (imgSrc === "routes-icon.svg") {
    img = routesImg;
    subpageToOpen = AllRoutesSubpageCrumb;
  } else if (imgSrc === "buses-icon.svg") {
    img = busesImg;
    subpageToOpen = AllBusesSubpageCrumb;
  } else if (imgSrc === "reports-icon.png") {
    img = reportsImg;
  }

  return (
    <div className="cardSection">
      <img src={img} />
      <h4 className="cardDescription">{description}</h4>
      <Link to={linkToValue}>
        <button className="thirdBtn" onClick={() => goToSubpage(subpageToOpen)}>
          {btnName}
        </button>
      </Link>
    </div>
  );
}
