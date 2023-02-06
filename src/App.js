import coldBg from "./assets/cold-weather.webp";
// import warmBg from "./assets/warm-weather.jpeg";
import hotBg from "./assets/hot-weather.jpeg";
import Details from "./components/Details";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./WeatherService";

function App() {
  const [city, setCity] = useState("Seattle");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("imperial");
  const [bg, setBg] = useState(coldBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // Dynamic background(bg)
      const threshold = units === "imperial" ? 60 : 16;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isFahrenheit = currentUnit === "C";
    button.innerText = isFahrenheit ? "°F" : "°C";
    setUnits(isFahrenheit ? "imperial" : "metric");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Which City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="Weather Icon" />
              </div>
              <h3>{weather.description}</h3>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "imperial" ? "F" : "C"
                }`}</h1>
              </div>
            </div>

            {/* bottom description*/}
            <Details weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
