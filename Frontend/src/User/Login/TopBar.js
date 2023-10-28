import React,{useState,useEffect} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from "./TopBarCss";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
export default function TopBar(props){
    const classes=useStyles()
    const navigate=useNavigate()
return(
    <div>
        <AppBar position="static" color="inherit" style={{width:'100%'}}>
        <Toolbar>
        <div className={classes.logoStyle} >
    Cargoa 
          </div>
        <div className={classes.logoStyle} >
        <Button variant='contained' onClick={()=>navigate('/vendorlogin')}>Vendor Login</Button>
          </div>

          
        </Toolbar>
       
      </AppBar>
    
    </div>
)


}