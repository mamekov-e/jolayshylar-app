import React, { useContext, useState } from "react";
import Divider from "../../../components/custom/Divider/Divider";
import Subheader from "../../../components/PageSubheader/Subheader";
import SearchComponent from "../../../components/Search/SearchComponent";
import { BusContext } from "../../../contexts/useBus";
import "./BusesPage.css";

export default function BusesPage() {
  const { subpage } = useContext(BusContext);

  return (
    <main>
      <div className="pageHeader">
        <h2>Автобусы компании</h2>
        <SearchComponent />
      </div>
      <div className="section">
        <Subheader />
        <Divider />
        <div className="subpagesStyle">{subpage.component}</div>
      </div>
    </main>
  );
}
