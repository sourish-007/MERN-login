// frontend/src/components/Signup.js
import React, { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the CSS

const Signup = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(form); // This should now save the username in localStorage
            localStorage.setItem('username', form.username); // Store username
            navigate('/'); // Redirect to Home after signup
        } catch {
            alert('Error during signup');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <input name="username" onChange={handleChange} placeholder="Username" required />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
            <button type="submit">Sign Up</button>
            <div className="link">
                <p>Already a user? <a href="/login">Login</a></p>
            </div>
        </form>
    );
};

export default Signup;