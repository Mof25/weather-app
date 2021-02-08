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
        <div>
            <div className='card'>
                <Row gutter={[24, 48]}>
                    {weatherLocations.map((location, index) => (
                        <Col sm={{ span: 20 }} md={{ span: 16 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }} key={index} className="card-col">
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