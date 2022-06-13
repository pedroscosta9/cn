import React from "react";
import Friends from './../Friends/Friends';
import Rooms from './../Rooms/Rooms';
import "./home.css"
import { Button, ChakraProvider } from '@chakra-ui/react'


function Home() {
    return (
        <div className="container-home">
            <div className="rooms-block">
                <div className="rooms-header">
                    <div className="rooms-card">
                        <h1 className="title-rooms bold" >Rooms</h1>
                        <div className="button-allign">
                            <ChakraProvider >
                                <Button colorScheme='blue'>+ Create Room</Button>
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