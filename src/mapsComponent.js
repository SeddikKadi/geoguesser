import React, { useState } from 'react'

import {Link, useNavigate, useParams} from 'react-router-dom'




import { GoogleMap, useLoadScript, Marker,Polyline } from '@react-google-maps/api'


const Map = (props) => {

  const [markerPos,setMarkerPos]=useState(null)
  const [showLocation, setShowLocation]=useState(false)
  const [visible, setVisible] = useState(false);
  const [center,setCenter]=useState({lat:props.center[0],lng:props.center[1]})
    const { map,gameid,time,roundid,usergameid} = useParams();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCSNmOGeJWpHyL2v2fP5C8TURDCXi1MI1w",
  });
  let width=props.data


  
  const handleClick=(e)=>{
    let lat = e.latLng.lat(), lng = e.latLng.lng()
    setMarkerPos({lat:lat,lng:lng})
      console.log(props.zoom)

  }

  const renderMap = () => (
    <div>
      <div className='mapComponent' >

      <GoogleMap key={isLoaded}
          mapContainerStyle={{
            height: (width*window.innerHeight)+"px",
            width: ((width*window.innerHeight)+(window.innerHeight*0.2))+"px",
            margin: "0px",
          }}
          zoom={props.zoom}
          center={center}
          onClick={
            (e) => handleClick(e)
          }
      >
       <Marker 
            position={markerPos} 
            icon={{
              url:"https://i.imgur.com/sfOTVx7.png",
              anchor: new window.google.maps.Point(15, 15),

              scaledSize: new window.google.maps.Size(25, 26)
            }}
            
       />
       {showLocation &&
        <Marker 
            position={props.location} 
            icon={{
              url:"https://i.imgur.com/vix78mH.png",
              anchor: new window.google.maps.Point(15, 18),

              scaledSize: new window.google.maps.Size(34, 35)
            }}
        />
       }


        </GoogleMap>
      </div>
      <div  >
          {markerPos && <Link
          to={`/result/${map}/${gameid}/${time}/${eval(roundid)}`}
          state={{

                 guessedPoint:markerPos,

                  gameLocations:props.location,

                  center:center,

                  zoom:props.zoom,

                  usergameid:usergameid


                  }}><button className='buttonGuess'>Make a guess</button>
        </Link>}

         
      </div>

    
    </div>

        
  )

  return isLoaded ? (renderMap()) : null;
}

export default Map