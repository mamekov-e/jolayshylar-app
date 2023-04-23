import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/useAuth.jsx";

export default function PrivateRoute() {
    const {user} = useContext(AuthContext);
    return user ? <Outlet/> : <Navigate to="/partners/login"/>;
};