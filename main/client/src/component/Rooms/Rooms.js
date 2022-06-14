import React, { useState, useEffect } from "react";
import "./rooms.css"
import { Button, ChakraProvider } from '@chakra-ui/react'
import Axios from "axios";
import avatar_3 from "./../../Images/avatar_3.png";
import { RepeatIcon } from '@chakra-ui/icons';

import question_mark from "./../../Images/question_mark.png";
function Rooms() {
    const [data, setData] = useState([]);

    const getRooms = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/roomsList",
        }).then((res) => {
            setData(res.data);
            console.log(res)
        });
    };

    useEffect(() =>
        getRooms(),
        []
    )

    const rooms = () => {
        var rooms = []
        console.log(data)
        for (const r in data) {
            if (data[r].status === true) rooms.push(
                // <><div className="single-room">{data[r].name}</div>

                <div className="card">
                    <div className="card__title">{data[r].name} </div>

                    <div className="card__image">
                        <div className="card__image_left">
                            <img alt="player1" src={avatar_3} />
                        </div>
                        <div className="bold vs-style">VS
                        </div>

                        <div className="card__image_right">
                            {data[r].open ? <img alt="player2" src={question_mark} /> : <img alt="no oponent" className="no_oponent" src={avatar_3} />}
                        </div>
                    </div>

                    {data[r].open ? <div>Waiting for oponent...</div> : null}


                </div>


            )
        }
        return rooms
    };

    return (<div className="container-rooms">

    
            <ChakraProvider >
                <Button className="button-refresh" colorScheme='blue' onClick={() => getRooms()}>Refresh &nbsp;<RepeatIcon /></Button>
            </ChakraProvider>
      
       
        <div className="cards-container">
            {rooms()}
        </div>
    </div>);
}

export default Rooms;  