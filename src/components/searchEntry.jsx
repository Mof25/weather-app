import React from "react";
import { Input } from 'antd';
const { Search } = Input;

const SearchEntry = ({ onUpdate }) => {
    const handleKeyDown = value => onUpdate(value);
    return <Search placeholder="Enter location" onSearch={handleKeyDown} enterButton />;
}

export default SearchEntry;