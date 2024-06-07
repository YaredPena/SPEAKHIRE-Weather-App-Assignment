// Exports for OpenWeather API URL and API key
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "6474e134d3145f81fa012c3ee93fd9d5";

// function for fetching highlights data through Openweather API key
export const getHighlightsData = async () => {
  try {
    // fetch weather data for London
    const response = await fetch(`${WEATHER_API_URL}/weather?q=London&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();

    // check if the response is successful
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch data');
    }

    // process the data and return the highlights
    const highlightsData = {
      /*airQuality: calculateAirQualityIndex(data.main.pm10, data.main.so2, data.main.no2, data.main.o3),*/
      sunrise: formatTime(data.sys.sunrise),
      sunset: formatTime(data.sys.sunset),
      humidity: `${data.main.humidity}%`,
      pressure: `${data.main.pressure} hPa`,
      visibility: `${data.visibility / 1000} km`,
      feelsLike: `${data.main.feels_like}°C`,
    };

    return highlightsData;
  } catch (error) {
    // log + re-throw any errors that occur during the fetch process
    console.error('Error fetching highlights data:', error);
    throw error;
  }
};

//ommitted! (air quality didn't have enough space in highlights)
// function to calculate air quality index based on provided parameters
/*const calculateAirQualityIndex = (pm10, so2, no2, o3) => {
  const aqi = pm10 + so2 + no2 + o3;
  if (aqi < 50) {
    return 'Good';
  } else if (aqi < 100) {
    return 'Ok';
  } else {
    return 'Bad';
  }
};*/

// function to format Unix timestamp to HH:MM format
const formatTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours().toString().padStart(2, '0'); // ensure hours are always 2 digits
  const minutes = date.getMinutes().toString().padStart(2, '0'); // ensure minutes are always 2 digits
  return `${hours}:${minutes}`;
};