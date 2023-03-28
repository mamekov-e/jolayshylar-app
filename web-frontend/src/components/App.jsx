import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import PartnersPage from "../pages/Partners/PartnersPage/PartnersPage";
import CardPage from "../pages/Partners/CardPage/CardPage.jsx";
import ReportsPage from "../pages/Partners/ReportsPage/ReportsPage";
import PassengersPage from "../pages/PassengersPage";
import ContactsPage from "../pages/ContactsPage";
import AboutPage from "../pages/AboutPage";
import Header from "./Header/Header";
import LoginPage from "../pages/AuthPages/LoginPage";
import RegistrationPage from "../pages/AuthPages/RegistrationPage";
import {BusRouteContext} from "../contexts/useBusRoute.jsx";
import {useContext} from "react";

function App() {
  const commonContext = useContext(BusRouteContext);

  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/passengers" element={<PassengersPage />} />
        <Route exact="true" path="/partners" element={<PartnersPage />} />
        <Route path="/partners/routes" element={<CardPage pageName={"Маршруты"} context={commonContext.routeContext}/>} />
        <Route path="/partners/buses" element={<CardPage pageName={"Автобусы"} context={commonContext.busContext}/>}/>
        <Route path="/partners/reports" element={<ReportsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
