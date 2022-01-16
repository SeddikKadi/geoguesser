import React, { useEffect,useState } from "react";
import {Link} from "react-router-dom"
import { data,image } from "./data";
import axios from "axios"




const  Welcome=(props)=>{


const style = {  padding: "8px" };
const keys = Object.keys(data);
const  [mapDetails,setMapDetails]=useState(null)
const [game,setGame]=useState(null)
const [selectedMap,setSelectedMap]=useState(null)

//map ne se met pas a jour apres le changement de partie
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

   /*  const handleNewGame=async()=>{

       await axios.get(
            `http://localhost:8082/api/games/count`
            ).then((res)=>{
              setGame(res.data._id)
          
        
            }).catch((err)=>{
            console.log(err)
        })
  
        
    } */
    const handleSelectMap=async(map)=>{
    

    }
    //to={`/newgame/${element.name}/${game}`}
return (
    <div className="welcomeContainer">
       <div className="navbar">
           <span> My account</span>

                 <div gutter={[16, 24]}>
                    {mapDetails && mapDetails.map((element)=>(
                        <div className="gutter-row" span={8} key={element.name} onMouseEnter={()=>{handleSelectMap(element.name)}}>
                            <div style={style}>
                                <div
                                        hoverable
                                        style={{ width: 300 }}
                                        cover={<img alt="example" width="300px" src={element.image} />}
                                >


                                        description= {<Link to={`/gameparameter/${element.name}/${game}`}>
                                            <button type="primary" shape="round" size="middle" >
                                               Play
                                            </button>
                                         </Link> }
                                     
                                </div>
                            </div>
                        </div>
                    )
                 )}
                 </div>
       
           
       </div>
    </div>
)
}
export default Welcome;