import React from "react";
import "./WeatherItem.css";
import {
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindyCloudy,
  TiWeatherNight,
} from "react-icons/ti";
import { BsCloudMoon } from "react-icons/bs";

const WeatherItem = ({ forecast }) => {
  return (
    <div className="weather-item">
      <div className="date-desc">
        <p className="date">{`${new Date(forecast.dt_txt)
          .getDate()
          .toString()
          .padStart(2, "0")}.${(new Date(forecast.dt_txt).getMonth() + 1)
          .toString()
          .padStart(2, "0")}`}</p>
        <p className="time">{`${new Date(forecast.dt_txt).getHours()}:00`}</p>
        <p className="info">{forecast.weather[0].description}</p>
      </div>
      <div className="icon-degree">
        {getWeatherIcon(forecast)}
        <p className="tempereture">
          {Math.round(forecast.main.temp - 273.15)}°C
        </p>
      </div>
    </div>
  );
};

export default WeatherItem;
export const getWeatherIcon = (forecast) => {
  let icon;
  switch (forecast.weather[0].description) {
    case "overcast clouds":
      icon = <TiWeatherCloudy />;
      break;
    case "light rain":
      icon = <TiWeatherShower />;
      break;
    case "broken clouds":
      if (
        (new Date(forecast.dt_txt).getHours() > 20 &&
          new Date(forecast.dt_txt).getHours() < 24) ||
        (new Date(forecast.dt_txt).getHours() >= 0 &&
          new Date(forecast.dt_txt).getHours() < 6)
      ) {
        icon = <BsCloudMoon />;
      } else {
        icon = <TiWeatherPartlySunny />;
      }

      break;
    case "few clouds":
      if (
        (new Date(forecast.dt_txt).getHours() > 20 &&
          new Date(forecast.dt_txt).getHours() < 24) ||
        (new Date(forecast.dt_txt).getHours() >= 0 &&
          new Date(forecast.dt_txt).getHours() < 6)
      ) {
        icon = <BsCloudMoon />;
      } else {
        icon = <TiWeatherPartlySunny />;
      }
      break;
    case "scattered clouds":
      icon = <TiWeatherPartlySunny />;
      break;
    case "moderate rain":
      icon = <TiWeatherDownpour />;
      break;
    case "snow":
      icon = <TiWeatherSnow />;
      break;
    case "light snow":
      icon = <TiWeatherSnow />;
      break;
    case "clear sky":
      if (
        (new Date(forecast.dt_txt).getHours() > 20 &&
          new Date(forecast.dt_txt).getHours() < 24) ||
        (new Date(forecast.dt_txt).getHours() >= 0 &&
          new Date(forecast.dt_txt).getHours() < 6)
      ) {
        icon = <TiWeatherNight />;
      } else {
        icon = <TiWeatherSunny />;
      }
      break;

    default:
      icon = <TiWeatherSunny />;
  }
  return icon;
};
