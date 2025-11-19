import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 rounded-md shadow-sm focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
