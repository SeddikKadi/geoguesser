import React, {useEffect, useState} from 'react'
import { GoogleMap, useLoadScript, Marker,Polyline } from '@react-google-maps/api'
import {useLocation, useParams} from 'react-router-dom';
import {Link} from "react-router-dom"
import { useId } from "react-id-generator";
import axios from "axios";

import ProgressBar from "./ProgressBar";
const apiKey= "AIzaSyCSNmOGeJWpHyL2v2fP5C8TURDCXi1MI1w"


const Result=(props)=>{
    const { map,gameid,time,roundid } = useParams();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCSNmOGeJWpHyL2v2fP5C8TURDCXi1MI1w",
      });
    const [gameData,setGameData]=useState(null)
    const [globalScore, setGlobalScore]=useState(null)
      const params=useLocation()

     let id=(eval(roundid))
    const [userId] = useId();


      const distanceFormater=(distance)=>{
          distance=Math.floor(distance)
          if(distance<1000){
              return ""+distance+"m"
          }else{
              return ""+Math.floor(distance/1000)+"km"
          }
      }
    function normalizeScore(min, max,val) {
        var delta = max - min;

        return (val - min) / delta;

    }
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


    const distance=getDistance(params.state.guessedPoint,params.state.gameLocations)
    const score=Math.floor(5000-normalizeScore(0,950000,Math.trunc(distance)*5000))




    const getGlobalScore=(gameData)=>{

        let score=0;
            gameData.map((element)=>{
                score+=element;
            })

        return score;
    }
    useEffect(async ()=>{
        {
            console.log("gameId",gameid)}

        if(localStorage.getItem("updateGame")===null){
            localStorage.getItem("updateGame","true")
            let round={
                map:map,
                gameId:gameid,
                usergameid:params.state.usergameid,
                userId,
                guessedPoints:[params.state.guessedPoint],
                distance:distance,
                score:score,
                timeRound:time
            }

            await axios.post(`http://localhost:8082/api/playedgame/create`,{round,id}).then(()=>{
                 axios.get(
                    `http://localhost:8082/api/playedgame/getgamebyid/`+params.state.usergameid
                ).then((res)=>{
                    console.log("response",res.data)
                    setGameData(res.data)

                     setGlobalScore(getGlobalScore(res.data.score))

                }).catch((err)=>{
                    console.log(err)
                })
            })
        }





        return(function clear(){
           // localStorage.clear()
            console.log("clear")
        })

    },[])

    const handlePlayAgain=()=>{
      console.log("globalScore",globalScore)
    }


    const renderMap = () => (
        <div>
        
          <div className='mapComponent' >
          <GoogleMap key={apiKey}
              mapContainerStyle={{
                height:"600px",
                width: "100%",
                margin: "0px",
              }}
              zoom={eval(params.state.zoom)+1}
              center={params.state.center}
              
          >

                {/*marker guessed point*/}



              {/*marker solution point*/}


                <Marker 


                    position={params.state.guessedPoint}
                    icon={{
                    url:"https://i.imgur.com/sfOTVx7.png",
                    anchor: new window.google.maps.Point(15, 15),

                    scaledSize: new window.google.maps.Size(25, 26)
                    }}

                />

              <Marker


                  position={params.state.gameLocations}
                  icon={{
                      url:"https://i.imgur.com/vix78mH.png",
                      anchor: new window.google.maps.Point(15, 15),

                      scaledSize: new window.google.maps.Size(25, 26)
                  }}

              />



              <Polyline   geodesic={true}
                        options={{
                            path: [params.state.guessedPoint, params.state.gameLocations],
                            strokeColor: '#000000',
                            strokeOpacity: 0.7,
                            strokeWeight: 2,
                            icons: [{
                                offset: '0',
                                repeat: '10px'
                            }],
                        }}
                />

            
            </GoogleMap>
              {  console.log("token",sessionStorage.getItem("token"))}

          </div>
          <div  >
              {(id>=4)?(
                  <div>
                      {/*<Link to={`/breakdown`}><button className='buttonGuess' onClick={()=>handlePlayAgain()}>breakdown</button></Link>*/}
                      <Link to={`/`}><button className='buttonGuess' onClick={()=>handlePlayAgain()}>Play again</button></Link>
                  </div>
              ):(
                  <Link to={`/newgame/${map}/${gameid}/${time}/${id+1}/${params.state.usergameid}` } state={{globalScore:globalScore}}><button className='buttonGuess' onClick={()=>handlePlayAgain()}>Next game</button></Link>
              )}

   
             
          </div>
            <div className="display-results">
                <div className="progressPTitle">
                    <div className="progressData">
                        <h2>
                            <span className="scoreProgress">Score : {score}</span>
                            <span >Distance : {distanceFormater(distance)}</span>
                        </h2>

                    </div>

                </div>
                <ProgressBar bgcolor={"#fcba03"} completed={Math.floor((score*100)/5000)} />
                    <div className="resumScore">
                        <h4>
                        <table>
                            <tr>
                                <td  width="20%"><strong>Round </strong> </td>
                                <td width="20%"> <strong>Distance </strong></td>
                                <td width="20%"><strong>Temps </strong></td>
                                <td width="20%"><strong>Score </strong></td>
                            </tr>
                            {console.log("map test",gameData)}
                            {(gameData!==null) ? gameData.distance.map((element, index)=>(
                                <tr key={index}>
                                    <td >{index+1}</td>
                                    <td>{distanceFormater(gameData.distance[index])}</td>
                                    <td>{gameData.timeRound} min</td>
                                    <td>{gameData.score[index]}</td>
                                </tr>
                            ) ):""}


                        </table>
                        </h4>
                    </div>


            </div>

</div>
            
      )
      return isLoaded ? (renderMap()) : null;



}
export default Result