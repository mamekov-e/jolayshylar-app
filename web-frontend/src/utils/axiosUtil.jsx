import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import {AuthContext} from "../contexts/useAuth.jsx";
import {BASE_URL} from "../constants/Data.jsx";


const axiosUtil = () => {
    const { authTokens, setAuthTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: { Authorization: `Token ${authTokens?.access}` }
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwt_decode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        const response = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: authTokens.refresh
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data));

        setAuthTokens(response.data);

        req.headers.Authorization = `Token ${response.data.access}`;
        return req;
    });

    return axiosInstance;
};

export default axiosUtil;