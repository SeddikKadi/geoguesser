import React,{useState,useEffect} from 'react';//test
import Map from "./mapsComponent"
import randomStreetView from "./randomStreetView/RandomStreetView"
import StreetViewComponent from './streetView';
import { useParams,useLocation } from "react-router-dom";
import {LeftCircleFilled,LeftCircleOutlined,RightCircleFilled,RightCircleOutlined ,PushpinFilled, PushpinOutlined,HomeFilled} from "@ant-design/icons"

import axios from 'axios';

import Countdown from 'react-countdown';



function Game() {


  const googleMapsApiKey = 'AIzaSyCSNmOGeJWpHyL2v2fP5C8TURDCXi1MI1w';
  const [location,setLocation]=useState(null)
  const [showMap,setShowMap]= useState(false);
  const [width,setWidth]=useState(400)
  const [restart,setRestart]=useState(1)
  const [lockedMap,setLockedMap]=useState(false)
  const [zoom,setZoom]=useState(null)
  const { map,gameid,time,roundid,usergameid } = useParams();
  const [center,setCenter]=useState(null)
  const [mapDetails,setMapDetails]=useState(null)
  const [game,setGame]=useState(null)
    const params=useParams();



  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state


      return "00:00";
    } else {
      // Render a countdown
      return <span>{minutes}:{seconds}</span>;
    }
  };



    useEffect(async ()=>{
          fillDataBase();


    if(localStorage.getItem("gameIndex")===null){
      localStorage.setItem("gameIndex",JSON.stringify(eval(roundid)))
    }

    if(localStorage.getItem("roundDistance")===null){
      localStorage.setItem("roundDistance","")
 
    }
    if(localStorage.getItem("roundScore")===null){
      localStorage.setItem("roundScore","");
    }
    if(localStorage.getItem("score")===null){
      localStorage.setItem("score",JSON.stringify(0))
    }
    if(localStorage.getItem("guessedPoints")===null){
       localStorage.setItem("guessedPoints","")
    }



    if(localStorage.getItem("game")===null){
        console.log("null?",localStorage.getItem("game"))
        await  axios.get(
            `http://localhost:8082/api/games/getgame/`+gameid
        ).then((res)=>{
            setGame(res.data);
            localStorage.setItem("game",JSON.stringify(res.data[0].locations))

            console.log("databaseGame",JSON.parse(localStorage.getItem("game")));

        }).catch((err)=>{
            console.log(err)
        })
    }


      


          await axios.get(
          `http://localhost:8082/api/maps/`+map
          ).then((res)=>{
              setMapDetails(res.data)
              localStorage.setItem("center",res.data.center)
              localStorage.setItem("zoom",res.data.zoom)
              setZoom(res.data.zoom)
              setCenter(res.data.center)
             
              handleNewGame();
              randomStreetView.setParameters({
                polygon:[res.data.polygon]
           })
              
          }).catch((err)=>{
          console.log(err)
      })

      return function cleanup(){

        localStorage.clear();
        console.log("game unmount !!!")
      }
    },[])

    //increment an id pressing on nextGame button (stored in localStorage)

  var rad = function(x) {
    return x * Math.PI / 180;
  };
  
  var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };



  const handleNewGame=async()=>{
                   let l=JSON.parse(localStorage.getItem("game"))




                   if(l!==null){
                       setLocation({lat:l[eval(roundid)][0],lng:l[eval(roundid)][1]})

                       setRestart(restart+2);
                   }

  }




    const fillDataBase= ()=>{

      console.log("filled !!!")
      randomStreetView.getRandomLocations(5).then(
          async(locations)=>{

                        //setLocation({lat:locations[0][0],lng:locations[0][1]})
                        await axios.post(`http://localhost:8082/api/games/localisations`,{locations,map})
                     }
      );
    }

    const handleClick=()=>{

      setShowMap(true)
      if(width<600){
        setWidth(width+100)
       
      }
     
    }

    const callback=(data)=>{
        //store guessed point
        localStorage.setItem("guessedPoint",JSON.stringify([data.lat,data.lng]))


        //get distance guessed point and solution point

        let  guess=getDistance(location,data);


       //calculate score for the round
        let z=Math.trunc(normalize(guess,0,20000000,1,21))


        //zoom ??
        //setZoom(21-z)

        //center map result
        setCenter(data)


        let score= JSON.parse(localStorage.getItem("score"))
        localStorage.setItem("score",Math.floor(5000-normalizeScore(0,950000,Math.trunc(guess)*5000))+score)
        //history score:
        let _roundScore=JSON.parse(localStorage.getItem("roundScore"));
        _roundScore.push(Math.floor(5000-normalizeScore(0,950000,Math.trunc(guess)*5000)))
        localStorage.setItem("roundScore",JSON.stringify(_roundScore))
        //history distance guessed
        let _roundDistance=JSON.parse(localStorage.getItem("roundDistance"));
        _roundDistance.push(guess)
        localStorage.setItem("roundDistance",JSON.stringify(_roundDistance))
       console.log("distanceHistory",_roundDistance);
    }

  
   function normalizeScore(min, max,val) {
    var delta = max - min;
  
        return (val - min) / delta;
  
  }

    function normalize(enteredValue, minEntry, maxEntry, normalizedMin, normalizedMax) {

      var mx = (Math.log((enteredValue-minEntry))/(Math.log(maxEntry-minEntry)));
      var preshiftNormalized = mx*(normalizedMax-normalizedMin);
      var shiftedNormalized = preshiftNormalized + normalizedMin;
      
      return shiftedNormalized;
      
    }

    const handleBack=()=>{
      
      setRestart(restart+1)
   
    }
    const handleExtends=()=>{
      setShowMap(true)
      if(width>400){
        setWidth(width-100)
      }
    }
    const handleNextGame=()=>{

      let index=eval(localStorage.getItem("gameIndex"));
      
      if(index>=5){
        localStorage.setItem("gameIndex","5")
      }else{
        localStorage.setItem("gameIndex",index+1)
      }
      
      


      handleNewGame()
      handleBack();
        console.log("next game !!")
    }

  return (
      <div className="App">
        {location && (<div>
        <div className='topPanel'>
           <div className='topPanelElement'>
             <div>
                 <div><h3>Map</h3></div>
             <div><h3>{map}</h3></div>
             </div>
           
           </div>
           <div className="topPanelElement">
             <div>
                <div><h3>Score</h3></div>
             <div><h3>{localStorage.getItem("score")}</h3></div>
             </div>
           </div>
           <div className="topPanelElement">
             <div>
                <div><h3>Round</h3></div>
             <div><h3>{eval(roundid)+1}/5</h3></div>
             </div>
           </div>
           <div className="topPanelElement">
             <div>
                <div><h3>Score</h3></div>
             <div><h3>    <Countdown
                date={Date.now() + time*1000}
                renderer={renderer}
              />,   </h3></div>
             </div>
           </div>
         </div>
        <div className='streetView' onClick={()=>{!lockedMap && setWidth(400)}}>
            {console.log("streetviewLocation",location)}
          <StreetViewComponent data={location}  key={restart} />
        </div>
      <div className='mapsParent'>
              <div>
                    <button className="mapButton" onClick={()=>handleClick()} >
                                extends
                              </button>
                              
              </div>
                 
              {showMap && (
                <div>
                      <div className='noteContainer' >
                     
                      </div>
                      <div className="mapContainer" >
                          <div className="map" onMouseEnter={()=>{!lockedMap && setWidth(600)}} >
                              <Map data={width} NextGameCallback={handleNextGame} callback={callback}  location={location} zoom={zoom} center={center}/>
                              <div className='extendMap'>
                                <span className='extendsElements' onClick={()=>{handleClick()}}>
                                  {(width===800)?(<LeftCircleOutlined style={{width:"30px",fontSize:"25px",opacity:"0.5"}}/>):
                                                 (<LeftCircleFilled style={{width:"30px",fontSize:"25px"}}/>)}
                                </span>
                                <span className='extendsElements' onClick={()=>{handleExtends()}}>
                                {(width===400)?(<RightCircleOutlined style={{width:"30px",fontSize:"25px",opacity:"0.5"}}/>):
                                               (<RightCircleFilled style={{width:"40px",fontSize:"25px"}}/>)}
                                </span>
                                <span className='extendsElements'>
                                {(lockedMap===true)?
                                                (<PushpinOutlined style={{width:"40px",fontSize:"25px",opacity:"0.5"}}  onClick={()=>{setLockedMap(!lockedMap)}}/>):
                                                (<PushpinFilled style={{width:"40px",fontSize:"25px"}}  onClick={()=>{setLockedMap(!lockedMap)}}/>)}
                                </span>
                              </div>
                          </div>
                       
                      </div>

                      <div>

                          <button className='back' onClick={()=>handleBack()}><HomeFilled /></button>

                      </div>

                </div>
            
              )}
      </div>
        </div>)}
        
     
    </div>
    
  );
}

export default Game;
