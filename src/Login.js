import React, { useState,useEffect} from 'react'

import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom'
import {Link as LinkTo} from "react-router-dom"



import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Copyright} from "@mui/icons-material";



const Login=(props)=>{

    const navigate = useNavigate()



    console.log("sessions", sessionStorage.getItem("token"))

    const responseGoogle = async (response) => {

        let tokenId=response?.tokenId
            await axios.post("http://localhost:8082/api/authentication",{tokenId}).then((response)=>{

                sessionStorage.setItem("token",response?.data.token);
                sessionStorage.setItem("user",response?.data.user)
            })
        console.log("tokenId",tokenId)
        if(tokenId !== null){
            navigate('/')
        }
}




    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    const test=(response)=>{
        console.log(response)
    }

    const theme = createTheme();


    return (
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box>

                            <Typography component="h1" variant="h6">
                                Or connect with:
                                <div>
                                    {/*<GoogleLogin*/}
                                    {/*    clientId="717069728066-fmgnnismmdl635jfobhituoh2rtb0gp1.apps.googleusercontent.com"*/}
                                    {/*    onSuccess={responseGoogle}*/}
                                    {/*    onAutoLoadFinished={test}*/}
                                    {/*    isSignedIn={true}*/}
                                    {/*/>*/}
                                    <GoogleLogin
                                        clientId="717069728066-fmgnnismmdl635jfobhituoh2rtb0gp1.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                            </Typography>
                        </Box>
                            <Typography component="h1" variant="h6">

                              {/*<LinkTo to={"/"}>*/}
                                  <Button onClick={()=>{
                                          sessionStorage.clear()
                                          navigate('/')
                                          }}
                                  >Logout</Button>
                              {/*</LinkTo>*/}
                            </Typography>

                    </Box>

                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>

            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    )
}
export default Login;
