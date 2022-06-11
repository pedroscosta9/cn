import React, { useState } from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

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
    <div>
      <h1>Register</h1>
      <input
        placeholder="username"
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <input
        placeholder="password"
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <button onClick={register}>Submit</button>
    </div>
  )
}

export default Register;