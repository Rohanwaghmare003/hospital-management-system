import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
      <Link to="/dashboard" style={{ marginRight: '8px' }}>Dashboard</Link>
      <Link to="/">Login</Link>
      {/* Add more links for other features as needed */}
    </nav>
  );
}

export default Navbar;
