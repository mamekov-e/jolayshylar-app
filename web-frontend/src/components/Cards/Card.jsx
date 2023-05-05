import React, { useContext } from "react";
import { Link } from "react-router-dom";
import routesImg from "../../assets/partners/homePage/routes-icon.svg";
import busesImg from "../../assets/partners/homePage/buses-icon.svg";
import reportsImg from "../../assets/partners/homePage/reports-icon.png";
import "./Card.css";
import { BreadcrumbContext } from "../../contexts/useBreadcrumb";
import {
  AllBusesSubpageCrumb,
  AllReportsSubpageCrumb,
  AllRoutesSubpageCrumb
} from "../../constants/BreadcrumbItems";

export default function Card({ data }) {
  const { setSubpageData, goToSubpage } = useContext(BreadcrumbContext);

  const { imgSrc, linkToValue, description, btnName } = data;
  let img = "";
  let subpageToOpen;

  if (imgSrc === "routes-icon.svg") {
    img = routesImg;
    subpageToOpen = AllRoutesSubpageCrumb;
  } else if (imgSrc === "buses-icon.svg") {
    img = busesImg;
    subpageToOpen = AllBusesSubpageCrumb;
  } else if (imgSrc === "reports-icon.png") {
    img = reportsImg;
    subpageToOpen = AllReportsSubpageCrumb;
  }

  return (
    <div className="cardSection">
      <img src={img} />
      <h4 className="cardDescription">{description}</h4>
      <Link to={linkToValue}>
        <button className="thirdBtn" onClick={() => {
          setSubpageData(subpageToOpen)
          goToSubpage(subpageToOpen)
        }}>
          {btnName}
        </button>
      </Link>
    </div>
  );
}
