import { useEffect, useState } from "react";
import { useFarmer } from "../../Context/FarmerContext";
import {
  Cloud,
  Sun,
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
  const [currentTime, setCurrentTime] = useState("");
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    // Update the time initially and every second
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const weatherDescriptionToIcon = {
    "clear sky": (
      <Sun
        color="yellow"
        size={200}
        style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}
      />
    ),
    "few clouds": (
      <Cloud
        color="gray"
        size={200}
        style={{ filter: "drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.5))" }}
      />
    ),
    "scattered clouds": (
      <Cloud
        color="gray"
        size={200}
        style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}
      />
    ),
    "broken clouds": (
      <Cloud
        color="gray"
        size={200}
        style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}
      />
    ),
    "shower rain": (
      <CloudRain
        color="blue"
        size={200}
        style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}
      />
    ),
    rain: (
      <CloudRain
        color="blue"
        size={200}
        style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}
      />
    ),
    thunderstorm: (
      <CloudRain
        color="blue"
        size={200}
        style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}
      />
    ),
    snow: (
      <Cloud
        color="white"
        size={200}
        style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}
      />
    ),
    mist: (
      <Cloud
        color="gray"
        size={200}
        style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}
      />
    ),
  };

  return (
    <div className="w-full text-white font-semibold  rounded ">
      {error && <p>{error}</p>}
      {weather ? (
        <>
          <p className="font-semibold text-2xl mb-2">
            Weather
          </p>
          <div className="h-max flex p-6">
            <div className="left w-[20%]  p-2 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg  shadow-lg">
              <div className=" w-max ">
                {weatherDescriptionToIcon[weather.weather[0].description] || (
                  <Cloud color="gray" size={200} />
                )}
                <p className="text-center mt-12 font-semibold text-2xl ">
                  {weather.weather[0].description}
                </p>
              </div>
            </div>

            <div className="right  h-[40vh]  gap-2 flex flex-col flex-1">
              <div className="top h-[20vh]   flex justify-evenly ">
                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 shadow-lg" style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}>
                  <div className="flex">
                    <Thermometer color="red" size={50} />
                    <span className="text-5xl">{weather.main.temp}°C</span>
                  </div>

                  <div className="mt-2 ms-2">
                    <span className="text-4xl  ms-2">Temperature</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 shadow-lg " style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}>
                  <span className="text-5xl  flex ">
                    <Thermometer color="red" size={50} />
                    {weather.main.feels_like}°C
                  </span>

                  <div className="mt-3 ms-7">
                    <div className=" text-4xl ">Feels Like</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 shadow-lg" style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}>
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
                <div className=" bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 shadow-lg" style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}>
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
              <div className="bottom h-[20vh] gap-2  flex justify-evenly  ">
                <div className="flex flex-col gap-4 ms-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 shadow-lg" style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}>
                  <div className="flex justify-evenly">
                    <Droplets color="Blue" size={50} />
                    <span className="text-4xl">{weather.main.humidity}%</span>
                  </div>

                  <div className="flex">
                    <span className="text-4xl ms-2">Humidity</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 shadow-lg " style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}>
                  <div className="flex">
                    <CircleGauge color="red" size={40} />
                    <span className="text-4xl">
                      {weather.main.pressure / 1000} atm
                    </span>
                  </div>

                  <div className="flex">
                    <span className="text-4xl ms-8 mt-4">Pressure</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 shadow-lg" style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}>
                  <div className="flex items-center justify-evenly">
                    <Wind color="white" size={50} />
                    <span className="text-3xl">{weather.wind.speed} km/h</span>
                  </div>

                  <div className="flex">
                    <span className="text-4xl ms-12 mt-2">Wind</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 shadow-lg" style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}>
                  <div className="flex items-center justify-evenly">
                    <Wind color="white" size={50} />
                    <span className="text-3xl">{weather.wind.gust} km/h</span>
                  </div>

                  <div className="flex">
                    <span className="text-3xl ms-2 mt-2">Wind Gusts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex  gap-[80px] ps-12 ms-2 bg-opacity-30 backdrop-blur-lg bg-white/20 rounded-lg p-4 shadow-lg" style={{ filter: "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))" }}>
            <div className="flex flex-col gap-2">
            <div className="flex gap-2 ms-[2.05vw]">
              {weather.main.temp_max}°C
              <p> |</p>
              {weather.main.temp_min}°C
            </div>
            <div className="flex gap-2">
              <p>max temp </p>
              <p>|</p>
              <span>min temp</span>
            </div>
            </div>
            <div className="flex flex-col gap-2">
            <div className="flex gap-2 ms-[1.1vw]">
              {weather.coord.lat}
              <p> |</p>
              {weather.coord.lon}
            </div>
            <div className="flex gap-2 ms-[0.97vw]">
              <p>Latitude</p>
              <p>|</p>
              <span>Longitude</span>
            </div>
            </div>
            <div className="flex flex-col gap-2">
            <div className="flex gap-2 ms-[1.5vw]">
              {(weather.sys.country)==="IN"?"India":weather.sys.country}
             
            </div>
            <div className="flex gap-2 ms-[0.97vw]">
              <p>Country</p>
            </div>
            </div>
            <div className="flex flex-col gap-2">
            <div className="flex gap-2 ms-[3vw]">
              {weather.name}
             
            </div>
            <div className="flex gap-2 ms-[0.97vw]">
              <p>Current Location</p>
            </div>
            </div>
            <div className="flex flex-col gap-2">
            <div className="flex gap-2 ms-[3vw]">
            </div>
            <div className="flex  flex-col absolute right-10 gap-2 ms-[0.97vw]">
            <div className="flex gap-2 ms-[3vw]">{currentTime}</div>
              <p className="text-right pr-7">Time</p>
            </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
