import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function PosNavBar({username, callbackNavBar}) {
    const navigate = useNavigate();

    const logout = () => {
       
        Axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:4000/logout",
        }).then(() => {
            //window.location.reload();
            // alert("Logged out");
            // navigate("/login", { replace: true })
            callbackNavBar()
        });
        //window.location.reload();
        navigate("/login", { replace: true })
        window.location.reload();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Grid3x3Icon />
                    </IconButton>
                    <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 3 }}>
                        <Button color="inherit" component={Link} to="/" ><h3>MINIGAMES</h3> </Button>
                    </Typography>
                    <h3>Welcome Back {username}</h3>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box >
    )

}
export default PosNavBar;