import React, { useState } from 'react';
import './weather.css';
import WeatherCard from './components/weatherCard';
import { Row, Col } from 'antd';
import { Button, Container } from 'react-floating-action-button';
import { PlusOutlined } from '@ant-design/icons';


const Weather = () => {

    const [weatherLocations, setWeatherLocations] = useState([]);

    const onDelete = (i) => {
        const newWeatherLocations = weatherLocations;
        const index = newWeatherLocations.indexOf(i);
        newWeatherLocations.splice(index, 1);
        setWeatherLocations(newWeatherLocations);
    }

    const handleAddClick = () => setWeatherLocations([...weatherLocations, ""]);

    const updateHandler = (index, updatedLocation) =>
        setWeatherLocations(weatherLocations.map((location, locationIndex) => (locationIndex === index ? updatedLocation : location)));

    return (
        <div className='weather-main'>
            Weather App
            <div className='card'>
                <Row>
                    {weatherLocations.map((location, index) => (
                        <Col span={6} key={index}>
                            <WeatherCard
                                location={location}
                                onUpdate={updateHandler(index)}
                                onDelete={onDelete(index)}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
            <Container>
                <Button
                    tooltip="The big plus button!"
                    icon="fas fa-plus"
                    rotate={true}
                    onClick={handleAddClick} >
                    <PlusOutlined />
                </Button>
            </Container>
        </div>
    )
}

export default Weather;