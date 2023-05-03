import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../constants/Data.jsx";

const AuthContext = React.createContext();

function AuthContextProvider({children}) {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (values) => {
        const response = await fetch(`${BASE_URL}/accounts/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: values.email,
                password: values.password
            })
        })
        if (response.status === 200) {
            const data = await response.json();
            setAuthTokens(data.token);
            setUser(jwt_decode(data.token.access));
            localStorage.setItem("authTokens", JSON.stringify(data.token));
            navigate("/partners");
        }
        if (response.status >= 400) {
            return "Ошибка с сервера"
        }
    };

    const registerUser = async (values) => {
        const response = await fetch(`${BASE_URL}/accounts/register-email/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                city: values.city,
                company: values.companyName,
                email: values.email,
                contacts: values.contacts,
            })
        });
        if (response.status === 200) {
            navigate("/partners/login");
        } else {
            return "Ошибка с сервера"
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/");
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider
            value={contextData}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export {AuthContextProvider, AuthContext};