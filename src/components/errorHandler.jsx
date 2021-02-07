import React from 'react';
import { Result } from 'antd';

const ErrorHandler = ({ apiError }) => {
    if (!Object.keys(apiError).length) return null;

    return (
        <>
            <Result
                status={apiError.status}
                title={apiError.status}
                subTitle={`Something went wrong : ${apiError.status} ${apiError.statusText}`}
            />
        </>
    );
}

export default ErrorHandler;