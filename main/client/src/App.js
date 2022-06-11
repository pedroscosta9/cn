import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/Login/Login"
import Register from "./component/Register/Register"

function App() {
  const [data, setData] = useState(null);
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };
  const logout = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/logout",
    }).then((res) => console.log(res));
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

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

export default App;