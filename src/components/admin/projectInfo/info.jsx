import React from 'react';

export default function Info({text, data}) {
  return (
    <div className='info-container'>
      <h4>
        <b>{text}:</b> {data}
      </h4>
    </div>
  );
}
