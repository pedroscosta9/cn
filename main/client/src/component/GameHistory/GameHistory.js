import React, { useState, useEffect } from "react";
import { RepeatIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import { Button, ChakraProvider } from '@chakra-ui/react'
import Axios from "axios";


function GameHistory() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

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
            

        }
        console.log(data)
        return historyCards
    };

    return (<div className="container-rooms">


        <ChakraProvider >
            <Button className="button-refresh" colorScheme='blue' onClick={() => listOfGames()}>Refresh &nbsp;<RepeatIcon /></Button>
        </ChakraProvider>


        <div className="cards-container">
            {history()}
        </div>
    </div>);
}

export default GameHistory;