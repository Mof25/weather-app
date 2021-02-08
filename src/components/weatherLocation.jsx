import React, { useState, useEffect } from "react";
import { Typography, Divider, Spin, Result } from 'antd';
import "./weatherLocation.css";
import keys from "./../keys";
import Forecast from './forecast';
import Weather from "./weather";

const { Title } = Typography;

const LoadingHandler = ({ isLoading }) => {
    return isLoading ? <Spin tip="Loading..." /> : null;
}

const ErrorHandler = ({ apiError }) => {
    if (!Object.keys(apiError).length) return null;

    return (
        <>
            <Result
                status={apiError.status}
                title={apiError.status}
                subTitle={`Something went wrong : ${apiError.status} ${apiError.statusText}`}
            />
        </>
    );
}

const WeatherLocation = ({ weatherLocations }) => {

    const [weatherData, setWeatherData] = useState({});
    const [forecastData, setForecastData] = useState();
    const [apiWeatherError, setApiWeatherError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getWeather = (city) => {
        setIsLoading(true);
        try {
            return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys.API_KEY}&units=metric`).then(result => {
                if (result.ok) {
                    return result.json();
                }
                else {
                    setApiWeatherError({ status: result.status, statusText: result.statusText })
                }
            }).finally(() => setIsLoading(false))
        } catch (ex) {
            return { error: ex.message }
        }
    }

    const getForecast = (city) => {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&APPID=${keys.API_KEY}`)
            .then(result => {
                if (result.ok) {
                    return result.json();
                }
                else {
                    setApiWeatherError({ status: result.status, statusText: result.statusText })
                }
            })
    }


    useEffect(() => {
        getWeather(weatherLocations).then(res => setWeatherData(res));
        getForecast(weatherLocations).then(res => { setForecastData(res && res.list.filter(forecast => forecast.dt_txt.match(/09:00:00/))) })
    }, [weatherLocations])

    return (
        <>
            <div className="location-header">
                <Title level={3}>{weatherLocations}</Title>
            </div>
            <ErrorHandler apiError={apiWeatherError} />
            <LoadingHandler isLoading={isLoading} />
            {weatherData && <Weather weatherData={weatherData} />}
            <Divider orientation="left"><Title level={3}>Forecast</Title></Divider>
            {forecastData && <Forecast forecast={forecastData} />}

        </>
    )
}

export default WeatherLocation;