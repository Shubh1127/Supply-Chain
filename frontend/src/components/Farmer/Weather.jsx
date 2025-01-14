import { useState, useEffect } from 'react';
import { useFarmer } from '../../Context/FarmerContext';

const weatherCodeToImage = {
  0: 'https://static.vecteezy.com/system/resources/previews/020/716/997/non_2x/3d-minimal-weather-forecast-concept-clear-sky-in-the-morning-weather-icon-3d-illustration-png.png',
  1: 'https://banner2.cleanpng.com/20180712/iih/aaw9f4fn1.webp',
  2: 'https://banner2.cleanpng.com/20180712/iih/aaw9f4fn1.webp',
  3: 'https://banner2.cleanpng.com/20180712/iih/aaw9f4fn1.webp',
  45: 'https://static.vecteezy.com/system/resources/previews/020/716/997/non_2x/3d-minimal-weather-forecast-concept-clear-sky-in-the-morning-weather-icon-3d-illustration-png.png',
  48: 'https://static.vecteezy.com/system/resources/previews/020/716/997/non_2x/3d-minimal-weather-forecast-concept-clear-sky-in-the-morning-weather-icon-3d-illustration-png.png',
  51: 'https://cdn-icons-png.flaticon.com/512/6142/6142637.png',
  53: 'https://cdn-icons-png.flaticon.com/512/6142/6142637.png',
  55: 'https://cdn-icons-png.flaticon.com/512/6142/6142637.png',
  56: 'https://cdn-icons-png.flaticon.com/512/6142/6142637.png',
  57: 'https://cdn-icons-png.flaticon.com/512/6142/6142637.png',
  61: 'https://img.freepik.com/premium-vector/vector-isolated-weather-app-icon-with-rainy-cloud-interface-elements-flat-design-web-banner_1071100-313.jpg',
  63: 'https://img.freepik.com/premium-vector/vector-isolated-weather-app-icon-with-rainy-cloud-interface-elements-flat-design-web-banner_1071100-313.jpg',
  65: 'https://img.freepik.com/premium-vector/vector-isolated-weather-app-icon-with-rainy-cloud-interface-elements-flat-design-web-banner_1071100-313.jpg',
  66: 'https://cdn-icons-png.flaticon.com/512/10790/10790855.png',
  67: 'https://cdn-icons-png.flaticon.com/512/10790/10790855.png',
  71: 'https://www.shutterstock.com/image-vector/single-weather-icon-cloud-snow-260nw-108922655.jpg',
  73: 'https://www.shutterstock.com/image-vector/single-weather-icon-cloud-snow-260nw-108922655.jpg',
  75: 'https://www.shutterstock.com/image-vector/single-weather-icon-cloud-snow-260nw-108922655.jpg',
  77: 'https://img.freepik.com/premium-vector/vector-isolated-weather-app-icon-with-snow-cloud-interface-elements-flat-design-web_1071100-327.jpg',
  80: 'https://e7.pngegg.com/pngimages/29/222/png-clipart-tango-desktop-project-weather-forecasting-computer-icons-rain-rain-cloud-weather-forecasting.png',
  81: 'https://e7.pngegg.com/pngimages/29/222/png-clipart-tango-desktop-project-weather-forecasting-computer-icons-rain-rain-cloud-weather-forecasting.png',
  82: 'https://e7.pngegg.com/pngimages/29/222/png-clipart-tango-desktop-project-weather-forecasting-computer-icons-rain-rain-cloud-weather-forecasting.png',
  85: 'https://cdn-icons-png.flaticon.com/512/4834/4834463.png',
  86: 'https://cdn-icons-png.flaticon.com/512/4834/4834463.png',
  95: 'https://cdn-icons-png.flaticon.com/512/4834/4834463.png',
  96: 'https://cdn-icons-png.flaticon.com/512/3104/3104612.png',
  99: 'https://cdn-icons-png.flaticon.com/512/3104/3104612.png',
};

const Weather = () => {
  const { getWeather, weather } = useFarmer();
  const [error, setError] = useState('');

  useEffect(() => {
    const getLocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeather(latitude, longitude);
            console.log('Latitude:', latitude, 'Longitude:', longitude);
          },
          (error) => {
            setError('Error getting location. Please allow location access.');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    if (!weather) {
      getLocationAndFetchWeather();
    }
  }, [getWeather, weather]);

  console.log(weather); // Log the weather data to understand its structure

  return (
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}
      {weather && (
        <div style={styles.weatherInfo}>
          <h2 style={styles.weatherTitle}>Current Weather</h2>
          <img src={weatherCodeToImage[weather.hourly.weather_code[0]]} alt="Weather Icon" style={styles.weatherIcon} />
          <p style={styles.weatherDetail}>Temperature: {weather.hourly.temperature_2m[0]}°C</p>
          <p style={styles.weatherDetail}>Humidity: {weather.hourly.relative_humidity_2m[0]}%</p>
          <p style={styles.weatherDetail}>Apparent Temperature: {weather.hourly.apparent_temperature[0]}°C</p>
          <p style={styles.weatherDetail}>Precipitation: {weather.hourly.precipitation[0]} mm</p>
          <p style={styles.weatherDetail}>Wind Speed: {weather.hourly.wind_speed_10m[0]} km/h</p>
          <p style={styles.weatherDetail}>Visibility: {weather.hourly.visibility[0]} m</p>
          <p style={styles.weatherDetail}>Soil Temperature at 6 cm: {weather.hourly.soil_temperature_0cm[0]}°C</p>
          <p style={styles.weatherDetail}>Soil Moisture at 1 to 3 cm: {weather.hourly.soil_moisture_0_to_1cm[0]} m³/m³</p>

          <h2 style={styles.weatherTitle}>Daily Weather</h2>
          {weather.daily.time.map((time, index) => (
            <div key={index} style={styles.dailyWeather}>
              <p style={styles.weatherDetail}>Date: {time}</p>
              <img src={weatherCodeToImage[weather.daily.weather_code[index]]} alt="Weather Icon" style={styles.weatherIcon} />
              <p style={styles.weatherDetail}>Max Temperature: {weather.daily.temperature_2m_max[index]}°C</p>
              <p style={styles.weatherDetail}>Min Temperature: {weather.daily.temperature_2m_min[index]}°C</p>
              <p style={styles.weatherDetail}>Apparent Max Temperature: {weather.daily.apparent_temperature_max[index]}°C</p>
              <p style={styles.weatherDetail}>Apparent Min Temperature: {weather.daily.apparent_temperature_min[index]}°C</p>
              <p style={styles.weatherDetail}>Sunrise: {weather.daily.sunrise[index]}</p>
              <p style={styles.weatherDetail}>Sunset: {weather.daily.sunset[index]}</p>
              <p style={styles.weatherDetail}>Daylight Duration: {weather.daily.daylight_duration[index]} s</p>
              <p style={styles.weatherDetail}>Sunshine Duration: {weather.daily.sunshine_duration[index]} s</p>
              <p style={styles.weatherDetail}>Precipitation Sum: {weather.daily.precipitation_sum[index]} mm</p>
              <p style={styles.weatherDetail}>Rain Sum: {weather.daily.rain_sum[index]} mm</p>
              <p style={styles.weatherDetail}>Showers Sum: {weather.daily.showers_sum[index]} mm</p>
              <p style={styles.weatherDetail}>Precipitation Probability Max: {weather.daily.precipitation_probability_max[index]}%</p>
              <p style={styles.weatherDetail}>Max Wind Speed: {weather.daily.wind_speed_10m_max[index]} km/h</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  weatherInfo: {
    textAlign: 'center',
  },
  weatherTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  weatherDetail: {
    fontSize: '18px',
  },
  dailyWeather: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  weatherIcon: {
    width: '50px',
    height: '50px',
  },
};

export default Weather;