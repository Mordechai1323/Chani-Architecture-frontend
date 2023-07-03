import React from 'react';

export default function Loading() {
  const gifSrc = ' https://plaidphotography.com/images/edmontonskylineloading.gif';
  
  return <img  src={gifSrc} alt='Loading gif' width='100%' height='100%' />;
}
