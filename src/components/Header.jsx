import React, { useState } from 'react';
import axios from 'axios';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api'; // Importing API URL and key
import './Header.css'; //

const Header = ({ setCity, unit, setUnit }) => { // Function for header and props

    const [searchQuery, setSearchQuery] = useState(''); // search query

    const handleSearch = (e) => { // Function for handle search
        if (e.key === 'Enter' || e.type === 'click') { // allows user to click enter key or search button to search for city
            setCity(searchQuery); // sets the city using the search query
            setSearchQuery(''); // sets the search query
        }
    };

    const handleCurrentLocation = () => { // current location function
        if (navigator.geolocation) { // checks if geolocation is supported
            navigator.geolocation.getCurrentPosition(async (position) => { // Grabs current position
                const { latitude, longitude } = position.coords; // Destructure latitude and longitude
                try {
                    const response = await axios.get(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`); // Fetch weather data for current location
                    setCity(response.data.name); // Sets the city using the response data
                } catch (error) {
                    console.error('Error fetching weather data for current location:', error); // Log and error if fetching data fails
                }
            });
        } else {
            alert("Geolocation is not supported by this browser."); // Alert if geolocation is not supported
        }
    };

    const toggleUnit = () => { // Function to toggle temperature unit between Celsius and Fahrenheit
        setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius'); // Toggle unit
    };

    return (
        <header className="header"> {/* Header element */}
            <h1 className="header-title">Weather App</h1> {/* Title */}
            <div className="header-content"> {/* Header content */}
                <input
                    type="text"
                    placeholder="Search city..."
                    className="search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                /> {/* Input for searching city */}
                <button className="search-button" onClick={handleSearch}> {/* Button to trigger search */}
                    Search
                </button>
                <button className="location-button" onClick={handleCurrentLocation}> {/* Button to get current location */}
                    Current Location
                </button>
                <button className="unit-button" onClick={toggleUnit}> {/* Button to toggle temperature unit */}
                    {unit === 'celsius' ? 'Switch to °F' : 'Switch to °C'}
                </button>
            </div>
        </header>
    );
};

export default Header; // Exporting the Header component