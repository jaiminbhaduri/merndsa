import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await api.post('/auth/login', { email, password });
            console.log(res)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('name', res.data.name);
            navigate('/');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}
