import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./friends.css";
import { Icon, ChakraProvider, Button } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

function Friends() {
    const [data, setData] = useState([]);
    const getUsers = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/usersList",
        }).then((res) => {
            setData(res.data);
        });
    };

    useEffect(() =>
        getUsers(),
        []
    )

    const online = () => {
        var usersOnline = []
        for (const i in data) {
            if (data[i].isOnline === true) usersOnline.push(<div key={data[i].username} className="single-online-user">{data[i].username}</div>)
        }
        return usersOnline
    };

    const offline = () => {
        var usersOffline = []
        for (const i in data) {
            if (data[i].isOnline === false) usersOffline.push(<div key={data[i].username} className="single-online-user">{data[i].username}</div>)
        }
        return usersOffline
    };

    return (
        <div className="container-friends">
            <div className="button-refresh-container">
                <ChakraProvider >
                    <Button className="button-refresh-icon" colorScheme='blue' onClick={() => getUsers()}><RepeatIcon /></Button>
                </ChakraProvider>
            </div>
            <div >
                <div className="isOnlineBall">
                    <Icon className="icon-online" viewBox='0 0 200 200' color="green">
                        <path
                            fill='currentColor'
                            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                        />
                    </Icon>
                    <div className="online-padding">

                        <h2 className="bold">Online </h2>
                    </div>

                </div>


                {online()}




            </div>

            <br />
            <div>
                <div className="isOnlineBall">
                    <Icon className="icon-online" viewBox='0 0 200 200' color="red">
                        <path
                            fill='currentColor'
                            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                        />
                    </Icon>
                    <div className="online-padding">
                        <h2 className="bold">Offline </h2>
                    </div>

                </div>

                {offline()}




            </div>
        </div>

    );

}
export default Friends;