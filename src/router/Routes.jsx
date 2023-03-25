import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import TestItem from '../components/TestItem';
import SignIn from '../pages/SignIn';
import TestPage from '../pages/TestPage/TestPage';

const Router = () => {
    const wentBefore = localStorage.getItem('wentBefore');

    const routes = [
        { path: '/', component: <TestPage /> },
        { path: '/user/:userId', component: <TestItem /> },
        { path: '/test/:testId', component: <TestItem /> },
    ];

    return (
        <BrowserRouter>
            <Routes>
                {wentBefore ? (
                    routes.map((route) => {
                        return <Route key={route.path} path={route.path} element={route.component} />;
                    })
                ) : (
                    <Route path="/" element={<SignIn />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
