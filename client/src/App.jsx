import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import DsaSheet from './components/DsaSheet';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Listen for login state changes
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={token ? <DsaSheet /> : <Navigate to="/login" />} />
                <Route path="/login" element={token ? <Navigate to="/" /> : <Login onLogin={() => setToken(localStorage.getItem('token'))} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
