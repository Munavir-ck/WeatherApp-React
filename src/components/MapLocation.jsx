
import ReactMapboxGl, { Layer, Feature,Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useContext,useEffect,useState } from "react";
import { LocationContext } from "./context/Context";
import axios from 'axios';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoibXVuYXZpciIsImEiOiJjbGh1anVxNDYwMGV6M3BwNnF0am1qM20yIn0.sZxp825ISIc9Wp4VuILI2A'
});
 

function MapLocation() {



  const{coordinates,setCoordinates,setLocation}=useContext(LocationContext)

  
useEffect(()=>{
  
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition (
    async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setCoordinates([longitude,latitude])

      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=cd7e28d203e64969a0a2dc20653cdaae&q=${latitude}+${longitude}`
      ).then((res)=>{
       
        setLocation(res.data.results[0].formatted)
      })
    
       
    },
    error => {
      console.error('Error getting location:', error);
    }
  );
} else {
  console.error('Geolocation is not supported by this browser.');
}
},[])

 
  return (
    <div>
    
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '70vh',
          width: '100vw'
        }}
        center={coordinates} // Pass the coordinates as the center prop of the Map component
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={coordinates} />
        </Layer>
      </Map>
    </div>
    </div>
  )
}

export default MapLocation
