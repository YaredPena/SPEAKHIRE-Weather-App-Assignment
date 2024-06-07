import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import './Forecast.css'; 
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api'; // Import API URL and key from the config file

// Forecast function 
const Forecast = ({ city, unit }) => {
    const [forecastData, setForecastData] = useState([]); // Declare state variable to store forecast data

    // useEffect hook to fetch forecast data when the component mounts or when the city changes
    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                // Make a GET request to fetch forecast data from the API
                const forecastResponse = await axios.get(`${WEATHER_API_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
                const now = new Date();
                const today = now.getDate();
                // Filter the forecast data to get readings at 12:00:00 excluding today
                const dailyData = forecastResponse.data.list.filter((reading) => {
                    const readingDate = new Date(reading.dt_txt).getDate();
                    return reading.dt_txt.includes("12:00:00") && readingDate !== today;
                });
                setForecastData(dailyData.slice(0, 5)); // Set state with filtered data (next 5 days)
            } catch (error) {
                console.error('Error fetching forecast data:', error); // Log error if the request fails
            }
        };

        fetchForecastData(); // Call the function to fetch forecast data
    }, [city]); // Dependency array: re-run the effect when 'city' changes

    // Function to format Unix timestamp into a readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        }).format(date);
    };

    // Render the component UI
    return (
        <div className="forecast-container">
            <div className="forecast">
                <strong className="forecast-title">4-Day Forecast</strong>
                {forecastData.map((day, index) => {
                    // Calculate temperature based on the selected unit
                    const temperature = unit === 'celsius' ? day.main.temp : (day.main.temp * 9 / 5) + 32;
                    return (
                        <div className="forecast-item" key={index}>
                            <div className="weather">{Math.round(temperature)}°{unit === 'celsius' ? 'C' : 'F'}</div>
                            <div className="date">{formatDate(day.dt)}</div>
                            <div className="day">{new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(day.dt * 1000))}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Forecast; // Export the component as the default export