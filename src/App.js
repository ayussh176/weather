import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");

  const API_KEY = "63ad473d536d6500c1cac051518a69c4"; // Replace with your OpenWeatherMap API Key
  

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?`, {
        params: {
          q: city,
          units: "metric",
          appid: API_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setWeather(response.data);
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("API Error:", error);
      setError("City not found. Please enter a valid city.");
      setWeather(null);
    }
  };

  // Toggle Theme (Dark/Light)
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`app-container ${theme}`}>
      <h1>🌤 Weather Forecast</h1>

      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value.trim())}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Weather Info */}
      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather-icon"
          />
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Weather:</strong> {weather.weather[0].description}
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
