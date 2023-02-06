import React from "react";
import "./Details.css";

import { FaLongArrowAltDown, FaLongArrowAltUp, FaWind } from "react-icons/fa";
import { TfiFaceSmile } from "react-icons/tfi";
import { BsFillCloudFill } from "react-icons/bs";
import { MdOutlineWaterDrop } from "react-icons/md";
// import { getFormattedWeatherData } from "../WeatherService";

const Details = ({ weather, units }) => {
  const tempUnit = units === "imperial" ? "F" : "C";
  const windUnit = units === "imperial" ? "m/h" : "m/s";

  const card = [
    {
      id: 1,
      icon: <FaLongArrowAltUp />,
      title: "min",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaLongArrowAltDown />,
      title: "max",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <MdOutlineWaterDrop />,
      title: "Humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 4,
      icon: <BsFillCloudFill />,
      title: "Cloud",
      data: weather.all,
      unit: "%",
    },
    {
      id: 5,
      icon: <TfiFaceSmile />,
      title: "Feels Like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "Wind Speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];

  return (
    <div className="section section__details">
      {card.map(({ id, icon, title, data, unit }) => (
        <div key={id} className="card">
          <div className="detail__card-icon">
            {icon}
            <small>{title}</small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Details;
