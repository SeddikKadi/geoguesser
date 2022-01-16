import React, { useState} from 'react'
import { GoogleMap, useLoadScript, Marker,Polyline } from '@react-google-maps/api'
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom"
const apiKey= "AIzaSyCSNmOGeJWpHyL2v2fP5C8TURDCXi1MI1w"

const Breakdown=(props)=>{
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCSNmOGeJWpHyL2v2fP5C8TURDCXi1MI1w",
    });
    const params=useLocation()



    /*
            let colors = ["red","blue","green"];
            localStorage.setItem("my_colors", JSON.stringify(colors)); //store colors

            var storedColors = JSON.parse(localStorage.getItem("my_colors")); //get them back

            console.log(storedColors)
                           */

    console.log("guessLocation",params.state.guessedLocations)


    const getArrayFromGame=(l)=>{

        let games=[]
        for(let i=0 ;i < 5 ;i++){
            games.push({lat:l[i][0],lng:l[i][1]})

        }
        return games


    }

    const gamesArray=getArrayFromGame(JSON.parse(params.state.guessedLocations));
    const guessedArray=getArrayFromGame(JSON.parse(params.state.gameLocations));




    const handlePlayAgain=()=>{

    }
    /*    const locationFormat=(location)=>{
           return {lat:eval(localStorage.getItem("center").split(",")[0]),lng:eval(localStorage.getItem("center").split(",")[1])}
       } */

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
                    {gamesArray.map((element)=>(


                        <Marker


                            position={element}
                            icon={{
                                url:"https://i.imgur.com/vix78mH.png",
                                anchor: new window.google.maps.Point(15, 15),

                                scaledSize: new window.google.maps.Size(25, 26)
                            }}

                        />




                    ))}
                    {guessedArray.map((element)=>(


                        <Marker


                            position={element}
                            icon={{
                                url:"https://i.imgur.com/sfOTVx7.png",
                                anchor: new window.google.maps.Point(15, 15),

                                scaledSize: new window.google.maps.Size(25, 26)
                            }}

                        />
                    ))}

                    {guessedArray.map((element,index)=>(
                        <Polyline   geodesic={true}
                                    options={{
                                        path: [guessedArray[index], gamesArray[index]],
                                        strokeColor: '#000000',
                                        strokeOpacity: 0.7,
                                        strokeWeight: 2,
                                        icons: [{
                                            offset: '0',
                                            repeat: '10px'
                                        }],
                                    }}
                        />
                    ))}

                </GoogleMap>
            </div>
            <div  >
                <Link to="/"><button className='buttonGuess' onClick={()=>handlePlayAgain()}>Play again</button></Link>


            </div>

            <div className='resultDetails'>


                <div className='ResultScore'>
                    <h1>Score: {params.state.score} pts/25000</h1>
                    <div> {/* <Progress percent={(eval(params.state.score)*100)/25000} size="large" strokeWidth="15px"/> */}</div>
                </div>




                <table>

                    {params.state.roundScore.map((element,index)=>(

                        <tr key={index}>
                            <th   style={{width:"200px"}}  >Round {index+1}</th>
                            <td  style={{width:"200px"}}  >{element}</td>
                            <td  style={{width:"200px"}}  >04:55</td>
                            <td  style={{width:"200px"}}  >{params.state.roundDistance[index]}</td>
                            <td  style={{width:"200px"}}  ><div style={{width:"300px"}}> {/* <Progress percent={(eval(params.state.score)*100)/25000} size="large" strokeWidth="10px"/> */}</div></td>
                        </tr>
                    ))}




                </table>


            </div>
        </div>

    )
    return isLoaded ? (renderMap()) : null;



}
export default Breakdown;