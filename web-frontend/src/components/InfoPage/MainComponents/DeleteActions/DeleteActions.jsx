import React, {useContext} from "react";
import "./DeleteActions.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";

export default function DeleteActions({
                                          onSelectAll,
                                          onDeleteSelected,
                                          isAllSelected,
                                          selectedItems,
                                      }) {
    const {context} = useContext(BreadcrumbContext);
    const {setDeleteOn, items} = context;

    function onCancel() {
        setDeleteOn(false);
    }

    const atLeastOneSelected = selectedItems.length > 0;

    return (
        <>
            {items.length ? (
                <div className="deleteActions">
                    {atLeastOneSelected && (
                        <h3 className="deleteAll" onClick={() => onDeleteSelected()}>
                            Удалить отмеченные
                        </h3>
                    )}
                    <h3 className="selectAll" onClick={() => onSelectAll()}>
                        {atLeastOneSelected && isAllSelected
                            ? "Отменить выделение"
                            : "Выделить все"}
                    </h3>
                    <h3 className="cancel" onClick={onCancel}>
                        Отмена
                    </h3>
                </div>
            ) : (
                ""
            )}
        </>
    );
}
