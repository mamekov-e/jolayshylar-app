import React, {useContext, useEffect, useState} from "react";
import DeleteActions from "../DeleteActions/DeleteActions.jsx";
import "./AllItemsSubpage.css"
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import ReactTable from "../Table/ReactTable.jsx";

export default function AllItemsSubpage({Item, InfoSubpage}) {
    const {context, goToSubpage} = useContext(BreadcrumbContext);
    const {items, columns, deleteOn, remove} = context;
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        setSelectedItems([]);
    }, [items, deleteOn]);

    function getAllItems() {
        return items.map((item) => {
            return (
                <Item
                    key={item.id}
                    item={item}
                    selected={selectedItems.includes(item)}
                    onSelect={handleSelect}
                    onOpen={handleOpen}
                />
            );
        });
    }

    const handleOpen = (item) => {
        const subpagecrumb = InfoSubpage(item);
        goToSubpage(subpagecrumb);
    };

    const handleSelect = (item) => {
        setSelectedItems(
            selectedItems.includes(item)
                ? selectedItems.filter((i) => i !== item)
                : [...selectedItems, item]
        );
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items);
        }
    };

    const handleDeleteSelected = () => {
        const selectedItemsIds = selectedItems.map((item) => item.id);
        remove(selectedItemsIds);
    };

    const isAllSelected = selectedItems.length === items.length;

    return (
        <>
            {deleteOn && (
                <DeleteActions
                    onSelectAll={handleSelectAll}
                    onDeleteSelected={handleDeleteSelected}
                    isAllSelected={isAllSelected}
                    selectedItems={selectedItems}
                />
            )}
            <div className="allItemsSubpage">
                {/*<ReactTable data={items} columns={columns}/>*/}
                {items.length ? (
                    <div className="itemsList">{getAllItems()}</div>
                ) : (
                    <h3 className="emptyListText">Список пуст</h3>
                )}
            </div>
        </>
    );
}
