import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./friends.css";
import { Icon } from '@chakra-ui/react'

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
        var users = []

        for (const i in data) {
            if (data[i].isOnline === true) users.push(<div className="single-online-user">{data[i].username}</div>)
        }
        return users
    };

    const offline = () => {
        var users = []
        for (const i in data) {
            if (data[i].isOnline === false) users.push(<div >{data[i].username}</div>)
        }
        return users
    };

    return (
        <div className="container-friends">
            <button onClick={() => getUsers()}>Refresh</button>
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