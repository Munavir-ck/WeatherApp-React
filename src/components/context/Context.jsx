import { createContext, useState } from "react";

const LocationContext=createContext(null)



const LocationProvider=({children})=>{



    const[coordinates,setCoordinates]=useState([-0.481747846041145, 51.3233379650232])
    const[location,setLocation]=useState('')

    return(
        <LocationContext.Provider  value={{coordinates,setCoordinates,setLocation,location}}>

       {children}
        </LocationContext.Provider>
    )
}

export default LocationProvider

export  {LocationContext};