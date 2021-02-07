import React, { useState } from 'react';
import SearchEntry from './searchEntry';
import WeatherLocation from "./weatherLocation";
import { Card } from 'antd';
import 'antd/dist/antd.css';


const WeatherCard = ({ weatherLocations, onUpdate }) => {

    return (
        <Card className='card-main' >
            {weatherLocations.length > 0 ? <WeatherLocation weatherLocations={weatherLocations} /> : <SearchEntry onUpdate={onUpdate} />}
        </Card>
    )

}

export default WeatherCard;