import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DsaSheet from './components/DsaSheet';

const App = () => {
    const token = localStorage.getItem('token');
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={token ? <DsaSheet /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
