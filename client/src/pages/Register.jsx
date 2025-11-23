import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:8600/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! You can now log in.');
        setUsername('');
        setPassword('');
        setRole('patient');
      } else {
        setMessage(data.error || 'Registration failed.');
      }
    } catch {
      setMessage('Server error.');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          required
          style={{ marginBottom: 8, width: '100%' }}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
          <option value="nurse">Nurse</option>
          <option value="receptionist">Receptionist</option>
          <option value="super_admin">Super Admin</option>
        </select>
        <button type="submit" style={{ width: '100%' }}>Register</button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
      <p>
        Already have an account? <Link to="/">Login here!</Link>
      </p>
    </div>
  );
}

export default Register;
