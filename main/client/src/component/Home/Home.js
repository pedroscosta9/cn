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
                navigate(url, { replace: true , state: userInfo});
            }
        }
    }

    return (
        <div className="container-home">
            <div className="rooms-block">
                <div className="rooms-header">
                    <div className="rooms-card">
                        <h1 className="title-rooms bold" >Rooms</h1>
                        <div className="button-allign">
                            <ChakraProvider >
                                <Button colorScheme='blue' onClick={createRoom}>+ Create Room</Button>
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