import React,{useState,useEffect} from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import TopBar  from "./TopBar";
import SideBar from "./SideBar";

import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import UserPage from "../UserPage";
import AddVendor from "../AddVendor";
import DisplayPurchase from "../DisplayPurchase";
export default function DashBoard(props){
    var navigate=useNavigate();
    let Session=window.localStorage.getItem("Session");
    console.log(Session)
    useEffect(()=>{
        if(Session!="true"){
            navigate('/adminlogin')
        }
    },[])

return(
    <div>
    <TopBar/>
   
        <Grid container spacing={2} style={{display:'flex',flexDirection:'row'}}>
          <Grid item xs={12} sm={2}> 
    <SideBar/>
    </Grid>
    <Grid item xs={12} sm={10}>
       <Routes>
             
              <Route element={<UserPage/>} path="/" /> 
              <Route element={<AddVendor/>} path="/addvendor" /> 
              <Route element={<DisplayPurchase/>} path="/displaypurchase" /> 
             
       </Routes>
       </Grid>
       </Grid>
    </div>
)


}