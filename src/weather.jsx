import React, { useState } from 'react';
import './weather.css';
import WeatherCard from './components/weatherCard';
import { Row, Col } from 'antd';

const Weather = () => {

    const [weatherLocations, setWeatherLocations] = useState([]);

    return (
        <div className='weather-main'>
            Weather App
            <div className='card'>
                <Row>
                    <Col span={6}>
                        <WeatherCard
                            onUpdate={city => setWeatherLocations(city)}
                            weatherLocations={weatherLocations}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Weather;