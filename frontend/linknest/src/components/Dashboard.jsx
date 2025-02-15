import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/auth/user", { withCredentials: true }).then((res) => {
            setUser(res.data);
        });
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <div>
                    <img src={user.profilePic} alt="Profile" />
                    <h3>Welcome, {user.name}</h3>
                    <p>Email: {user.email}</p>
                    <button onClick={() => {
                        axios.get("http://localhost:5000/auth/logout", { withCredentials: true }).then(() => {
                            Cookies.remove("token");
                            window.location.href = "/";
                        });
                    }}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
