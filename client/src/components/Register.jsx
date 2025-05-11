import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async () => {
        try {
            await api.post('/auth/register', { name, email, password });
            navigate('/login');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <input placeholder="Name" onChange={e => setName(e.target.value)} />
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={register}>Register</button>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}
