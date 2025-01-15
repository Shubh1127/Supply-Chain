import { useEffect, useState } from "react";
import { useFarmer } from "../../Context/FarmerContext";
import {
  Cloud,
  Sun,
  Moon,
  Eye,
  CircleGauge,
  CloudRain,
  Wind,
  Sunrise,
  Sunset,
  Droplets,
  Thermometer,
} from "lucide-react";
import "./Weather.css";
const Weather = () => {
  const { getWeather, weather } = useFarmer();
  const [error, setError] = useState("");
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
            setError("Error getting location. Please allow location access.");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    if (!weather) {
      getLocationAndFetchWeather();
    }
  }, [getWeather, weather]);

  const formatTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const weatherDescriptionToIcon = {
    "clear sky": <Sun color="yellow" size={200} />,
    "few clouds": <Cloud color="gray" size={50} />,
    "scattered clouds": <Cloud color="gray" size={50} />,
    "broken clouds": <Cloud color="gray" size={50} />,
    "shower rain": <CloudRain color="blue" size={50} />,
    rain: <CloudRain color="blue" size={50} />,
    thunderstorm: <CloudRain color="blue" size={50} />,
    snow: <Cloud color="white" size={50} />,
    mist: <Cloud color="gray" size={50} />,
  };

  return (
    <div className="w-full   rounded ">
      {error && <p>{error}</p>}
      {weather ? (
        <>
          <p className="font-semibold text-xl mb-2">
            Current Location: {weather.name}
          </p>
          <div className="h-max flex p-6">
            <div className="left w-[20%]  p-2">
              <div className=" w-max">
                {weatherDescriptionToIcon[weather.weather[0].description] || (
                  <Cloud color="gray" size={50} />
                )}
                <p className="ms-14 mt-12 font-semibold text-2xl ">
                  {weather.weather[0].description}
                </p>
              </div>
            </div>

            <div className="right  h-[40vh]  gap-2 flex flex-col flex-1">
              <div className="top h-[20vh]   flex justify-evenly ">
                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4">
                  <div className="flex">
                    <Thermometer color="red" size={50} />
                    <span className="text-5xl">{weather.main.temp}°C</span>
                  </div>

                  <div className="mt-2 ms-2">
                    <span className="text-4xl font-semibold ms-2">
                      Curr Temp
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 ">
                <span className="text-5xl  flex ">
                    <Thermometer color="red" size={50} />
                      {weather.main.feels_like}°C
                    </span>

                  <div className="mt-3 ms-2">
                  <div className=" text-4xl font-semibold">Feels Like</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-evenly">
                    <Eye color="white" size={50} />
                    <span className="text-3xl">
                    {weather.visibility / 100} m
                    </span>
                    
                  </div>

                  <div className="flex">
                    <span className="text-5xl ms-2">
                      <span className="text-5xl">
                      <span className="text-4xl">Visibility</span>
                       
                      </span>
                    </span>
                  </div>
                </div>
                <div className=" bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4">
                  <div className="flex flex-col gap-3">
                    <div className="">
                      <span className="flex gap-3">
                        <Sunrise color="orange" size={30} />
                        <span> {formatTime(weather.sys.sunrise)}</span>
                      </span>
                      <p className="ms-7">Sunrise</p>
                    </div>
                    <div>
                    <span className="flex gap-3">
                        <Sunset color="red" size={30} />
                        <span> {formatTime(weather.sys.sunset)}</span>
                      </span>
                      <span className="ms-8"> Sunset</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom h-[20vh]  flex justify-evenly  ">
                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 ">
                  <div className="flex justify-evenly">
                    <Droplets color="skyBlue" size={50} />
                    <span className="text-5xl">{weather.main.humidity}%</span>
                  </div>

                  <div className="flex">
                    <span className="text-5xl ms-2">
                        Humidity
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 ">
                  <div className="flex">
                    <CircleGauge color="red" size={50} />
                    <span className="text-5xl">{weather.main.pressure / 1000} atm</span>
                  </div>

                  <div className="flex">
                    <span className="text-5xl ms-8">
                      Pressure
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4">
                  <div className="flex">
                    <Thermometer color="red" size={50} />
                    <span className="text-5xl">{weather.main.temp}°C</span>
                  </div>

                  <div className="flex">
                    <Droplets color="skyBlue" size={50} />
                    <span className="text-5xl ms-2">
                      {weather.main.humidity}%
                    </span>
                  </div>
                </div>
                <div className="sunrise bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4">
                  <span>Sunset: {formatTime(weather.sys.sunset)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="weather-info">
            <div className="wind">
              {/* <span>Wind: {weather.wind.speed} km/h</span> */}
            </div>
            <div className="forecast"></div>
          </div>
          <div>
            <h2>Current Weather</h2>
            <p></p>
            <p>min temp: {weather.main.temp_min}°C</p>
            <p>max temp: {weather.main.temp_max}°C</p>
            <p>pressure: </p>
            <p>Humidity: </p>
            <p>Wind Speed: </p>
            <p>Wind Gustsa: {weather.wind.gust} km/h</p>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
