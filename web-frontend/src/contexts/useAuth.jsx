import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

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
        const response = await fetch("http://127.0.0.1:8000/accounts/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: values.email,
                password: values.password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data.token);
            setUser(jwt_decode(data.token.access));
            localStorage.setItem("authTokens", JSON.stringify(data.token));
            navigate("/partners");
        } else {
            console.log("response",response)
        }
    };

    const registerUser = async (username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password2
            })
        });
        if (response.status === 201) {
            navigate("/partners/login");
        } else {
            alert("Something went wrong!");
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