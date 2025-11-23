import React from 'react';

function Button({ children, onClick, type = "button" }) {
  return (
    <button type={type} onClick={onClick} style={{ margin: '8px', padding: '8px 16px' }}>
      {children}
    </button>
  );
}

export default Button;
