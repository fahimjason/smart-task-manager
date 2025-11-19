import React from 'react';

const FormWrapper = ({ title, children, onSubmit }) => {
  return (
    <div className="p-4 rounded bg-white shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      <form onSubmit={e => { e.preventDefault(); onSubmit && onSubmit(e); }}>
        {children}
      </form>
    </div>
  );
};

export default FormWrapper;
