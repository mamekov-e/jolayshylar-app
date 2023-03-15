import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BusContext } from "../../contexts/useBus";
import openedPageIcon from "../../assets/partners/pages/openedPage.svg";
import "./OpenedPage.css";

export default function OpenedPage() {
  const { subpage, goToSubpage, isSubpageOpen } = useContext(BusContext);
  const navigate = useNavigate();
  const isAllBusesSubpageOpen = !isSubpageOpen("Все");

  return (
    <div className="openedPage">
      <h3
        className={"pageName"}
        style={styleOpacityColor}
        onClick={() => navigate("/partners")}
      >
        Главная <img src={openedPageIcon} className="separatorIcon" />
      </h3>
      <h3
        className={"pageName"}
        style={isAllBusesSubpageOpen ? styleOpacityColor : styleColor}
        onClick={() => goToSubpage("all")}
      >
        Все автобусы
        {isAllBusesSubpageOpen && (
          <>
            <img src={openedPageIcon} className="separatorIcon" />
            <span className="subpage">{subpage.name}</span>
          </>
        )}
      </h3>
    </div>
  );
}

const styleOpacityColor = {
  color: "rgba(1, 78, 109, 0.6)",
};

const styleColor = {
  color: "#014E6D",
};
