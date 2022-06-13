import React, { useState } from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import "./../../styles.css"

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
        <div className="container">

            <div className="container-login">
                <div className="wrap-login">

                    <form className="login-form">
                        <span className="login-form-title"> Welcome </span>

                        <div className="wrap-input">
                            <input
                                className={loginUsername !== "" ? "has-val input" : "input"}
                                onChange={(e) => setLoginUsername(e.target.value)} />
                            <span className="focus-input" data-placeholder="Username"></span>
                        </div>

                        <div className="wrap-input">
                            <input className={loginPassword !== "" ? "has-val input" : "input"}
                                type="password" onChange={(e) => setLoginPassword(e.target.value)} />
                            <span className="focus-input" data-placeholder="Password"></span>
                        </div>


                        <div className="container-login-form-btn">
                            <button className="login-form-btn" type="button" onClick={login}>Login</button>
                        </div>

                        <div className="text-center">
                            <span className="txt1"> Dont have an account?</span>

                            <a className="txt2" href="/register">
                                Sign up
                            </a>
                        </div>



                    </form>

                </div>

            </div>
        </div>
    )
}
export default Login;