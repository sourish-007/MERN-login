// frontend/src/components/Login.js
import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the CSS

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(form);
            localStorage.setItem('username', form.username); // Store username
            localStorage.setItem('accessToken', data.accessToken);
            navigate('/'); // Redirect to Home after login
        } catch {
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input name="username" onChange={handleChange} placeholder="Username" required />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
            <button type="submit">Login</button>
            <div className="link">
                <p>Not a user? <a href="/signup">Sign up</a></p>
            </div>
        </form>
    );
};

export default Login;