import React from "react";
import classes from "./SearchResultItem.module.css";

const SearchResultItem = ({ city, onClickSearchResult }) => {
  return (
    <div className={classes["search-item-wrapper"]} onClick={onClickSearchResult.bind(null, city.cityName)}>
      <h3 className={classes["search-city"]}>{city.cityName} </h3>
      <div className={classes["city-info"]}>
        {city.region && <p className={classes["city-region"]}>{city.region}, </p>}
        <p className={classes["city-country"]}>{city.country}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;
