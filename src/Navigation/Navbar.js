
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <div style={{ marginLeft: '1300px', marginTop: '-35px', display: 'flex' }}>
        <Link to="/component-1" style={linkStyle}>
          First Component
        </Link>
        <Link to="/component-2" style={linkStyle}>
          Second Component
        </Link>
        <Link to="/component-3" style={linkStyle}>
          Third Component
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  marginRight: '10px', // Add space between links
  fontSize: '14px',   // Increase link font size
  color: 'white',     // Customize link color
  textDecoration: 'none', // Remove default underline
};

export default Navbar;
