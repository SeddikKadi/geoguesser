import React, { useState,useEffect} from 'react'

import {useLocation, useParams,Link} from 'react-router-dom';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
import { v4 as uuid } from 'uuid';




// import {Link} from "react-router-dom"
//
// import axios from 'axios';





const GameParameters=(props)=>{

    const { map} = useParams();
    const [roundDuration,setRoundDuration]=useState(5)
    const [gameid,setGameid]=useState(null)

    console.log("map",map);


    console.log("gameParameter",localStorage.getItem("gameId"))

    useEffect(async()=>{


        await axios.get(
            `http://localhost:8082/api/games/count/`+map
        ).then((res)=>{
            setGameid(res.data._id)

            console.log("selected game",gameid)


        }).catch((err)=>{
            console.log(err)
        })


        if(localStorage.getItem("gameId")===null){

            localStorage.setItem("gameId",uuid())

            let round={
                map:"map",
                gameId:localStorage.getItem("gameId") ,
                userId:"",
                guessedPoints:[],
                distance:[],
                score:[],
                timeRound:roundDuration
            }
            console.log("round",round)

            await axios.post(`http://localhost:8082/api/playedgame/create`,{round,id:0})
        }
        return (function clear(){
            localStorage.clear()
        })
    },[])





    function valuetext(value) {
        return `${value}°C`;
    }
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
        </Box>
    );

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </React.Fragment>
    );

    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow:
            theme.palette.mode === 'dark'
                ? '0 0 0 1px rgb(16 22 26 / 40%)'
                : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
        backgroundImage:
            theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
                : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background:
                theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
        },
    }));

    function BpRadio(props) {
        return (
            <Radio
                sx={{
                    '&:hover': {
                        bgcolor: 'transparent',
                    },
                }}
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                {...props}
            />
        );
    }

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    });


const timeFormat=(time)=>{
    let minutes=Math.floor(time/60);
    let secondes=Math.floor(time-(minutes*60));
    return {min:minutes,sec:secondes}
}

const params=(
    <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios">

            <FormControlLabel value="female" control={<BpRadio />} label="Female" />
            <FormControlLabel value="male" control={<BpRadio />} label="Male" />
            <FormControlLabel value="other" control={<BpRadio />} label="Other" />
            <FormControlLabel
                value="disabled"
                disabled
                control={<BpRadio />}
                label="(Disabled option)"
            />

        </RadioGroup>
    </FormControl>
);





    return (

        <div className="gameParameterContainer">
            <Box sx={{ width: 500}}>
                <Card variant="outlined">
                    {card}
                <div className="slider">
                    <Slider
                        aria-label="Temperature"
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="off"
                        step={30}
                        marks
                        min={0}
                        max={600}
                        onChange={(e)=>{
                            setRoundDuration(e.target.value)
                        }}
                    />
                </div>
                    <div className = "timeParam" >{timeFormat(roundDuration).min }{(timeFormat(roundDuration).sec!==0)?(":"+timeFormat(roundDuration).sec):(":00")}</div>
                    <div className="params">
                        {params}
                    </div>

            </Card>


            </Box>
            {console.log("gameIIIID",gameid)}

            <Link to={`/newgame/${map}/${gameid}/${roundDuration}/${0}/${localStorage.getItem("gameId")}`}  state={{


               gameId:localStorage.getItem("gameId")


            }}> <Button variant="contained" >Go</Button></Link>


        </div>
    )
}
export default GameParameters;