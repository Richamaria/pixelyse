import { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [error, setError] = useState(null);

    // Function to check token validity
    const auth = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;

            if (decoded.exp < now) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } catch (error) {
            setError("Invalid token.");
            setIsAuthorized(false);
        }
    }, []);

    // Function to refresh token
    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        if (!refresh) {
            setIsAuthorized(false);
            return;
        }

        try {
            const res = await axios.post("http://localhost:8000/api/token/refresh/", { refresh });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            setError("Failed to refresh token.");
            setIsAuthorized(false);
        }
    };

    // Run authentication check when the component mounts
    useEffect(() => {
        auth();
    }, [auth]);

    // Show error message if authentication fails
    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

    // Show loading message while checking authentication
    if (isAuthorized === null) return <div>Loading authentication...</div>;

    // If user is authorized, show the protected page; otherwise, redirect to login
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
