import React, { useContext } from "react";
import { BreadcrumbContext } from "../../contexts/useBreadcrumb";
import OpenedPage from "../OpenedPage/OpenedPage";
import Operations from "../Operations/Operations";
import "./Subheader.css";

export default function Subheader() {
  const { breadcrumb } = useContext(BreadcrumbContext);
  return (
    <div className="subheader">
      <OpenedPage />
      {breadcrumb.length < 3 && <Operations />}
    </div>
  );
}
