import React from "react";
import PropTypes from "prop-types";
import { Input } from 'antd';
const { Search } = Input;

const SearchEntry = ({ onUpdate }) => {
    const handleKeyDown = value => onUpdate(value);
    return <Search placeholder="Enter location" onSearch={handleKeyDown} enterButton />;
}

SearchEntry.propTypes = {
    onUpdate: PropTypes.func.isRequired,
};

export default SearchEntry;