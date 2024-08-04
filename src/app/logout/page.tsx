"use client";

import React, { useEffect } from 'react';
import Styles from './logout.module.css';

const MyComponent: React.FC = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = "/signup";
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={Styles.loader} style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
    );
};

export default MyComponent;
