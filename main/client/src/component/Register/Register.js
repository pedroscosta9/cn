import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then(() => navigate("/login", { replace: true }));
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Create account </span>

            <div className="wrap-input">
              <input
                className={registerUsername !== "" ? "has-val input" : "input"}
                onChange={(e) => setRegisterUsername(e.target.value)} />
              <span className="focus-input" data-placeholder="Username"></span>
            </div>

            <div className="wrap-input">
              <input className={registerPassword !== "" ? "has-val input" : "input"}
                type="password" onChange={(e) => setRegisterPassword(e.target.value)}

              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" type="button" onClick={register}>Sing up</button>
            </div>

            <div className="text-center">
              <span className="txt1">Already have an account?</span>
              <a className="txt2" href="/login">
                Login
              </a>
            </div>


          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;