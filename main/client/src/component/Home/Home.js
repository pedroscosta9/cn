import React, { useState, useEffect } from "react";
import Friends from './../Friends/Friends';
import Rooms from './../Rooms/Rooms';
import "./home.css"


function Home() {


    return (
        <div className="container-home">
            <div className="rooms" >
                <Rooms>

                </Rooms>
            </div>
            <div className="friends">
                <Friends>

                </Friends>
            </div>
        </div>

    );

}
export default Home;