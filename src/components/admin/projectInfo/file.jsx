import React from 'react';
import { BASE_URL } from '../../../api/axios';

export default function File({ src, fileName }) {
  return (
    <div className='files-container'>
      <a href={BASE_URL + '/' + src} target='_blank' rel='noopener noreferrer'>
        {fileName.substring(0, 20)}
      </a>
    </div>
  );
}
