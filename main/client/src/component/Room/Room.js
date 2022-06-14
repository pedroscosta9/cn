import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Room(state){
    let { id } = useParams();
    const location = useLocation();
    var player_1 = location.state;
    return (
        <div className="">
            {player_1.username}
        </div>
    )
}

export default Room;