import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import PartnersPage from "../pages/Partners/PartnersPage/PartnersPage";
import CardPage from "../pages/Partners/CardPage/CardPage.jsx";
import PassengersPage from "../pages/PassengersPage";
import ContactsPage from "../pages/ContactsPage";
import AboutPage from "../pages/AboutPage";
import Header from "./Header/Header";
import LoginPage from "../pages/AuthPages/LoginPage";
import RegistrationPage from "../pages/AuthPages/RegistrationPage";
import {FeaturesContext} from "../contexts/useFeatures.jsx";
import {useContext} from "react";

function App() {
  const commonContext = useContext(FeaturesContext);

  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/passengers" element={<PassengersPage />} />
        <Route exact="true" path="/partners" element={<PartnersPage />} />
        <Route path="/partners/routes" element={<CardPage pageName={"Маршруты"} context={commonContext.routeContext}/>} />
        <Route path="/partners/buses" element={<CardPage pageName={"Автобусы"} context={commonContext.busContext}/>}/>
        <Route path="/partners/reports" element={<CardPage pageName={"Отчеты"} context={commonContext.reportContext}/>} />
        <Route path="/partners/login" element={<LoginPage />} />
        <Route path="/partners/register" element={<RegistrationPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
