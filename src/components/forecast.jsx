import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import { Typography, List, Avatar } from 'antd';

const { Title } = Typography;


const Forecast = (props) => {

    if (props.forecast.length === 0) return null;

    return (
        <List
            size="small"
            bordered
            dataSource={props.forecast}
            renderItem={(item, index) =>
                <List.Item key={index} className="forecast">
                    <Title level={5} >
                        {moment(item.dt_txt).format('MMMM Do, hh:mm')}
                    </Title>
                    <Avatar src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} className="avatar-temperature" />
                    <div className="temperature">
                        <Title level={4} >
                            {Math.round(item.main.temp_min)}&deg; /{" "}
                        </Title>
                        <Title level={4} >
                            {Math.round(item.main.temp_max)}&deg;
                        </Title>
                    </div>
                </List.Item>
            }
        />
    );
}

Forecast.propTypes = {
    Weather: PropTypes.object.isRequired,
};

export default Forecast;

