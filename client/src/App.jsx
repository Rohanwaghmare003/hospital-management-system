import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import Doctors from './pages/Doctors.jsx';
import Appointments from './pages/Appointments.jsx';
import Documents from './pages/Documents.jsx';
import Register from './pages/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      {token && <Sidebar />}
      <div className="main-content">
        {token && <Navbar />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/patients" element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          } />
          <Route path="/doctors" element={
            <PrivateRoute>
              <Doctors />
            </PrivateRoute>
          } />
          <Route path="/appointments" element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          } />
          <Route path="/documents" element={
            <PrivateRoute>
              <Documents />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
