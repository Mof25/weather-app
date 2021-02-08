import React, { useState } from 'react';
import './weather.css';
import WeatherCard from './components/weatherCard';
import { Row, Col } from 'antd';
import { Button, Container } from 'react-floating-action-button';
import { PlusOutlined } from '@ant-design/icons';


function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

const Weather = ({ }) => {

    const [weatherLocations, setWeatherLocations] = useStickyState([], 'locations')

    const handleAddClick = () => {
        setWeatherLocations([...weatherLocations, ""]);
    }

    const onDelete = index => {
        setWeatherLocations(weatherLocations.filter(el => el !== weatherLocations[index]))
    }
    const updateHandler = (index, newValue) => {
        setWeatherLocations(weatherLocations.map((location, indexLocation) => { return indexLocation == index ? newValue : location; }))
    }

    return (
        <div className='weather-main'>
            Weather App
            <div className='card'>
                <Row>
                    {weatherLocations.map((location, index) => (
                        <Col span={6} key={index}>
                            <WeatherCard
                                location={location}
                                onUpdate={city => updateHandler(index, city)}
                                onDelete={() => onDelete(index)}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
            <Container>
                <Button
                    onClick={() => handleAddClick()}
                    rotate={true}
                >
                    <PlusOutlined />
                </Button>
            </Container>
        </div>
    )
}

export default Weather;