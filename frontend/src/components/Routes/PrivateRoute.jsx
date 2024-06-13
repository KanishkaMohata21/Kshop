import { useEffect, useState } from "react";
import { useAuth } from "../UserContext";
import { Outlet } from 'react-router-dom'
import axios from 'axios'

export default function PrivateRoute() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log(auth.token);
                const headers = { Authorization: `${auth.token}` };
                console.log('Request headers:', headers); // Log headers before making the request
                const res = await axios.get('http://localhost:8000/api/user/adminpanel', {
                    headers: headers
                });
                console.log('Response from backend:', res.data); // Log response data
                if (res.data.ok) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token) {
            fetchUserData();
        } else {
            setAuthorized(false);
            setLoading(false);
        }
    }, [auth?.token]);

    return loading ? "Loading..." : authorized ? <Outlet /> : "Unauthorized access";
}
