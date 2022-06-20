import React, { useState, useEffect } from "react";
import "./GameHistory.css"
import Axios from "axios";


function GameHistory() {

    const [data, setData] = useState([]);


    const listOfGames = () => {
        Axios({
            method: "POST",
            data: {
                user_id: localStorage.getItem("id"),
            },
            withCredentials: true,
            url: "http://localhost:4000/listOfGames",
        }).then((res) => {
            setData(res.data)
        });
    }

    useEffect(() =>
        listOfGames(),
        []
    )


    const history = () => {
        var historyCards = []
        for (const r in data) {

            console.log(data[r].game_state)
            historyCards.push(
                <div className="card" >
                    <div className="title-bold">
                        <h2>VS AI</h2>

                    </div>
                    <table>
                        <tr>
                            <td>{data[r].game_state[0]}</td>
                            <td className="vert">{data[r].game_state[1]}</td>
                            <td>{data[r].game_state[2]}</td>
                        </tr>
                        <tr>
                            <td className="hori">{data[r].game_state[3]}</td>
                            <td className="vert hori">{data[r].game_state[4]}</td>
                            <td className="hori">{data[r].game_state[5]}</td>
                        </tr>
                        <tr>
                            <td>{data[r].game_state[6]}</td>
                            <td className="vert">{data[r].game_state[7]}</td>
                            <td>{data[r].game_state[8]}</td>
                        </tr>
                    </table>
                </div>)

        }

        return historyCards
    };

    return (
        <div className="container-rooms2">
            <div className="title-rooms">
                <div className="container-title">
                    <h3>Match History</h3>
                </div>

            </div>

            <div className="cards-container">
                {history()}
            </div>
        </div>);
}

export default GameHistory;