import React, { useState , useEffect} from "react";
import Axios from "axios";

function Home() {
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
            if(data[i].isOnline === true) users.push(<li key={data[i]._id}>{data[i].username}</li>)
        }
        return users
    };

    const offline = () => {
        var users = []
        for(const i in data){
            if(data[i].isOnline === false) users.push(<li key={data[i]._id}>{data[i].username}</li>)
        }
        return users
    };

    return (
        <div>
            <button onClick={() => getUsers()}></button>
            <div>
                <h1>Online</h1>
                <ul>
                    {online()}
                </ul>
            </div>
            <br/>
            <div>
                <h1>Offline</h1>
                <ul>
                    {offline()}
                </ul>
            </div>
        </div>
    );

}
export default Home;