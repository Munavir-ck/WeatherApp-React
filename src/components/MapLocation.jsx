
import ReactMapboxGl, { Layer, Feature,Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useContext,useEffect,useState } from "react";
import { LocationContext } from "./context/Context";
import axios from 'axios';

const Map = ReactMapboxGl({
  accessToken:
  process.env.REACT_APP_MAPBOX_API_KEY
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
        `https://api.opencagedata.com/geocode/v1/json?key= ${process.env.REACT_APP_OPENWEATHER_API_KEY}&q=${latitude}+${longitude}`
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
   <div style={{ width: "50vw", border: "1px solid black" }}>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "70vh",
          width: "100%" // Adjust the width as needed
        }}
        center={coordinates}
      >
        {/* Rest of your Map component code */}
      </Map>
    </div>
  </div>
  )
}

export default MapLocation
