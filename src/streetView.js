import ReactStreetview from 'react-streetview';

import React, { useState,useEffect } from 'react'
import { useParams } from "react-router-dom";

const StreetViewComponent = (props) => {
    const googleMapsApiKey = 'AIzaSyCSNmOGeJWpHyL2v2fP5C8TURDCXi1MI1w';
    const [location,setLocation]=useState(props.data)
    const { map } = useParams();

console.log(location)
    return(
        <div className="streetViewContainer">
                <ReactStreetview
                    apiKey={googleMapsApiKey}
                    streetViewPanoramaOptions={{	
                        position: location,
                        pov: {heading: 100, pitch: 0},
                        zoom: 0,
                        showRoadLabels: false,
                        }}
                
                />
               
          
                

        </div>
    )

}
export default StreetViewComponent