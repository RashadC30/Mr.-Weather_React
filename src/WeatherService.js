const API_Key = "665326c7a24acae1b4c22cc56af10974";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "imperial") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=
        ${city}&appid=${API_Key}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    clouds: { all },
    sys: { country, sunrise, sunset },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    speed,
    all,
    country,
    sunrise,
    sunset,
    name,
  };
};

export { getFormattedWeatherData };
