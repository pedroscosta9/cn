import React, { useState, useEffect } from "react";
import Friends from './../Friends/Friends';
import Rooms from './../Rooms/Rooms';
import "./home.css"
import { Button, ChakraProvider } from '@chakra-ui/react'
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const getUserInfo = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/userInfo",
        }).then((res) => {
            setUserInfo(res.data);
            // if (userInfo === null) {
            //     navigate("/login", {replace : true});
            // }
        });
    };


    useEffect(() => {
        const loadData = async () => {
            getUserInfo()
        }
        loadData();

    }, []
    )

    const createRoom = () => {
        if (userInfo) {
            if (userInfo !== undefined) {
                let date = new Date()
                let url = "/createroom/" + userInfo._id + "@" + date.getTime()
                console.log(userInfo)
                navigate(url, { replace: true, state: { player_1: userInfo, joined: false } });
            }
        }
    }

    const createRoomBots = () => {
        //alert("rooms")
        navigate("/roombots");
    }

    const createHistory = () => {
        navigate("/history");
    }

    return (
        <div className="container-home">
            <div className="rooms-block">
                <div className="rooms-header">
                    <div className="rooms-card">
                        <h1 className="title-rooms bold" >Rooms</h1>
                        <div className="button-allign-bots">
                            <ChakraProvider >
                                <Button colorScheme='blue' onClick={createRoomBots}>VS BOTS</Button>
                            </ChakraProvider>
                        </div>

                        <div className="button-allign">
                            <ChakraProvider >
                                <Button colorScheme='blue' onClick={createRoom}>+ Create Room</Button>
                            </ChakraProvider>
                        </div>

                        <div className="button-allign">
                            <ChakraProvider >
                                <Button colorScheme='blue' onClick={createHistory}>Match History</Button>
                            </ChakraProvider>
                        </div>


                    </div>
                </div>
                <div className="rooms" >
                    <Rooms>

                    </Rooms>
                </div>
            </div>
            <div className="friends">
                <Friends>

                </Friends>
            </div>
        </div>

    );

}
export default Home;