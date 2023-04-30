import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import CardPage from "../pages/Partners/CardPage/CardPage.jsx";
import PassengersPage from "../pages/PassengersPage/PassengersPage.jsx";
import Header from "./Header/Header";
import LoginPage from "../pages/AuthPages/LoginPage";
import RegistrationPage from "../pages/AuthPages/RegistrationPage";
import {FeaturesContext} from "../contexts/useFeatures.jsx";
import {useContext} from "react";
import PrivateRoute from "../utils/PrivateRoute.jsx";
import PartnersMainPage from "../pages/Partners/PartnersPage/PartnersMainPage.jsx";

function App() {
    const commonContext = useContext(FeaturesContext);

    return (
        <>
            <Header/>
            <Routes>
                <Route index path="/" element={<HomePage/>}/>
                <Route path="/passengers" element={<PassengersPage/>}/>
                <Route exact path='/partners' element={<PrivateRoute/>}>
                    <Route exact path="/partners" element={<PartnersMainPage/>}/>
                </Route>
                <Route  path='/partners/routes' element={<PrivateRoute/>}>
                    <Route  path="/partners/routes" element={<CardPage pageName={"Маршруты"} context={commonContext.routeContext}/>}/>
                </Route>
                <Route  path='/partners/buses' element={<PrivateRoute/>}>
                    <Route  path="/partners/buses" element={<CardPage pageName={"Автобусы"} context={commonContext.busContext}/>}/>
                </Route>
                <Route  path='/partners/reports' element={<PrivateRoute/>}>
                    <Route  path="/partners/reports" element={<CardPage pageName={"Отчеты"} context={commonContext.reportContext}/>}/>
                </Route>
                <Route  path="/partners/login" element={<LoginPage/>}/>
                <Route  path="/partners/register" element={<RegistrationPage/>}/>
                {/*<Route path="/contacts" element={<ContactsPage />} />*/}
                {/*<Route path="/about" element={<AboutPage />} />*/}
            </Routes>
        </>
    );
}

export default App;
