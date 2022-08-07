import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const apiKey = 'd5543741f9f536610ce280722c88b6e3';

  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");


  const onWeatherFormSubmit = (e) => {
    e.preventDefault();

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    axios.get(weatherApiUrl)
      .then(function(response) {
        setWeatherInfo(response.data);
        console.log(weatherInfo);
        setErrorMessage("");
      })
      .catch(function(err) {
        console.log(err);
        setWeatherInfo({});
        setErrorMessage(err.response.data.message)

      })
  }

  return (
    <div className="App">
      <div className='container-fluid'>
        <div className='row'>
          
          <div className='col-md-12'>

            <form className="weatherForm" onSubmit={onWeatherFormSubmit}>
              <h1 className="weatherAppTitle">React Weather app</h1>
              <input className="weatherFormCityInput" type="text" value={city} onChange={(e) => {setCity(e.target.value)}} placeholder="Enter city"></input>

              <button type="submit" className='weatherFormSubmitButton btn btn-success'>Get Weather</button>

            </form>
          </div>

          <div className='col-md-12'>
            {errorMessage && <div className="errorMsg">{errorMessage}</div>}
            {(Object.keys(weatherInfo).length > 1) &&
              <div className='weatherInfo shadow'>
                <p>
                <i className="fa-solid fa-location-crosshairs"></i>
                  <span> {weatherInfo.name}</span>,
                  <span> {weatherInfo.sys.country}</span>
                </p>
                <p>
                  <span className="currentTemp">
                    {weatherInfo.main.temp}<span>&deg;C</span></span>
                </p>
                <p>
                  <span>Min / Max </span>
                  <span className="minMaxTemp fw-bold">{weatherInfo.main.temp_min} / {weatherInfo.main.temp_max}<span>&deg;C</span></span>
                </p>
                <p>
                  <img alt ="weatherIcon" src={`http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`}></img>
                  <span>{weatherInfo.weather[0].description}</span>
                </p>
                <div className='moreWeatherInfo d-flex align-items-center justify-content-evenly'>
                  <div>
                    <span className="fw-bold">{weatherInfo.main.feels_like}<span>&deg;C</span></span>
                    <p>Feels</p>
                  </div>

                  <div>
                    <span className="fw-bold">{weatherInfo.main.humidity}%</span>
                    <p>Humidity</p>
                  </div>

                  <div>
                    <span className="fw-bold">{weatherInfo.wind.speed}m/sec</span>
                    <p>Wind speed</p>
                  </div>
                </div>
              </div>

            }
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
