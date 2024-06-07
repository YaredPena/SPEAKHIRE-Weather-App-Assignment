import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api'; 
import './ThroughoutDayWeather.css'; 

const ThroughoutDayWeather = ({ city, unit }) => { // Through Day Weather function
  const [weatherData, setWeatherData] = useState([]); // state weather data

  useEffect(() => { // fetch weather data when city changes
    const fetchWeatherData = async () => { // async function to fetch weather data
      try { // Try block for API request
        const response = await axios.get(`${WEATHER_API_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`); // API request for weather data
        const today = new Date().getDate(); // Gets current day + current hour (line under it.)
        const currentHour = new Date().getHours(); 

        // Create an array to store weather data for each hour of the current day
        const hourlyData = [];

        // Process the data to fill in missing hourly data
        response.data.list.forEach(weather => { // iterate over each weather data entry
          const date = new Date(weather.dt_txt); 
          if (date.getDate() === today) { // check if data is for current day
            // fill in data for each hour based on available data (Open weather does 3-hour intervals).
            for (let hour = date.getHours(); hour < date.getHours() + 3; hour++) {
              if (hour >= currentHour && hour < 24) { // check if hour is within current day
                hourlyData.push({ // push formatted data to hourlyData array
                  dt_txt: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour).toISOString(), // format date and time
                  main: weather.main, // get main weather details + description.
                  weather: weather.weather
                });
              }
            }
          }
        });

        setWeatherData(hourlyData); // sets weather data state
      } catch (error) { // catch block for error handling
        console.error('Error fetching weather data', error); // Log error to console
      }
    };
  
    fetchWeatherData(); // calls fetchWeatherData function
  }, [city]); // runs effect when city changes

  const convertTemperature = (temp) => { // function to convert temperature based on unit
    return unit === 'celsius' ? temp.toFixed(1) : ((temp * 9 / 5) + 32).toFixed(1); // convert temperature
  };

  return (
    <div className="throughout-day-weather"> 
    {/* Title section */}
      <div className="title"> 
        <h2>Todays Weather</h2> 
      </div>
      <div className="weather-container"> {/* Container for weather cards */}
        {weatherData.map((weather, index) => ( // map over weather data to display weather cards
          <div key={index} className="weather-card"> {/* Individual weather card */}
            <p>{new Date(weather.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> {/* Display time */}
            <p>{convertTemperature(weather.main.temp)}° {unit === 'celsius' ? 'C' : 'F'}</p> {/* Display temperature */}
            <p>{weather.weather[0].description}</p> {/* Display weather description */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThroughoutDayWeather;
