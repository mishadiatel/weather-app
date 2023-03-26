import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { SEARCH_TOKEN } from "../config";
import SearchResultItem from "./SearchResultItem";
import "./SearchForm.css";

const SearchForm = ({ onSubmitForm }) => {
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);

  const cityNameChangeHandler = (event) => {
    setCityName(event.target.value);
    if (event.target.value.length > 1) {
      getCities(event.target.value);
    } else setCities([]);
  };
  const submitFormHandler = (event) => {
    event.preventDefault();
    onSubmitForm(cityName);

    setCities([]);
  };
  const clickSearchResultHandler = (cityName) => {
    setCityName(cityName);
    onSubmitForm(cityName);
    setCities([]);
    // setCityName('');
  };
  const getCities = async (cityName) => {
    const city = cityName.toLowerCase().replace(" ", "%20");

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${SEARCH_TOKEN}&types=place&autocomplete=true`
    );
    const data = await response.json();
    console.log(data);
    const citiesDataArr = data.features.map((city) => {
      const cityInfoArr = city["place_name"].split(", ");
      const cityInfo = {
        id: city.id,
        cityName: cityInfoArr[0],

        country: cityInfoArr[cityInfoArr.length - 1],
      };
      if (cityInfoArr.length === 3) {
        cityInfo.region = cityInfoArr[1];
      }
      if (cityInfoArr.length === 4) {
        cityInfo.region = cityInfoArr[2];
      }
      return cityInfo;
    });
    setCities(citiesDataArr);
  };

  return (
    <>
      <div className="form-wrapper">
        <form className="search-form" onSubmit={submitFormHandler}>
          <TiWeatherPartlySunny className="weather-logo" />
          <div className="input-wrapper">
            <BsSearch className="search-icon" />
            <input
              type="text"
              className="cityInput"
              onChange={cityNameChangeHandler}
              placeholder="Enter city"
              value={cityName}
            />
          </div>

          <button type="submit">Search</button>
        </form>
      </div>
      {cities.length > 0 && (
        <div className="search-result-container">
          {cities.map((city) => (
            <SearchResultItem
              city={city}
              key={city.id}
              onClickSearchResult={clickSearchResultHandler}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchForm;
