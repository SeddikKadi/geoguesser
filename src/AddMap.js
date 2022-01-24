import React,{useState,useEffect,Fragment} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {GoogleLogin} from "react-google-login";
import {Copyright} from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import axios from "axios";

import Stack from '@mui/material/Stack';
import randomStreetView from "./randomStreetView/RandomStreetView";



const Input = styled('input')({
    display: 'none',
});




const AddMap=(props)=>{


    const [imageFile,setImageFile]=useState(null)




    const fillDataBase= (polygon,map)=>{

        randomStreetView.setParameters({
            polygon:polygon
        })

        console.log("filled !!!")

            randomStreetView.getRandomLocations(5).then(
                async(locations)=>{

                    await axios.post(`http://localhost:8082/api/games/localisations`,{locations,map})

                    console.log("locations",locations)
                }
            );


    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        const data = new FormData(event.currentTarget);

        await axios.get(data.get("link")).then(
            (response)=>{
                let dataSet=[]
                response.data.records[0].fields.geo_shape.coordinates.map((element)=>{
                    if(element.length===1){
                        dataSet.push(element[0])
                    }else{
                        dataSet.push(element)
                    }
                })
                let temp=null;
                dataSet.map((elements)=>{
                    elements.map((element)=>{
                        temp=element[0];
                        element[0]=element[1];
                        element[1]=temp;
                    })
                })





                let map={
                    name:data.get('name'),
                    polygon:dataSet,
                    zoom:3,
                    center:[
                        response.data.records[0].geometry.coordinates[1],response.data.records[0].geometry.coordinates[0]
                    ],
                }


                fillDataBase(map.polygon,map.name);

                var file = data.get("image")
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = async function  (e) {
                    setImageFile(reader.result)
                    await axios.post("http://localhost:8082/api/maps",{data:reader.result,map}).then((response)=>{
                        console.log("newMap",response.data)
                    })
                }.bind(this);

            }
        ).catch((err)=>{
            console.log("error:",err)
        })
    };

    const theme = createTheme();

    return(
        <div>


            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Copy link:
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="link"
                                label="Api Link"
                                name="link"

                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                type="text"
                                id="name"

                            />
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" type="file" name="image" />
                                    <Button variant="contained" component="span">
                                        Upload Image
                                    </Button>
                                </label>
                            </Stack>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                            {(imageFile)&&(<div >
                                <img src={imageFile} className="imageMapPreview"></img>
                            </div>)}

                        </Box>


                    </Box>

                </Container>
            </ThemeProvider>


        </div>
    )
}

export default AddMap