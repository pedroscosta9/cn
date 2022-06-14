import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Login/Login"
import Register from "./component/Register/Register"
import PreNavbar from "./component/PreNavbar/PreNavbar"
import PosNavBar from "./component/PosNavBar/PosNavBar"
import Home from "./component/Home/Home"
import RoomCreate from "./component/RoomCreate/RoomCreate"
import Room from "./component/Room/Room"

function App() {
  const [logged, setLogged] = useState(false)
  const [username, setUsername] = useState("");

  const callbackLogin = (name) => {
    setLogged(!logged)
    setUsername(name)
  }

  const callbackNavBar = () => {
    console.log(getNavBar())
    setLogged(!logged)
    setUsername("")
  }

  const getNavBar = () => {
    if(logged) {
      return <PosNavBar username={username} callback={callbackNavBar}/>;
    }
    else{
      return <PreNavbar />
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        {getNavBar()}
        <Routes>
          <Route path="/createroom/:id" element={<RoomCreate />} />
          <Route path="/createroom/:id/*" element={<Navigate to="/" />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/room/:id/*" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login callback={callbackLogin}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;