import React, { useState , useEffect} from "react";
import Axios from "axios";
import "./friends.css";

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
        for(const i in data){
            if(data[i].isOnline === true) users.push(<div className="single-online-user">{data[i].username}</div>)
        }
        return users
    };

    const offline = () => {
        var users = []
        for(const i in data){
            if(data[i].isOnline === false) users.push(<div >{data[i].username}</div>)
        }
        return users
    };

    return (
        <div className="container-friends">
            <button onClick={() => getUsers()}></button>
            <div >
                <h2>Online</h2>
                
                    {online()}
               
            </div>

            <br/>
            <div>
                <h2>Offline</h2>
               
                    {offline()}
               
            </div>
        </div>
        
    );

}
export default Friends;