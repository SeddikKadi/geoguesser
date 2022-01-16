import React, {useEffect, useState} from 'react'
import { GoogleMap, useLoadScript, Marker,Polyline } from '@react-google-maps/api'
import {useLocation, useParams} from 'react-router-dom';
import {Link} from "react-router-dom"
import { useId } from "react-id-generator";
import axios from "axios";
const apiKey= "AIzaSyCSNmOGeJWpHyL2v2fP5C8TURDCXi1MI1w"


const Result=(props)=>{
    const { map,gameid,time,roundid } = useParams();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCSNmOGeJWpHyL2v2fP5C8TURDCXi1MI1w",
      });
      const params=useLocation()
     let id=(eval(roundid))
    const [userId] = useId();

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


    const [distance,setDistance]=useState(getDistance(params.state.guessedPoint,params.state.gameLocations))





    useEffect(()=>{
        if(localStorage.getItem("updateGame")===null){
            localStorage.getItem("updateGame","true")
            let round={
                map:map,
                gameId:params.state.gameId,
                userId,
                guessedPoints:[params.state.guessedPoint],
                distance:distance,
                score:"5000",
                timeRound:time
            }
            console.log("round",round)

            axios.post(`http://localhost:8082/api/playedgame/create`,{round,id})
        }



        return(function clear(){
           // localStorage.clear()
            console.log("clear")
        })

    },[])




/* 
        let colors = ["red","blue","green"];
        localStorage.setItem("my_colors", JSON.stringify(colors)); //store colors

        var storedColors = JSON.parse(localStorage.getItem("my_colors")); //get them back

        console.log(storedColors)
                       */



    
    const handlePlayAgain=()=>{
      
    }


    const renderMap = () => (
        <div>
        
          <div className='mapComponent' >
              {console.log(distance)}
             
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

          </div>
          <div  >
              {(id>=4)?(
                  <div>
                      <Link to={`/breakdown`}><button className='buttonGuess' onClick={()=>handlePlayAgain()}>breakdown</button></Link>
                      <Link to={`/`}><button className='buttonGuess' onClick={()=>handlePlayAgain()}>Play again</button></Link>
                  </div>
              ):(
                  <Link to={`/newgame/${map}/${gameid}/${time}/${id+1}/${params.state.gameId}`}><button className='buttonGuess' onClick={()=>handlePlayAgain()}>Next game</button></Link>
              )}

   
             
          </div>

</div>
            
      )
      return isLoaded ? (renderMap()) : null;



}
export default Result