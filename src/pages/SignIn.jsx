import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Axios } from '../http';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const nav = useNavigate();

    const login = async () => {
        await Axios.post('/user/login', user).then(({ status, data }) => {
            if (status === 200) {
                localStorage.setItem('wentBefore', true);
                nav('/');
            }
        });
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
                style={{
                    width: '500px',
                    backgroundColor: 'aquamarine',
                    padding: '50px',
                    border: '1px black solid',
                }}
            >
                <div>
                    <b>Логин</b>
                    <Input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>
                <div>
                    <b>Пароль</b>
                    <Input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <Button type="primary" onClick={login}>
                    Войти
                </Button>
            </div>
        </div>
    );
};

export default SignIn;
