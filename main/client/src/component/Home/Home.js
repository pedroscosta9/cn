import React, { useState } from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function Home() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/user",
        }).then((res) => {
            setData(res.data);
        });
    };
    const logout = () => {
        Axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:4000/logout",
        }).then(() => navigate("/", { replace: true }));
    };

    return (
        <div>
            <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
                {data ? <h1>Welcome Back {data.username}</h1> : null}
            </div>

            <div>
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    );

}
export default Home;