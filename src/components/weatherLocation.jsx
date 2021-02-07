import React, { useState, useEffect } from "react";
import { Typography } from 'antd';
import { Avatar } from 'antd';
import "./weatherLocation.css";
import { ArrowRightOutlined } from '@ant-design/icons';
import keys from "./../keys";
const { Title } = Typography;


const WeatherLocation = ({ weatherLocations }) => {

    const [weatherData, setWeatherData] = useState({});

    const getWeather = async (city) => {
        try {
            return fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys.API_KEY}&units=metric`,
            ).then(result => {
                if (result.ok) {
                    return result.json();
                }
                else {
                    return { success: false, error: `Something went wrong : ${result.status} ${result.statusText}` }
                }
            }).then(async response => {
                if (response.data)
                    return await response;
                return response;
            })
        } catch (ex) {
            return { error: ex.message }
        }
    }


    useEffect(() => {
        getWeather(weatherLocations).then(res => setWeatherData(res));
        console.log("result.data ", weatherData)

    }, [weatherLocations])

    const showWeather = (weatherData) => {
        console.log("weatherData", weatherData)
        const [weather] = weatherData && weatherData.weather || [];
        const { temp, icon, windTransform, windSpeed, feelsLike, visibility, humidity, description } = weatherData ? {
            temp: weatherData.main && weatherData.main.temp ? Math.round(weatherData.main.temp).toString() : "",
            feelsLike: weatherData.main && weatherData.main.feels_like ? Math.round(weatherData.main.temp).toString() : "",
            humidity: weatherData.main && weatherData.main.humidity ? weatherData.main.humidity + "%" : "",
            icon: weather ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png` : "",
            windTransform: weatherData.wind ? weatherData.wind.deg - 90 : null,
            windSpeed: weatherData.wind ? Math.round(weatherData.wind.speed) : 0,
            visibility: weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) + "km" : "0km",
            description: weather ? weather.description.charAt(0).toUpperCase() + weather.description.slice(1) : "",
        } : {}

        return (
            <>
                <div className="temperature-content">
                    {temp && <Title level={2}>{temp}&deg;C</Title>}
                    {icon && (
                        <Avatar src={icon} className="avatar-temperature" />
                    )}
                </div>
                <Title level={4}>{`Feels like ${feelsLike}`}&deg;C. {description}.</Title>
                {windSpeed > 0 && (
                    <div className="wind-content">
                        <div className="temperature-content">
                            <Title level={5}>{`${windSpeed} km/h`}</Title>
                            {windTransform !== null && (
                                <ArrowRightOutlined style={{ transform: `rotateZ(${windTransform}deg)` }} className="arrow-icon" />
                            )}
                        </div>
                        <Title level={5}>Visbility: {visibility}</Title>
                        <Title level={5}>Humidity: {humidity}</Title>
                    </div>
                )}
            </>
        )
    }


    return (
        <>
            <div className="location-header">
                <Title level={3}>{weatherLocations}</Title>
            </div>

            {showWeather(weatherData)}

        </>
    )
}

export default WeatherLocation;