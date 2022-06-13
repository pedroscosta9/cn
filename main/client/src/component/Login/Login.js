import React, { useState } from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function Login({callback}) {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();

    const login = () => {
        Axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/login",
        }).then(() => {
            callback(loginUsername)
            navigate("/", { replace: true });
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                placeholder="username"
                onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
                placeholder="password"
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={login} >Submit</button>
        </div>
    )
}

export default Login;