import React, { useState } from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Highlights from './components/Highlights';
import ThroughoutDayWeather from './components/ThroughoutDayWeather';
import './App.css';

function App() {
    // sets city and degree when webapp starts
    const [city, setCity] = useState('London');
    const [unit, setUnit] = useState('celsius');

    return (
        <div className="App">
            {/* Header component with city selection and unit conversion */}

            <Header setCity={setCity} unit={unit} setUnit={setUnit} />
            <div className="content-container">

                <div className="left-panel">
                    {/* Current weather component */}
                    <CurrentWeather city={city} unit={unit} />

                    {/* Weather forecast component */}
                    <Forecast city={city} unit={unit} />
                </div>

                <div className="right-panel">
                    {/* Weather highlights component */}
                    <Highlights city={city} unit={unit} />
                </div>

                <div className="bottom-panel">
                    {/* Throughout the day weather component */}
                    <ThroughoutDayWeather city={city} unit={unit} />
                </div>
            </div>
        </div>
    );
}

export default App;