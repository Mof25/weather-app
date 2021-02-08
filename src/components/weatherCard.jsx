import React from 'react';
import PropTypes from "prop-types";
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

WeatherCard.propTypes = {
    location: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default WeatherCard;