import React from 'react';
import SearchEntry from './searchEntry';
import WeatherLocation from "./weatherLocation";
import { Card, Button } from 'antd';
import 'antd/dist/antd.css';


const WeatherCard = ({ location, onUpdate, onDelete }) => {

    return (
        <Card className='card-main' >
            {location ? <WeatherLocation weatherLocations={location} /> : <SearchEntry onUpdate={onUpdate} />}
            <Button onClick={onDelete} size="small" danger className="button-remove">
                REMOVE
            </Button>
        </Card>
    )

}

export default WeatherCard;