import React, { useEffect,useState } from "react";
import axios from "axios"
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom"


import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


import MapCard from "./MapCard";
const  Welcome=(props)=>{
    const navigate = useNavigate()

const style = {  padding: "8px" };

const  [mapDetails,setMapDetails]=useState(null)
const [game,setGame]=useState(null)
const [selectedMap,setSelectedMap]=useState(null)


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    useEffect(async()=>{
            await axios.get(
                    `http://localhost:8082/api/maps`
                    ).then((res)=>{
                        setMapDetails(res.data)
                  
                    }).catch((err)=>{
                    console.log(err)
                })
                return ()=>{
                    localStorage.clear();
                    console.log("welcome cleanedup!!")
                }
    }

    ,[]


    )
return (
    <div>
        <div className="navbar">
            <div className="logoutButton">
                {(sessionStorage.getItem("token")!==null)?(
                    <Button  variant="contained" onClick={()=>{
                        console.log("token",sessionStorage.getItem("token"))
                        sessionStorage.clear()

                        navigate("/intro")
                    }}>Logout</Button>
                ):(
                    <Button  variant="contained" onClick={()=>{
                        navigate("/login")
                    }}>Login</Button>
                )}



            </div>

        </div>


        <div className="welcomeContainer">

            <Box sx={{ width: '100%' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>


                {mapDetails && mapDetails.map((element,index)=>{

                        return(
                            <Grid item xs={2} sm={4} md={4} key={index}>
                            <MapCard data={element} key={index} />
                            </Grid>
                        )
                }
                )}



                </Grid>
            </Box>



        </div>

    </div>

)
}
export default Welcome;