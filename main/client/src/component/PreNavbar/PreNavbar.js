import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import { Link } from 'react-router-dom';

function PreNavbar() {
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
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )

}
export default PreNavbar;