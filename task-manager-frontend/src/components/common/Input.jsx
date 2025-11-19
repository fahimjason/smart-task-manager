import React from 'react';

const Input = ({ value, onChange, placeholder = '', name, type = 'text', className = '', ...rest }) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-2 py-1 rounded ${className}`}
      {...rest}
    />
  );
};

export default Input;
