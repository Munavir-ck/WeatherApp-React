import logo from "./logo.svg";
import "./App.css";
import WeatherCard from "./components/weatherCard";
import MapLocation from "./components/MapLocation";
import Search from "./components/Search";

function App() {
  return (
    <div
   
    className="App">
      <Search />
      <MapLocation />

      <WeatherCard />
    </div>
  );
}

export default App;
