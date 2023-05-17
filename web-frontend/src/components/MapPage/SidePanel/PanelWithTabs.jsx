import React from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import RouteListPanel from "./RouteListPanel.jsx";
import SearchPanel from "./SearchPanel.jsx";
import "./SidePanel.css"

function PanelWithTabs({
                           isPanelOpen,
                           saveDirection,
                           handleRouteItemClicked,
                           setOriginFocused,
                           setDestinationFocused,
                           originPoints,
                           destinationPoints
                       }) {

    return (
        <div>
            {isPanelOpen && (
                <Tabs>
                    <TabList>
                        <Tab>Доступные маршруты</Tab>
                        <Tab>Найти маршрут</Tab>
                    </TabList>

                    <TabPanel>
                        <RouteListPanel saveDirection={saveDirection}
                                        handleRouteItemClicked={handleRouteItemClicked}/>
                    </TabPanel>
                    <TabPanel>
                        <SearchPanel saveDirection={saveDirection}
                                     handleRouteItemClicked={handleRouteItemClicked}
                                     originPoints={originPoints}
                                     destinationPoints={destinationPoints}
                                     setOriginFocused={setOriginFocused}
                                     setDestinationFocused={setDestinationFocused}/>
                    </TabPanel>
                </Tabs>
            )}
        </div>
    );
}

export default PanelWithTabs;
