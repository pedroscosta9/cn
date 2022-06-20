import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function RoomCreate(state) {
    let { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    var player_1 = location.state.player_1;
    var split_id = id.split("@")

    const createRoom = () => {
        console.log(player_1)
        Axios({
            method: "POST",
            data: {
                id: id,
                name: (player_1.username + " room"),
                player_1 : player_1._id,
                date: split_id[1]
            },
            withCredentials: true,
            url: "http://localhost:4000/createRoom",
        }).then(() =>{
            let url = "/room/" + id
            navigate(url, { replace: true , state: location.state})
        });
    };

    useEffect(() => {
        const create = async () => {
            createRoom()
        }
        create();
    }
    )

    return (
        <div className="">
            Creating room : {id}
        </div>
    );
}

export default RoomCreate;