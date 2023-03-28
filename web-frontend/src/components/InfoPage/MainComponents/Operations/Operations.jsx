import React, {useContext} from "react";
import {AddBusSubpageCrumb} from "../../../../constants/BreadcrumbItems.jsx";
import AddBtn from "../../../custom/Button/Button.jsx";
import RemoveBtn from "../../../custom/Button/Button.jsx";
import "./Operations.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";

export default function Operations() {
    const {goToSubpage, context} = useContext(BreadcrumbContext);
    const {items, deleteOn, setDeleteOn, add} = context;
    console.log("operations", context)

    function onDelete() {
        setDeleteOn(!deleteOn);
    }

    function onAdd() {
        const subpagecrumb = AddBusSubpageCrumb(add);
        goToSubpage(subpagecrumb);
    }

    return (
        <div className="operations">
            <AddBtn name="Добавить"
                    style={!deleteOn ? addBtnStyle : {
                        ...addBtnStyle,
                        ...opacityStyle,
                    }} onClick={onAdd} disabled={deleteOn}/>
            <RemoveBtn
                name="Удалить"
                style={
                    items.length
                        ? removeBtnStyle
                        : {
                            ...removeBtnStyle,
                            ...opacityStyle,
                        }
                }
                disabled={!items.length}
                onClick={onDelete}
            />
        </div>
    );
}

const addBtnStyle = {
    backgroundColor: "#34A160",
    color: "white",
    padding: "12px 14px"
};
const removeBtnStyle = {
    backgroundColor: "#C93C3C",
    color: "white",
    padding: "12px 14px"
};

const opacityStyle = {opacity: "0.6"}