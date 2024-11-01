// frontend/src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        navigate('/login'); // Redirect to login on logout
    };

    const username = localStorage.getItem('username');

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Hello {username}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;