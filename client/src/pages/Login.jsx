import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:8600/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage(data.error || 'Login failed.');
      }
    } catch {
      setMessage('Server error.');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ marginBottom: 8, width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ marginBottom: 8, width: '100%' }}
        />
        <button type="submit" style={{ width: '100%' }}>Login</button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
      <p>
        New user? <Link to="/register">Register here!</Link>
      </p>
    </div>
  );
}

export default Login;
