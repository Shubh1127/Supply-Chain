import  { useEffect, useState } from 'react';
import { useFarmer } from '../../Context/FarmerContext';
import { Cloud, Sun, Moon, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react'
import './Weather.css'
const Weather = () => {
  const { getWeather, weather } = useFarmer();
  const [error, setError] = useState('');
  console.log(weather);
  useEffect(() => {
    const getLocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeather(latitude, longitude);
          },
          (error) => {
            console.log(error);
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
  }, [getWeather,weather]);
  
  const formatTime=(unixTimestamp)=> {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  const weatherDescriptionToIcon = {
    'clear sky': <Sun color='yellow' size={200} />,
    'few clouds': <Cloud color='gray' size={50} />,
    'scattered clouds': <Cloud color='gray' size={50} />,
    'broken clouds': <Cloud color='gray' size={50} />,
    'shower rain': <CloudRain color='blue' size={50} />,
    'rain': <CloudRain color='blue' size={50} />,
    'thunderstorm': <CloudRain color='blue' size={50} />,
    'snow': <Cloud color='white' size={50} />,
    'mist': <Cloud color='gray' size={50} />,
  };

  return (
    <div className="w-full   rounded ">
      {error && <p style={styles.error}>{error}</p>}
      {weather ? (
        <>
        <p className='font-semibold text-xl mb-2'>Current Location: {weather.name}</p>
        <div className='h-max flex  bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-6'>
        <div className='left bg-pink-800 p-2'>
              <div className=' w-max bg-red-500 w-1/4  '>
                     {weatherDescriptionToIcon[weather.weather[0].description] || <Cloud color='gray' size={50} />}
                  <p className='ms-14 mt-12 font-semibold text-2xl '>{weather.weather[0].description}</p>
              </div> 
        </div>
        <div className='right w-max'>
          <div className='top'>

          </div>

          <div className='bottom'>
            
          </div>
        </div>
          <div className='p-3 h-[150px] flex bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg '>
          <div className='flex flex-col gap-4 bg-green-700'>
          <div className="flex">
          <Thermometer color='red' size={50} />
          <span className='text-5xl'>{weather.main.temp}°C</span>
          </div>

          <div className="flex">
          <Droplets color='skyBlue' size={50} />
          <span className='text-5xl ms-2'>{weather.main.humidity}%</span>
          </div>
            </div>
          </div>
          <div className='p-3 bg-blue-500 h-[150px] flex bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg '>
          <div className='flex flex-col gap-4'>
          <div className="flex">
          <Thermometer color='red' size={50} />
          <span className='text-5xl'>{weather.main.temp}°C</span>
          </div>

          <div className="flex">
          <Droplets color='skyBlue' size={50} />
          <span className='text-5xl ms-2'>{weather.main.humidity}%</span>
          </div>
            </div>
          </div>
          
          <div className='p-3 bg-blue-500 h-[150px] flex bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg '>
          <div className='flex flex-col gap-4'>
          <div className="flex">
          <Thermometer color='red' size={50} />
          <span className='text-5xl'>{weather.main.temp}°C</span>
          </div>

          <div className="flex">
          <Droplets color='skyBlue' size={50} />
          <span className='text-5xl ms-2'>{weather.main.humidity}%</span>
          </div>

            </div>
          </div>
        </div>

        <div className="weather-info">
          
          
          <div className="wind">
          <span>Wind: {weather.wind.speed} km/h</span>
        </div>
        <div className="forecast">
        <div className="sunset">
          <span>Sunset: {formatTime(weather.sys.sunset)}</span>
        </div>
        <div className="sunset">
          <span>Sunset: {formatTime(weather.sys.sunrise)}</span>
        </div>
      </div>
        </div>
        <div style={styles.weatherInfo}>
          <h2 style={styles.weatherTitle}>Current Weather</h2>
          <p style={styles.weatherDetail}>feels like: {weather.main.feels_like}°C</p>
          <p style={styles.weatherDetail}>min temp: {weather.main.temp_min}°C</p>
          <p style={styles.weatherDetail}>max temp: {weather.main.temp_max}°C</p>
          <p style={styles.weatherDetail}>pressure: {(weather.main.pressure)/1000} atm</p>
          <p style={styles.weatherDetail}>Humidity: </p>
          <p style={styles.weatherDetail}>Wind Speed: </p>
          <p style={styles.weatherDetail}>Wind Gustsa: {weather.wind.gust} km/h</p>
          <p style={styles.weatherDetail}>Visibility {(weather.visibility)/100} m</p>
          <p style={styles.weatherDetail}>Weather Description: {weather.weather[0].description}</p>
          <p style={styles.weatherDetail}>
            Sunrise: {formatTime(weather.sys.sunrise)}
          </p>
          <p style={styles.weatherDetail}>
            Sunset: 
          </p>
        </div>
        </>
      ) : (
        <p>Loading weather data...</p>
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
};

export default Weather;