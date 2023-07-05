import React from 'react';
import { styled } from 'styled-components';

export default function Icon() {
  return (
    <IconStyle>
      <i className='fa-solid fa-right-to-bracket'></i>
      <h1 className='sr-only'>page for login</h1>
    </IconStyle>
  );
}

const IconStyle = styled.div`
  height: 25%;
  width: 100%;
  text-align: center;
  & i {
    font-size: 3.5em;
  }
`;
