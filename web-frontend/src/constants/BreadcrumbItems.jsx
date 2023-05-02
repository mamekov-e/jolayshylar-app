import ItemActionsFormSubpage from "../components/InfoPage/MainComponents/ItemActionsFormSubpage/ItemActionsFormSubpage.jsx";
import BusForm from "../components/InfoPage/BusPages/BusForm/BusForm";
import BusInfoSubpage from "../components/InfoPage/BusPages/BusInfoSubpage/BusInfoSubpage.jsx";
import RouteForm from "../components/InfoPage/RoutePages/RouteForm/RouteForm.jsx";
import RouteInfoSubpage from "../components/InfoPage/RoutePages/RouteInfoSubpage/RouteInfoSubpage.jsx";
import AllReportsComponent from "../components/InfoPage/ReportsPages/AllReportsComponent/AllReportsComponent.jsx";
import ReportInfoSubpage from "../components/InfoPage/ReportsPages/ReportInfoSubpage/ReportInfoSubpage.jsx";
import AllBusesComponent from "../components/InfoPage/BusPages/AllBusesComponent/AllBusesComponent.jsx";
import AllRoutesComponent from "../components/InfoPage/RoutePages/AllRoutesComponent/AllRoutesComponent.jsx";
import BusMapInfoSubpage from "../components/InfoPage/BusPages/BusMapInfoSubpage/BusMapInfoSubpage.jsx";

export const MainPageCrumb = {
    name: "Главная",
    component: null,
    link: "/partners",
    subPageName: "#",
};

export const AllBusesSubpageCrumb = {
    name: "Все автобусы",
    component: <AllBusesComponent />,
    link: "#",
    subPageName: "all",
};

export const AllRoutesSubpageCrumb = {
    name: "Все маршруты",
    component: <AllRoutesComponent />,
    link: "#",
    subPageName: "all",
};

export const AllReportsSubpageCrumb = {
    name: "Все отчеты",
    component: <AllReportsComponent InfoSubpage={ReportInfoSubpageCrumb}/>,
    link: "#",
    subPageName: "all",
};

export function BusInfoSubpageCrumb(bus) {
    return {
        name: bus.transport_number,
        component: <ItemActionsFormSubpage page={<BusMapInfoSubpage bus={bus}/>}/>,
        link: "#",
        subPageName: "busInfo",
    };
}

export function RouteInfoSubpageCrumb(route) {
    return {
        name: route.route_name,
        component: <ItemActionsFormSubpage page={<RouteInfoSubpage route={route}/>}/>,
        link: "#",
        subPageName: "routeInfo",
    };
}

export function ReportInfoSubpageCrumb(report) {
    return {
        name: report.route_name + " - " +report.transport_number,
        component: <ItemActionsFormSubpage page={<ReportInfoSubpage route={report}/>}/>,
        link: "#",
        subPageName: "routeInfo",
    };
}

export function EditBusSubpageCrumb(bus, editBus) {
    return {
        name: "Редактировать автобус",
        component: (
            <ItemActionsFormSubpage page={<BusForm submitForm={editBus} bus={bus}/>}/>
        ),
        link: "#",
        subPageName: "edit",
    };
}

export function EditRouteSubpageCrumb(route, editRoute) {
    return {
        name: "Редактировать маршрут",
        component: (
            <ItemActionsFormSubpage page={<RouteForm submitForm={editRoute} route={route}/>}/>
        ),
        link: "#",
        subPageName: "edit",
    };
}

export const AddBusSubpageCrumb = (add) => {
    return {
        name: "Добавить автобус",
        component: <ItemActionsFormSubpage page={<BusForm submitForm={add}/>}/>,
        link: "#",
        subPageName: "add",
    };
};

export const AddRouteSubpageCrumb = (add) => {
    return {
        name: "Добавить маршрут",
        component: <ItemActionsFormSubpage page={<RouteForm submitForm={add}/>}/>,
        link: "#",
        subPageName: "add",
    };
};
