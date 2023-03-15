import React, { useContext } from "react";
import { BusContext } from "../../contexts/useBus";
import OpenedPage from "../OpenedPage/OpenedPage";
import Operations from "../Operations/Operations";
import "./Subheader.css";

export default function Subheader() {
  const { isSubpageOpen } = useContext(BusContext);

  return (
    <div className="subheader">
      <OpenedPage />
      {isSubpageOpen() && <Operations />}
    </div>
  );
}
