import React, {useContext} from "react";
import openedPageIcon from "../../../../assets/partners/pages/openedPage.svg";
import "./OpenedPage.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";

export default function OpenedPage() {
    const {breadcrumb, goToSubpage} = useContext(BreadcrumbContext);
    const TOTAL_ITEMS = breadcrumb.length;

    const onItemClick = (subpageToOpen) => {
        goToSubpage(subpageToOpen);
    };

    return (
        <div className="openedPage">
            {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                    <BreadcrumbItemView
                        id={index}
                        item={item}
                        itemsSize={TOTAL_ITEMS}
                        onItemClick={onItemClick}
                    />
                    {index < TOTAL_ITEMS - 1 && <SeparatorView/>}
                </React.Fragment>
            ))}
        </div>
    );
}

function SeparatorView() {
    return <img src={openedPageIcon} className="separatorIcon"/>;
}

function BreadcrumbItemView({id, item, itemsSize, onItemClick}) {
    return (
        <div
            className="pageName"
            onClick={() => {
                onItemClick(item);
            }}
            style={id !== itemsSize - 1 ? styleOpacityColor : styleColor}
        >
            {item.name}
        </div>
    );
}

const styleOpacityColor = {
    color: "rgba(1, 78, 109, 0.6)",
};

const styleColor = {
    color: "#014E6D",
};
