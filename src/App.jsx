import { useState } from "react";

import "./App.css";
import { API_KEY } from "./config";
import axios from "axios";
import SearchForm from "./conponents/SearchForm";
import { ColorRing } from "react-loader-spinner";
import Weather from "./conponents/Weather";

function App() {
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitFormHandler = (cityName) => {
    getWeatherData(cityName).catch((error) => {
      setForecastData(null);
      if (error.request.status === 404) {
        setIsLoading(false);
        setError("Not Found City");
      }
    });
  };

  const getWeatherData = async (cityName) => {
    setError(null);
    setForecastData(null);
    setIsLoading(true);

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`
    );
    const data = response.data;
    setForecastData(data);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <SearchForm onSubmitForm={submitFormHandler} />
      {error && !isLoading && (
        <div className="center">
          <p className="error-message">{error}</p>
        </div>
      )}
      {isLoading && !error && (
        <div className="center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{
              height: "100px",
              width: "100px",
            }}
            wrapperClass="blocks-wrapper"
            // colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            colors={["#000"]}
          />
        </div>
      )}
      {forecastData && <Weather forecastData={forecastData} />}
    </div>
  );
}

export default App;
