import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../constants/Data.jsx";

const AuthContext = React.createContext();

function AuthContextProvider({children}) {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null);
    const [user, setUser] = useState(null);
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
            localStorage.setItem("authTokens", JSON.stringify(data.token));
            navigate("/partners");
        }
        if (response.status >= 400) {
            return "Ошибка с сервера"
        }
    };

    const registerUser = async (values) => {
        const formData = new FormData();

        formData.append("city", values.city);
        formData.append("company", values.companyName);
        formData.append("contacts", values.contacts);
        formData.append("email", values.email);
        const response = await fetch(`${BASE_URL}/accounts/register-email/`, {
            method: "POST",
            body: formData
        });
        if (response.status === 200) {
            navigate("/partners/login");
        } else {
            return "Ошибка с сервера"
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null)
        localStorage.removeItem("authTokens");
        navigate("/");
    };

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(`${BASE_URL}/accounts/get-user-by-token/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Token ${authTokens?.access}`
                    },
                }).then(res=> res.json()).then(data=> data);
                setUser(response)
            } catch (error) {
                console.error(error);
            }
        }
        if (authTokens)
            getUserData()
        setLoading(false);
    }, [authTokens])

    return (
        <AuthContext.Provider
            value={{
                user,
                authTokens,
                setAuthTokens,
                registerUser,
                loginUser,
                logoutUser
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export {AuthContextProvider, AuthContext};