import React, { useContext } from "react";
import { BreadcrumbContext } from "../../../../contexts/useBreadcrumb.jsx";
import OpenedPage from "../OpenedPage/OpenedPage.jsx";
import Operations from "../Operations/Operations.jsx";
import "./Subheader.css";

export default function Subheader() {
  const { breadcrumb } = useContext(BreadcrumbContext);
  return (
    <div className="subheader">
      <OpenedPage />
      {(breadcrumb.length < 3 && !location.pathname.includes("/reports")) && <Operations />}
    </div>
  );
}
