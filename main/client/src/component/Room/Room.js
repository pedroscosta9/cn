import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./room.css";
import Axios from "axios";
import io from "socket.io-client"

function Room(state) {
    let { id } = useParams();
    const location = useLocation();
    state = location.state
    var joined = true
    if (state != null){
        joined = state.joined 
    }
    var player_1 = {}
    if (!joined) player_1 = state.player_1;
    
    let socket = ""


    const currentUser = {
        socket_id: "",
    }

    const [userInfo, setUserInfo] = useState(null);

    const [game, setGame] = useState(Array(9).fill(''));
    const [isX, setIsX] = useState(false);
    const [turnNumber, setTurnNumber] = useState(0);
    const [winner, setWinner] = useState(false);

    const[isFull, setIsFull] = useState(false);

    const turn = (index) => {
        let g = [...game];
        if (!g[index] && !winner) {
            g[index] = isX ? 'X' : 'O';
            setGame(g);
            setIsX(!isX);
            setTurnNumber(turnNumber + 1);
        }
    };

    const restart = () => {
        setGame(Array(9).fill(''));
        setWinner(false);
        setTurnNumber(0);
    };

    // const getUserInfo = () => {
    //     let id = split_id[0]
    //     console.log(id)
    //     Axios({
    //         method: "GET",
    //         data: {
    //             id: id
    //         },
    //         withCredentials: true,
    //         url: "http://localhost:4000/playerInfo",
    //     }).then((res) => {
    //         setUserInfo(res.data);
    //         player_1 = userInfo
    //     });
    // };

    const getUserInfo = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/userInfo",
        }).then((res) => {
            setUserInfo(res.data);
            socket = io.connect("http://localhost:3001", {query: res.data});
            socket.emit("join-room", id)
        });
    };

    useEffect(() =>{
        console.log(joined)
        if(joined){
            getUserInfo()
        }else{
            socket = io.connect("http://localhost:3001", {query: player_1})
            socket.emit("join-room", id)
        }
    }, []) 

    useEffect(() =>{
        socket.on("room-size", (data) =>{
            if(`${data}` === "2"){
                setIsFull(true)
            }
        })
    })

    useEffect(() => {
        // check for winner for every turn
        combinations.forEach((c) => {
            if (game[c[0]] === game[c[1]] && game[c[0]] === game[c[2]] && game[c[0]] !== '') {
                setWinner(true);
            }
        });
    }, [game]);
    
    return (
        <div className="container-room-main">
            <div className="container-room">
                {player_1 && player_1 !==null ? <h2 className="bold">{player_1.username}'s Room</h2> : null}
                <span><h3>Room id: <input type="text" readOnly maxLength="10" size="30" value={id} id="myInput"/></h3></span>
            </div>
            <div className="container-game">
                <p>
                    {winner || turnNumber === 9 ? (
                        <button className="reset-btn" onClick={restart}>
                            Restart
                        </button>
                    ) : null}
                    {winner ? (
                        <span>We have a winner: {!isX ? 'X' : 'O'}</span>
                    ) : turnNumber === 9 ? (
                        <span>It's a tie!</span>
                    ) : (
                        <br />
                    )}
                </p>

                <div className="row">
                    <Box index={0} turn={turn} value={game[0]} />
                    <Box index={1} turn={turn} value={game[1]} />
                    <Box index={2} turn={turn} value={game[2]} />
                </div>
                <div className="row">
                    <Box index={3} turn={turn} value={game[3]} />
                    <Box index={4} turn={turn} value={game[4]} />
                    <Box index={5} turn={turn} value={game[5]} />
                </div>
                <div className="row">
                    <Box index={6} turn={turn} value={game[6]} />
                    <Box index={7} turn={turn} value={game[7]} />
                    <Box index={8} turn={turn} value={game[8]} />
                </div>
            </div>




        </div>
    )
}

const Box = ({ index, turn, value }) => {
    return (
        <div className="box" onClick={() => turn(index)}>
            {value}
        </div>
    );
};

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export default Room;