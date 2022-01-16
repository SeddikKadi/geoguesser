import React, { useState,useEffect} from 'react'

import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom"
import { List, Typography, Divider  } from 'antd';
import axios from 'axios';
import { Progress, Table  } from 'antd';




const Clock=(props)=>{
    const [time,setTime]=useState(props.time)
    const [clock,setClock]=useState([])
   

    const clockFormat=(time)=>{
        let result=[]
        let minutes=Math.floor(time/60);
        let secondes=time-(minutes*60);
        result.push(minutes)
        result.push(secondes)

        setClock(result);
    }
    const decrement=(time)=>{
        setTime(time-1)
    }
    useEffect(()=>{
        setTimeout(decrement(props.time), 1000)

        console.log(time)
    },[])

    

return (
    <div>
        <h3>{clock[0]}:{clock[1]}</h3>
    </div>
)
}
export default Clock;