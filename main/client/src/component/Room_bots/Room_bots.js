import React, { useState, useEffect } from "react";

import "./room.css";



function Room_bots(state) {
    

    const spotsLeft = [];


    const [game, setGame] = useState(Array(9).fill(''));
    let isX = true;
    const [turnNumber, setTurnNumber] = useState(0);
    const [winner, setWinner] = useState(false);
    
    const turn = (index) => {
        let g = [...game];
        if (!g[index] && !winner) {
            g[index] = 'X';
            isX = true
            playRandom(g)
            
        }
    };

    const playRandom = (g) =>{
        combinations.forEach((c) => {
            if (game[c[0]] === game[c[1]] && game[c[0]] === game[c[2]] && game[c[0]] !== '') {
                setWinner(true);
                return
            }
        });
        var count = 0;
        for  (var item in g )   {
            
            if (g[item] !== 'X' && g[item] !== 'O') {
                spotsLeft.push(count);
            }
            count ++;
        }
        var itemSpots = spotsLeft[Math.floor(Math.random() * spotsLeft.length)];
        g[itemSpots] = 'O'
        setGame(g);
        isX = false
        setTurnNumber(turnNumber + 2);
    }

    const restart = () => {
        setGame(Array(9).fill(''));
        setWinner(false);
        setTurnNumber(0);
        isX = false;
    };

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
                 <h2 className="bold">You are playing against BOT</h2> 
                {/* <span><h3>Room id: <input type="text" readOnly maxLength="10" size="30" value={id} id="myInput"/></h3></span> */}
            </div>
            <div className="container-game">
                <p>
                    {winner || turnNumber >= 9 ? (
                        <button className="reset-btn" onClick={restart}>
                            Restart
                        </button>
                    ) : null}
                    {winner ? (
                        <span>We have a winner: {!isX ? 'O' : 'X'}</span>
                    ) : turnNumber >= 9 ? (
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
        <div className="box" onClick={() => {
                       
            turn(index)
           // setIsX(isX === "X" ? "O" : "X" )

        }}>
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

export default Room_bots;