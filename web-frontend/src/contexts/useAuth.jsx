import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../constants/Data.jsx";
import axiosUtil from "../utils/axiosUtil.jsx";

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
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function fetchUserData() {
        try {
            const response = await fetch(`${BASE_URL}/accounts/get-user-by-id/?` + new URLSearchParams({id: user.user_id}), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${authTokens?.access}`
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

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
            console.log("data", data)
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
        userData,
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
            fetchUserData()
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