import React, { useState, useEffect } from "react";
import "./rooms.css"
import Axios from "axios";

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
        for (const r in data) {
            if (data[r].status === true) rooms.push(<div className="single-room">{data[r].name}</div>)
        }
        return rooms
    };

    return (<div className="container-rooms">
        <button onClick={() => getRooms()}>Refresh</button>
        {rooms()}
    </div>);
}

export default Rooms;  