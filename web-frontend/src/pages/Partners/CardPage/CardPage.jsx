import React from "react";
import Divider from "../../../components/custom/Divider/Divider";
import Subheader from "../../../components/InfoPage/BusPages/PageSubheader/Subheader";
import SearchComponent from "../../../components/InfoPage/BusPages/Search/SearchComponent";
import "./CardPage.css";

export default function CardPage({pageName, subpage}) {

  return (
    <main>
      <div className="pageHeader">
        <h2>{pageName} компании</h2>
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
