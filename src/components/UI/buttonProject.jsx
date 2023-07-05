import React from 'react';

export default function ButtonProject({ text, type }) {
  return (
    <div className='button-container'>
      <button type={type}>{text}</button>
    </div>
  );
}
