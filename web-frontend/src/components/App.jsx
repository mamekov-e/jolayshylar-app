import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import PartnersPage from "../pages/Partners/PartnersPage/PartnersPage";
import RoutesPage from "../pages/Partners/RoutesPage/RoutesPage";
import BusesPage from "../pages/Partners/BusesPage/BusesPage";
import ReportsPage from "../pages/Partners/ReportsPage/ReportsPage";
import PassengersPage from "../pages/PassengersPage";
import ContactsPage from "../pages/ContactsPage";
import AboutPage from "../pages/AboutPage";
import Header from "./Header/Header";
import LoginPage from "../pages/AuthPages/LoginPage";
import RegistrationPage from "../pages/AuthPages/RegistrationPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/passengers" element={<PassengersPage />} />
        <Route exact="true" path="/partners" element={<PartnersPage />} />
        <Route path="/partners/routes" element={<RoutesPage />} />
        <Route path="/partners/buses" element={<BusesPage />} />
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
