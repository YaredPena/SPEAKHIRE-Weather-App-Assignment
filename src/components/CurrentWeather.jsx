import React, { useState, useEffect } from 'react'; // hooks, use effect
import axios from 'axios';
import './CurrentWeather.css';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api';

// CurrentWeather function
const CurrentWeather = ({ city, unit }) => {
    const [weatherData, setWeatherData] = useState(null); // this state variable stores weather data. starts as null (no weather data)

    // useEffect Hook: will fetch weather data either when the component mounts or the city is changed
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // GET request to fetch weather data from the API
                const weatherResponse = await axios.get(`${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
                setWeatherData(weatherResponse.data); // Updates state with fetched data
            } catch (error) {
                console.error('Error fetching weather data:', error); // Spits out error in the event fetching fails
            }
        };

        fetchWeatherData(); // calls function in order to fetch weather data.
    }, [city]); // reruns when the city changes. 

    // in case no weather data appears => send loading message.
    if (!weatherData) return <div>Loading...</div>;

    // Celsius to Fahrenheit Conversion
    const temperature = unit === 'celsius' ? weatherData.main.temp : (weatherData.main.temp * 9/5) + 32;
    const weatherDescription = weatherData.weather[0].description; // provides weather description
    const date = new Date(weatherData.dt * 1000); // Convert Unix timestamp to Date object
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short'
    }).format(date); // Format date

    const location = `${weatherData.name}, ${weatherData.sys.country}`; // Formatting

    // Component UI
    return (
        <div className="current-weather">
            {/* Component Title */}
            <h4 className="now-text">Current Weather</h4>

            {/* Component Details */}
            <div className="weather-details">
                <div className="temperature">
                    {Math.round(temperature)}°{unit === 'celsius' ? 'C' : 'F'}
                </div>
                <div className="weather-description">
                    {weatherDescription}
                </div>
                <hr />
                <div className="date-info">
                    {formattedDate}
                </div>
                <div className="location">
                    {location}
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;


/* This page must use:
OpenWeather_API
Current day weather data
hooks??
Farenheit to celsius

*/