import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Login/Login"
import Register from "./component/Register/Register"
import PreNavbar from "./component/PreNavbar/PreNavbar"
import PosNavBar from "./component/PosNavBar/PosNavBar"
import Home from "./component/Home/Home"
import RoomCreate from "./component/RoomCreate/RoomCreate"
import Room from "./component/Room/Room"
import RoomBots from "./component/RoomBots/RoomBots"
import GameHistory from "./component/GameHistory/GameHistory"

function App() {
  const getNavBar = () => {
    if(localStorage.getItem("logged") === "true") {
      console.log(localStorage.getItem("logged"))
      return <PosNavBar username={localStorage.getItem("username")}/>;
    }
    else{
      return <PreNavbar />
    }
  }

  const isLogged = () => {
    if(localStorage.getItem("logged") === "true"){
      return <Home />;
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
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={isLogged()} />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/roombots" element={<RoomBots />} />
          <Route path="/history" element={<GameHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;