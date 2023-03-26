import AllBusesSubpage from "../components/InfoPage/BusPages/AllBusesPage/AllBusesSubpage";
import BusActionsSubpage from "../components/InfoPage/BusPages/BusActionsPage/BusActionsSubpage";
import BusForm from "../components/InfoPage/BusPages/BusForm/BusForm";
import BusInfo from "../components/InfoPage/BusPages/BusInfo/BusInfo";

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

export const BusInfoSubpageCrumb = (bus) => {
  return {
    name: bus.number,
    component: <BusActionsSubpage page={<BusInfo bus={bus} />} />,
    link: "#",
    subPageName: "busInfo",
  };
};

export const EditBusSubpageCrumb = (bus, editBus) => {
  return {
    name: "Редактировать автобус",
    component: (
      <BusActionsSubpage page={<BusForm submitForm={editBus} bus={bus} />} />
    ),
    link: "#",
    subPageName: "edit",
  };
};

export const AddBusSubpageCrumb = (addBus) => {
  return {
    name: "Добавить автобус",
    component: <BusActionsSubpage page={<BusForm submitForm={addBus} />} />,
    link: "#",
    subPageName: "add",
  };
};
