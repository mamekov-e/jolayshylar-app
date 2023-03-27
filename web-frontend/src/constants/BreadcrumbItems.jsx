import AllBusesSubpage from "../components/InfoPage/BusPages/Subpages/AllBusesSubpage/AllBusesSubpage.jsx";
import BusActionsFormSubpage from "../components/InfoPage/BusPages/Subpages/BusActionsFormSubpage/BusActionsFormSubpage.jsx";
import BusForm from "../components/InfoPage/BusPages/Subpages/BusActionsFormSubpage/BusForm/BusForm";
import BusInfoSubpage from "../components/InfoPage/BusPages/Subpages/BusInfoSubpage/BusInfoSubpage.jsx";
import AllRoutesSubpage from "../components/InfoPage/RoutePages/Subpages/AllRoutesSubpage/AllRoutesSubpage.jsx";
import RouteActionsFormSubpage
  from "../components/InfoPage/RoutePages/Subpages/RouteActionsFormSubpage/RouteActionsFormSubpage.jsx";
import RouteInfoSubpage from "../components/InfoPage/RoutePages/Subpages/RouteInfoSubpage/RouteInfoSubpage";
import RouteForm from "../components/InfoPage/RoutePages/Subpages/RouteActionsFormSubpage/RouteForm/RouteForm.jsx";

export const MainPageCrumb = {
  name: "Главная",
  component: null,
  link: "/partners",
  subPageName: "#",
};

export const AllBusesSubpageCrumb = {
  name: "Все автобусы",
  component: <AllBusesSubpage />,
  link: "#",
  subPageName: "all",
};

export const AllRoutesSubpageCrumb = {
  name: "Все маршруты",
  component: <AllRoutesSubpage />,
  link: "#",
  subPageName: "all",
};

export const BusInfoSubpageCrumb = (bus) => {
  return {
    name: bus.number,
    component: <BusActionsFormSubpage page={<BusInfoSubpage bus={bus} />} />,
    link: "#",
    subPageName: "busInfo",
  };
};

export const RouteInfoSubpageCrumb = (route) => {
  return {
    name: route.number,
    component: <RouteActionsFormSubpage page={<RouteInfoSubpage bus={route} />} />,
    link: "#",
    subPageName: "busInfo",
  };
};

export const EditBusSubpageCrumb = (bus, editBus) => {
  return {
    name: "Редактировать автобус",
    component: (
      <BusActionsFormSubpage page={<BusForm submitForm={editBus} bus={bus} />} />
    ),
    link: "#",
    subPageName: "edit",
  };
};

export const EditRouteSubpageCrumb = (bus, editBus) => {
  return {
    name: "Редактировать маршрут",
    component: (
        <RouteActionsFormSubpage page={<RouteForm submitForm={editBus} bus={bus} />} />
    ),
    link: "#",
    subPageName: "edit",
  };
};

export const AddBusSubpageCrumb = (addBus) => {
  return {
    name: "Добавить автобус",
    component: <BusActionsFormSubpage page={<BusForm submitForm={addBus} />} />,
    link: "#",
    subPageName: "add",
  };
};

export const AddRouteSubpageCrumb = (addBus) => {
  return {
    name: "Добавить маршрут",
    component: <RouteActionsFormSubpage page={<RouteForm submitForm={addBus} />} />,
    link: "#",
    subPageName: "add",
  };
};
