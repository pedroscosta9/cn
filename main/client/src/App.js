import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Login/Login"
import Register from "./component/Register/Register"
import Navbar from "./component/Navbar/Navbar"
import Home from "./component/Home/Home"
function App() {



  return (
    <div className="App">


      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" onEnter={()=>console.log("a1")} element={<Home />} />
          <Route path="/*" element={<Navigate to="/" />} />

        </Routes>
      </Router>



    </div>
  );
}

export default App;