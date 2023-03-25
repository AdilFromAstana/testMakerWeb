import React, { useEffect } from 'react';
import { Axios } from '../http';

const Statictic = () => {
    const getStatistic = async () => {
        await Axios.get('');
    };

    useEffect(() => {
        // getStatistic();
    }, []);
    return <div></div>;
};

export default Statictic;
