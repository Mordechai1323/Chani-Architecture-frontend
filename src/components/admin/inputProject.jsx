import React from 'react';

export default function InputProject({ name, label, value, onChange, placeholder, required = false, type, errMessage }) {
  return type !== 'file' ? (
    <div className='input-container'>
      <input name={name} id={name} type={type} value={value} placeholder={placeholder} onChange={onChange} required={required} />
      <label htmlFor={name}>{label}</label>
      {errMessage !== '' && (
        <div tabIndex='0' className='text-danger font-weight-bold d-block'>
          {errMessage}
        </div>
      )}
    </div>
  ) : (
    <div className='input-container'>
      <input type={type} id={name} onChange={onChange} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
