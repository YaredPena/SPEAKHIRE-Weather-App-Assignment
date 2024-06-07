import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import './Highlights.css'; 
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api'; 

const Highlights = ({ city, unit }) => { // Functional component with props
    const [highlightsData, setHighlightsData] = useState(null); // State for highlights data
    const [feelsLikeTemp, setFeelsLikeTemp] = useState(''); // State for feels like temperature

    useEffect(() => { // fetches highlights data when city changes
        const fetchHighlightsData = async () => {
            try {
                const response = await axios.get(`${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
                const data = response.data;
                setHighlightsData({
                    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    humidity: `${data.main.humidity}%`,
                    pressure: `${data.main.pressure} hPa`,
                    visibility: `${data.visibility / 1000} km`,
                    feelsLike: data.main.feels_like,
                });
            } catch (error) {
                console.error('Error fetching highlights data:', error);
            }
        };

        fetchHighlightsData();
    }, [city]);

    useEffect(() => {
        if (highlightsData) {
            const temp = unit === 'celsius'
                ? `${Math.round(highlightsData.feelsLike)}°C`
                : `${Math.round((highlightsData.feelsLike * 9 / 5) + 32)}°F`; //handles conversion within highlights data for feels like.
            setFeelsLikeTemp(temp);
        }
    }, [unit, highlightsData]);

    if (!highlightsData) return <div>Loading...</div>;

    return (
        <div className="highlights-container">
            {/* Title */}
            <h1 className="highlights-title">Todays Highlights</h1>
            <div className="highlight-row">
                {/* Title name for sunrise box */}
                <div className="highlight-item">
                    <div className="highlight-title">Sunrise</div>
                    <div className="highlight-value">{highlightsData.sunrise}</div>
                </div>
                {/* Title name for sunset box */}
                <div className="highlight-item">
                    <div className="highlight-title">Sunset</div>
                    <div className="highlight-value">{highlightsData.sunset}</div>
                </div>
                {/* Humidity */}
                <div className="highlight-item">
                    <div className="highlight-title">Humidity</div>
                    <div className="highlight-value">{highlightsData.humidity}</div>
                </div>
            </div>
            <div className="highlight-row">
                {/* Pressure */}
                <div className="highlight-item">
                    <div className="highlight-title">Pressure</div>
                    <div className="highlight-value">{highlightsData.pressure}</div>
                </div>
                {/* Visibility */}
                <div className="highlight-item">
                    <div className="highlight-title">Visibility</div>
                    <div className="highlight-value">{highlightsData.visibility}</div>
                </div>
                {/* Feels Like */}
                <div className="highlight-item">
                    <div className="highlight-title">Feels Like</div>
                    <div className="highlight-value">{feelsLikeTemp}</div>
                </div>
            </div>
        </div>
    );
};

export default Highlights;