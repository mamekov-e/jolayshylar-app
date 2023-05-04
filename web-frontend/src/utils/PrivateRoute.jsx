import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/useAuth.jsx";

export default function PrivateRoute() {
    const {authTokens} = useContext(AuthContext);
    return authTokens ? <Outlet/> : <Navigate to="/partners/login"/>;
};