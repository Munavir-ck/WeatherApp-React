import "./weather.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import { LocationContext } from "./context/Context";
import axios from "axios";
import { useEffect } from "react";

function WeatherCard() {
  const { coordinates, location } = useContext(LocationContext);
  const [temp, setTemp] = useState(null);
  const[weather,setWeather]=useState("")

  console.log( process.env.REACT_APP_OPENWEATHER_API_KEY, "locaaaaaations");

  useEffect(() => {
    getWeather();
  }, [coordinates]);

  async function getWeather(params) {
    const apiKey =   process.env.REACT_APP_OPENWEATHER_API_KEY
   

    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[1]}&lon=${coordinates[0]}&appid=${apiKey}`
    );

    const temperatureInKelvin = result.data.main.temp;
    const temperatureInCelsius = temperatureInKelvin - 273.15;
    const weatherCondition = result.data.weather[0].main;

    if (weatherCondition==='Clouds') {
      setWeather('Clouds')
    }
    else if(weatherCondition==='Rain'){
      setWeather('Rain')
    }
    else{
      setWeather('dry')
    }
    setTemp(Math.floor(temperatureInCelsius));
  }

  return (
    <div>
      <div className="container">
        <div className="card card-1">
          <div id="demo" className="carousel slide" data-ride="carousel">
            <ul className="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" className="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
            </ul>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-6">
                    <div className="temp">{temp}&deg;</div>
                    <div className="location">{location}</div>
                  </div>
                  <div className="col-6 justify-content-right ">
                    <img
                      className="img-fluid  bg-white"
                      src={weather === "Clouds" ? "https://static.vecteezy.com/system/resources/thumbnails/010/434/057/small_2x/partly-cloudy-color-icon-cloudy-weather-sun-with-clouds-weather-forecast-isolated-illustration-vector.jpg" : (weather === "Rain" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4y6QRonOPG6d52gcAi2MSn-jPi2ufSvcIrw&usqp=CAU" : "https://w7.pngwing.com/pngs/540/96/png-transparent-clouds-sunny-warm-patches-weather-partly-cloudy-symbols-forecast.png")}

                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default WeatherCard;
