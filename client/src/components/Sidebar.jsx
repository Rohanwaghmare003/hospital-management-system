import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside style={{ width: '200px', float: 'left', marginRight: '24px', borderRight: '1px solid #ccc', height: '100vh', padding: '20px 0' }}>
      <div><Link to="/dashboard">Dashboard</Link></div>
      <div><Link to="/patients">Patients</Link></div>
      <div><Link to="/doctors">Doctors</Link></div>
      <div><Link to="/appointments">Appointments</Link></div>
      <div><Link to="/documents">Documents</Link></div>
    </aside>
  );
}

export default Sidebar;
