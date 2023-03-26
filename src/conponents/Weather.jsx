import React, { useState } from "react";
import "./Weather.css";
import WeatherItem from "./WeatherItem";
import { getWeatherIcon } from "./WeatherItem";

const Weather = ({ forecastData }) => {
  console.log(forecastData);
  const [filteredList, setFilteredList] = useState([
    ...forecastData.list.slice(0, 8),
  ]);

  const buttonClick = (event) => {
    setFilteredList([...forecastData.list.slice(0, event.target.dataset.time)]);
  };

  return (
    <div>
      <h1 className="title">Weather</h1>
      <div className="buttons-container">
        <ul>
          <li>
            <button data-time={8} onClick={buttonClick}>
              24 hours
            </button>
          </li>
          <li>
            <button data-time={16} onClick={buttonClick}>
              48 hours
            </button>
          </li>
          <li>
            <button data-time={40} onClick={buttonClick}>
              Five days
            </button>
          </li>
        </ul>
      </div>
      <div className="cityName-container">
        <p className="cityName">
          City: {forecastData.city.name}, {forecastData.city.country}
        </p>
        <div className="weather-now">
          {getWeatherIcon(forecastData.list[0])}
          <p className="tempereture">
            {Math.round(forecastData.list[0].main.temp - 273.15)}°C
          </p>
        </div>
      </div>
      <div className="weather-container">
        {filteredList.map((forecast) => (
          <WeatherItem forecast={forecast} key={forecast.dt} />
        ))}
      </div>
    </div>
  );
};

export default Weather;
